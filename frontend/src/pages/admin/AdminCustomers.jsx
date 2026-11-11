import { useEffect, useState } from 'react'
import { Search, Mail, Phone, ShoppingBag, DollarSign } from 'lucide-react'
import { adminAPI } from '../../services/endpoints'

const demoCustomers = [
  { _id: 'USR-001', name: 'John Doe', email: 'john@example.com', phone: '+1 555 123 4567', orders: 12, spent: 842.5, joined: '2026-01-15' },
  { _id: 'USR-002', name: 'Sarah Miller', email: 'sarah@example.com', phone: '+1 555 987 6543', orders: 8, spent: 520.0, joined: '2026-02-20' },
  { _id: 'USR-003', name: 'Mike Ross', email: 'mike@example.com', phone: '+1 555 222 3344', orders: 15, spent: 1240.0, joined: '2025-12-10' },
  { _id: 'USR-004', name: 'Emma Wilson', email: 'emma@example.com', phone: '+1 555 444 5566', orders: 5, spent: 310.0, joined: '2026-03-05' },
  { _id: 'USR-005', name: 'David Kim', email: 'david@example.com', phone: '+1 555 777 8899', orders: 9, spent: 675.5, joined: '2026-01-28' },
  { _id: 'USR-006', name: 'Olivia Brown', email: 'olivia@example.com', phone: '+1 555 999 0000', orders: 3, spent: 145.0, joined: '2026-04-12' },
  { _id: 'USR-007', name: 'Sophia Reeves', email: 'sophia@example.com', phone: '+1 555 111 2222', orders: 20, spent: 1820.0, joined: '2025-11-01' },
  { _id: 'USR-008', name: 'Marcus Chen', email: 'marcus@example.com', phone: '+1 555 333 4444', orders: 7, spent: 490.0, joined: '2026-02-15' },
]

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminAPI.getCustomers()
        setCustomers(res.customers || [])
      } catch {
        setCustomers(demoCustomers)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex justify-center py-20"><div className="spinner w-12 h-12" /></div>

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Customers</h1>
      <p className="text-gray-500 text-sm mb-8">View all registered customers</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Customer</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Contact</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Orders</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Total Spent</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-semibold text-orange-600">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400">{c._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 flex items-center gap-1.5 mb-0.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {c.email}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {c.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-600"><ShoppingBag className="w-4 h-4 text-gray-400" /> {c.orders}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-800"><DollarSign className="w-4 h-4 text-orange-500" /> {c.spent.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.joined).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">No customers found.</div>
        )}
      </div>
    </div>
  )
}
