import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Banknote, CheckCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { orderAPI } from '../services/endpoints'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    notes: '',
    paymentMethod: 'cod',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(null)

  const deliveryFee = items.length > 0 ? 4.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!/^\+?[\d\s-]{8,}$/.test(form.phone)) e.phone = 'Invalid phone'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.zip.trim()) e.zip = 'ZIP is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setSubmitting(true)
    try {
      const orderData = {
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
        customer: form,
        subtotal,
        deliveryFee,
        tax,
        total,
        paymentMethod: form.paymentMethod,
      }

      let res
      try {
        res = await orderAPI.create(orderData)
      } catch {
        // Backend offline — create a local demo order
        res = { _id: 'DEMO-' + Date.now(), ...orderData, status: 'pending' }
      }

      setConfirmed(res)
      clearCart()
      toast.success('Order placed successfully!')
    } catch (err) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Order confirmation screen
  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you, {form.name.split(' ')[0]}! Your order has been placed successfully.
        </p>
        <div className="card p-6 text-left mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-mono font-medium">{confirmed._id || confirmed.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Total</span>
            <span className="font-bold text-orange-500">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium">
              {form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Demo Card Payment'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery to</span>
            <span className="font-medium">{form.address}, {form.city}</span>
          </div>
        </div>
        {form.paymentMethod === 'demo-card' && (
          <p className="text-sm text-gray-400 bg-orange-50 rounded-xl p-3 mb-6">
            Note: This is a demo payment. No real charge has been made.
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/menu')} className="btn-secondary">Order More</button>
          <button onClick={() => navigate('/')} className="btn-primary">Back Home</button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <button onClick={() => navigate('/cart')} className="btn-ghost flex items-center gap-1 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>

      <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <div className="card p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="input-field" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 123 4567" className="input-field" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="card p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input id="address" name="address" type="text" value={form.address} onChange={handleChange} className="input-field" />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input id="city" name="city" type="text" value={form.city} onChange={handleChange} className="input-field" />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input id="zip" name="zip" type="text" value={form.zip} onChange={handleChange} className="input-field" />
                  {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Delivery Notes (optional)</label>
                <textarea id="notes" name="notes" rows="2" value={form.notes} onChange={handleChange} className="input-field" placeholder="e.g., leave at door, ring bell" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="card p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === 'cod'} onChange={handleChange} className="sr-only" />
                <Banknote className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when your order arrives</p>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.paymentMethod === 'demo-card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <input type="radio" name="paymentMethod" value="demo-card" checked={form.paymentMethod === 'demo-card'} onChange={handleChange} className="sr-only" />
                <CreditCard className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900">Demo Card Payment</p>
                  <p className="text-sm text-gray-500">Simulated card payment (no real charge)</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity} × {item.name}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Delivery</span><span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Total</span><span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? <div className="spinner w-5 h-5 border-white" /> : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
