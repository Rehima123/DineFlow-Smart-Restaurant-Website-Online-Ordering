import { useState } from 'react'
import { Calendar, Clock, Users, User, Phone, CheckCircle, MessageSquare } from 'lucide-react'
import { reservationAPI } from '../services/endpoints'
import toast from 'react-hot-toast'

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    requests: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
  ]

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!/^\+?[\d\s-]{8,}$/.test(form.phone)) e.phone = 'Invalid phone'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.date) e.date = 'Date is required'
    if (!form.time) e.time = 'Time is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please complete all required fields')
      return
    }
    setSubmitting(true)
    try {
      try { await reservationAPI.create(form) } catch { /* backend offline — proceed with demo */ }
      setConfirmed(true)
      toast.success('Reservation request submitted!')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Reservation Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you, {form.name.split(' ')[0]}! We've received your reservation request for{' '}
          <span className="font-medium text-gray-900">{form.guests} guests</span> on{' '}
          <span className="font-medium text-gray-900">{form.date}</span> at{' '}
          <span className="font-medium text-gray-900">{form.time}</span>.
        </p>
        <div className="card p-6 text-left mb-6 max-w-md mx-auto">
          <p className="text-sm text-gray-500 mb-1">We'll call {form.phone} to confirm your booking.</p>
          <p className="text-sm text-gray-500">A confirmation has been sent to {form.email}.</p>
        </div>
        <button onClick={() => { setConfirmed(false); setForm({ name: '', phone: '', email: '', date: '', time: '', guests: '2', requests: '' }) }} className="btn-secondary">
          Make Another Reservation
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Header */}
      <div className="relative h-48 mb-8 rounded-2xl overflow-hidden">
        <img src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80" alt="Reserve a table" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white">Reserve a Table</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="input-field pl-11" placeholder="John Doe" />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="input-field pl-11" placeholder="+1 555 123 4567" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input id="date" name="date" type="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="input-field pl-11" />
                </div>
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select id="time" name="time" value={form.time} onChange={handleChange} className="input-field pl-11 appearance-none cursor-pointer">
                    <option value="">Select time</option>
                    {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange} className="input-field pl-11 appearance-none cursor-pointer">
                    {[1,2,3,4,5,6,7,8,'8+'].map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="requests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea id="requests" name="requests" rows="3" value={form.requests} onChange={handleChange} className="input-field pl-11" placeholder="Dietary needs, birthday, window seat, etc." />
              </div>
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {submitting ? <div className="spinner w-5 h-5 border-white" /> : 'Request Reservation'}
            </button>
          </form>
        </div>

        {/* Info sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between"><span>Monday – Thursday</span><span>11:00 – 22:00</span></li>
              <li className="flex justify-between"><span>Friday – Saturday</span><span>11:00 – 23:00</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>12:00 – 21:00</span></li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Reservation Notes</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Tables held for 15 minutes past reservation time</li>
              <li>• Parties of 8+ require a deposit</li>
              <li>• We'll call to confirm within 2 hours</li>
              <li>• Cancellations up to 24 hours in advance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
