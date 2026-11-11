import { Link } from 'react-router-dom'
import { UtensilsCrossed, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    toast.success('Thanks for subscribing to DineFlow updates!')
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="w-7 h-7 text-orange-500" />
              <span className="font-display text-2xl font-bold text-white">
                Dine<span className="text-orange-500">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              A premium dining experience crafted with passion. Where every dish tells a story and every visit feels like home.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-orange-500 transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/reservation" className="hover:text-orange-500 transition-colors">Reserve a Table</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                <span>123 Gourmet Avenue, Downtown District, City 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>hello@dineflow.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                <span>Mon–Sun: 11:00 AM – 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers and updates.</p>
            <form onSubmit={subscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="submit" className="btn-primary text-sm">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DineFlow. All rights reserved. Crafted with passion.</p>
        </div>
      </div>
    </footer>
  )
}
