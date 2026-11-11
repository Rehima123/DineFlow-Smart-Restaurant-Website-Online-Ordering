import { Link } from 'react-router-dom'
import { UtensilsCrossed, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6">
        <UtensilsCrossed className="w-10 h-10 text-orange-500" />
      </div>
      <h1 className="font-display text-6xl font-bold text-gray-900 mb-3">404</h1>
      <h2 className="font-display text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Looks like this dish isn't on our menu. Let's get you back to something delicious.
      </p>
      <Link to="/" className="btn-primary flex items-center gap-2">
        <Home className="w-5 h-5" /> Back Home
      </Link>
    </div>
  )
}
