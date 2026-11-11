import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Simulate send
    setTimeout(() => {
      setSubmitting(false)
      toast.success('Message sent! We\'ll get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative h-48 mb-8">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80" alt="Contact us" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="font-display text-4xl font-bold text-white">Get in Touch</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact info cards */}
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-500 text-sm">123 Gourmet Avenue<br />Downtown District, City 10001</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-500 text-sm">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-500 text-sm">hello@dineflow.com<br />reservations@dineflow.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="input-field" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} className="input-field pl-11" placeholder="How can we help?" />
                </div>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                {submitting ? <div className="spinner w-5 h-5 border-white" /> : <><Send className="w-5 h-5" /> Send Message</>}
              </button>
            </form>
          </div>

          {/* Hours + Map */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <h3 className="font-display text-lg font-semibold text-gray-900">Opening Hours</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Monday</span><span className="font-medium text-gray-800">11:00 – 22:00</span></li>
                <li className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Tuesday</span><span className="font-medium text-gray-800">11:00 – 22:00</span></li>
                <li className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Wednesday</span><span className="font-medium text-gray-800">11:00 – 22:00</span></li>
                <li className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Thursday</span><span className="font-medium text-gray-800">11:00 – 22:00</span></li>
                <li className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Friday</span><span className="font-medium text-gray-800">11:00 – 23:00</span></li>
                <li className="flex justify-between py-2 border-b border-gray-100"><span className="text-gray-600">Saturday</span><span className="font-medium text-gray-800">11:00 – 23:00</span></li>
                <li className="flex justify-between py-2"><span className="text-gray-600">Sunday</span><span className="font-medium text-gray-800">12:00 – 21:00</span></li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="card overflow-hidden">
              <iframe
                title="Restaurant location"
                src="https://www.google.com/maps?q=40.7128,-74.0060&z=14&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
