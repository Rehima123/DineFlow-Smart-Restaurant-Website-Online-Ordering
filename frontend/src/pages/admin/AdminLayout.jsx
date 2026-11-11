import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, CalendarCheck, Users, LogOut, Utensils } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItem = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      isActive ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white fixed inset-y-0 left-0 flex flex-col z-50">
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <Utensils className="w-7 h-7 text-orange-500" />
            <span className="font-display text-xl font-bold">
              Dine<span className="text-orange-500">Flow</span>
            </span>
          </Link>
          <p className="text-xs text-gray-500 mt-2">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin" end className={navItem}><LayoutDashboard className="w-5 h-5" /> Overview</NavLink>
          <NavLink to="/admin/orders" className={navItem}><ShoppingBag className="w-5 h-5" /> Orders</NavLink>
          <NavLink to="/admin/menu" className={navItem}><UtensilsCrossed className="w-5 h-5" /> Menu Items</NavLink>
          <NavLink to="/admin/reservations" className={navItem}><CalendarCheck className="w-5 h-5" /> Reservations</NavLink>
          <NavLink to="/admin/customers" className={navItem}><Users className="w-5 h-5" /> Customers</NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full px-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64 bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
