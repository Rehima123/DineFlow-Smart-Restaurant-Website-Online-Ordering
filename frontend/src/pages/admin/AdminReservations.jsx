import { useEffect, useState } from 'react'
import { CalendarCheck, Phone, Users, Clock, MessageSquare, Search } from 'lucide-react'
import { reservationAPI } from '../../services/endpoints'
import toast from 'react-hot-toast'

const demoReservations = [
  { _id: 'RES-001', name: 'Sophia Reeves', phone: '+1 555 111 2222', email: 'sophia@email.com', date: '2026-11-15', time: '19:00', guests: '4', requests: 'Window table if possible', status: 'confirmed' },
  { _id: 'RES-002', name: 'Marcus Chen', phone: '+1 555 333 4444', email: 'marcus@email.com', date: '2026-11-14', time: '20:00', guests: '2', requests: 'Anniversary dinner', status: 'pending' },
  { _id: 'RES-003', name: 'Isabella Fontaine', phone: '+1 555 555 6666', email: 'bella@email.com', date: '2026-11-16', time: '12:30', guests: '6', requests: 'Birthday — need a cake', status: 'pending' },
  { _id: 'RES-004', name: 'James Wilson', phone: '+1 555 777 8888', email: 'james@email.com', date: '2026-11-13', time: '18:00', guests: '3', requests: '', status: 'confirmed' },
  { _id: 'RES-005', name: 'Olivia Brown', phone: '+1 555 999 0000', email: 'olivia@email.com', date: '2026-11-17', time: '19:30', guests: '2', requests: 'Vegetarian menu please', status: 'cancelled' },
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reservationAPI.getAll()
        setReservations(res.reservations || [])
      } catch {
        setReservations(demoReservations)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const updateStatus = async (id, status) => {
    try { await reservationAPI.updateStatus(id, status) } catch { /* offline */ }
    setReservations(reservations.map((r) => (r._id === id ? { ...r, status } : r)))
    if (selected?._id === id) setSelected({ ...selected, status })
    toast.success(`Reservation ${status}`)
  }

  const filtered = reservations.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search)
    const matchFilter = filter === 'all' || r.status === filter
    return matchSearch && matchFilter
  })

  if (loading) return <div className="flex justify-center py-20"><div className="spinner w-12 h-12" /></div>

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Reservations</h1>
      <p className="text-gray-500 text-sm mb-8">View and manage table reservations</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div key={res._id} className="bg-white rounded-2xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(res)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-gray-900">{res.name}</h3>
                  <p className="text-xs text-gray-500">{res._id}</p>
                </div>
              </div>
              <span className={`badge ${statusColors[res.status]}`}>{res.status}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /> {res.date} at {res.time}</div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /> {res.guests} guests</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {res.phone}</div>
              {res.requests && (
                <div className="flex items-start gap-2"><MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" /> <span className="line-clamp-1">{res.requests}</span></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">No reservations found.</div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-1">{selected.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{selected._id}</p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Date</span><span className="font-medium text-gray-800">{selected.date}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Time</span><span className="font-medium text-gray-800">{selected.time}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Guests</span><span className="font-medium text-gray-800">{selected.guests}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Phone</span><span className="font-medium text-gray-800">{selected.phone}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Email</span><span className="font-medium text-gray-800">{selected.email}</span></div>
              {selected.requests && (
                <div className="border-t border-gray-100 pt-3">
                  <span className="text-sm text-gray-500">Special Requests</span>
                  <p className="text-sm text-gray-800 mt-1">{selected.requests}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {['pending', 'confirmed', 'cancelled', 'completed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selected.status === s ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
