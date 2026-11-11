import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, incrementItem, decrementItem, removeFromCart, subtotal } = useCart()

  const deliveryFee = items.length > 0 ? 4.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything yet. Let's fix that!</p>
        <Link to="/menu" className="btn-primary flex items-center gap-2">
          Browse Menu <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card flex gap-4 p-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => decrementItem(item.id)}
                      className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-semibold w-7 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => incrementItem(item.id)}
                      className="w-7 h-7 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-display text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn-primary w-full text-center flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/menu" className="btn-ghost w-full text-center mt-3 block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
