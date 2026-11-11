import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingBag, UtensilsCrossed, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-7 h-7 text-orange-500" />
            <span className="font-display text-2xl font-bold text-gray-900">
              Dine<span className="text-orange-500">Flow</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/reservation" className={navLinkClass}>Reserve</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 hover:text-orange-500 transition-colors" aria-label="Cart">
              <ShoppingBag className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                )}
                <span className="text-sm font-medium text-gray-700">Hi, {user.name?.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm">Sign Up</Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-4 px-4">
              <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
              <NavLink to="/menu" onClick={() => setOpen(false)} className={navLinkClass}>Menu</NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>About</NavLink>
              <NavLink to="/reservation" onClick={() => setOpen(false)} className={navLinkClass}>Reserve</NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)} className={navLinkClass}>Contact</NavLink>
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setOpen(false)} className={navLinkClass}>Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="text-left text-gray-700 hover:text-orange-500 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost text-center">Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-center">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
