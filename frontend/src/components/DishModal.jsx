import { X, Star, Plus, Minus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function DishModal({ item, onClose }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  if (!item) return null

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(item)
    toast.success(`${qty} × ${item.name} added to cart`)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="font-display text-2xl font-bold text-gray-900">{item.name}</h2>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
              <span className="font-semibold text-gray-700">{item.rating}</span>
              <span className="text-gray-400">({item.reviews} reviews)</span>
            </div>
          </div>

          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag) => (
                <span key={tag} className="badge bg-orange-100 text-orange-700 text-xs">{tag}</span>
              ))}
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-display text-2xl font-bold text-gray-900">
                ${item.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
