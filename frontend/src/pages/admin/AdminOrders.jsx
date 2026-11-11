import { useEffect, useState } from 'react'
import { Search, Eye } from 'lucide-react'
import { orderAPI } from '../../services/endpoints'
import toast from 'react-hot-toast'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  preparing: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const demoOrders = [
  { _id: 'ORD-001', customer: { name: 'John Doe', phone: '+1 555 123 4567', address: '123 Main St' }, items: [{ name: 'Truffle Tagliatelle', quantity: 2, price: 32 }], total: 64, status: 'pending', paymentMethod: 'cod', createdAt: '2026-11-10T18:30:00Z' },
  { _id: 'ORD-002', customer: { name: 'Sarah Miller', phone: '+1 555 987 6543', address: '456 Oak Ave' }, items: [{ name: 'Dry-Aged Ribeye', quantity: 1, price: 58 }, { name: 'Chocolate Fondant', quantity: 2, price: 14 }], total: 86, status: 'preparing', paymentMethod: 'demo-card', createdAt: '2026-11-10T17:15:00Z' },
  { _id: 'ORD-003', customer: { name: 'Mike Ross', phone: '+1 555 222 3344', address: '789 Pine Rd' }, items: [{ name: 'Margherita Pizza', quantity: 3, price: 18 }], total: 54, status: 'delivered', paymentMethod: 'cod', createdAt: '2026-11-09T20:00:00Z' },
  { _id: 'ORD-004', customer: { name: 'Emma Wilson', phone: '+1 555 444 5566', address: '321 Elm St' }, items: [{ name: 'Lobster Bisque Risotto', quantity: 2, price: 42 }], total: 84, status: 'pending', paymentMethod: 'demo-card', createdAt: '2026-11-10T19:45:00Z' },
  { _id: 'ORD-005', customer: { name: 'David Kim', phone: '+1 555 777 8899', address: '654 Cedar Ln' }, items: [{ name: 'Seared Scallops', quantity: 1, price: 22 }, { name: 'Tiramisu', quantity: 2, price: 12 }], total: 46, status: 'preparing', paymentMethod: 'cod', createdAt: '2026-11-10T16:20:00Z' },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await orderAPI.getAll()
        setOrders(res.orders || [])
      } catch {
        setOrders(demoOrders)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await orderAPI.updateStatus(id, status)
    } catch { /* offline */ }
    setOrders(orders.map((o) => (o._id === id || o.id === id ? { ...o, status } : o)))
    if (selected?._id === id || selected?.id === id) setSelected({ ...selected, status })
    toast.success(`Order status updated to ${status}`)
  }

  const filtered = orders.filter((o) => {
    const name = o.customer?.name || o.customer?.email || ''
    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) || (o._id || o.id).toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || o.status === filter
    return matchSearch && matchFilter
  })

  if (loading) return <div className="flex justify-center py-20"><div className="spinner w-12 h-12" /></div>

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Order Management</h1>
      <p className="text-gray-500 text-sm mb-8">Manage and track all customer orders</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
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
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Order ID</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Customer</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Items</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Total</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((order) => (
                <tr key={order._id || order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{order._id || order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items?.length || 0} items</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">${(order.total || 0).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${statusColors[order.status] || 'bg-gray-100'}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setSelected(order)} className="text-orange-500 hover:text-orange-600 transition-colors" aria-label="View order">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">No orders found.</div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-gray-900">Order {selected._id || selected.id}</h2>
                <p className="text-sm text-gray-500">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <span className={`badge ${statusColors[selected.status]}`}>{selected.status}</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Customer</h3>
                <p className="text-sm text-gray-600">{selected.customer?.name}</p>
                <p className="text-sm text-gray-600">{selected.customer?.phone}</p>
                <p className="text-sm text-gray-600">{selected.customer?.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Items</h3>
                <div className="space-y-2">
                  {selected.items?.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.quantity} × {item.name}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold pt-2 mt-2 border-t border-gray-100">
                  <span>Total</span><span className="text-orange-500">${(selected.total || 0).toFixed(2)}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Payment</h3>
                <p className="text-sm text-gray-600">{selected.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Demo Card'}</p>
              </div>
            </div>

            {/* Status actions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {['pending', 'preparing', 'delivered', 'cancelled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id || selected.id, s)}
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
