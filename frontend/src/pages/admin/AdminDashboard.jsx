import { useEffect, useState } from 'react'
import { DollarSign, ShoppingBag, Users, Clock, TrendingUp, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { adminAPI, orderAPI } from '../../services/endpoints'

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminAPI.getStats()
        setData(res.stats || res)
        setRecentOrders(res.recentOrders || [])
      } catch {
        setData({ totalOrders: 0, totalRevenue: 0, totalCustomers: 0, pendingOrders: 0 })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="flex justify-center py-20"><div className="spinner w-12 h-12" /></div>
  }

  const stats = [
    { label: 'Total Revenue', value: `$${(data.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', change: '+12%' },
    { label: 'Total Orders', value: data.totalOrders || 0, icon: ShoppingBag, color: 'bg-blue-500', change: '+8%' },
    { label: 'Customers', value: data.totalCustomers || 0, icon: Users, color: 'bg-purple-500', change: '+15%' },
    { label: 'Pending Orders', value: data.pendingOrders || 0, icon: Clock, color: 'bg-orange-500', change: 'Live' },
  ]

  // Demo chart data
  const monthlyData = [
    { month: 'Jan', revenue: 8200, orders: 110 },
    { month: 'Feb', revenue: 9100, orders: 125 },
    { month: 'Mar', revenue: 10500, orders: 142 },
    { month: 'Apr', revenue: 11800, orders: 155 },
    { month: 'May', revenue: 13200, orders: 168 },
    { month: 'Jun', revenue: 14500, orders: 180 },
    { month: 'Jul', revenue: 15800, orders: 195 },
    { month: 'Aug', revenue: 18420, orders: 248 },
  ]

  const categoryData = [
    { name: 'Mains', value: 35, color: '#f97316' },
    { name: 'Pasta', value: 22, color: '#3b82f6' },
    { name: 'Starters', value: 18, color: '#10b981' },
    { name: 'Desserts', value: 15, color: '#a855f7' },
    { name: 'Drinks', value: 10, color: '#eab308' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back, here's what's happening today.</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">Revenue & Orders</h3>
          <p className="text-sm text-gray-500 mb-6">Monthly performance overview</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} name="Revenue ($)" />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">Orders by Category</h3>
          <p className="text-sm text-gray-500 mb-6">Distribution overview</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="font-medium text-gray-600">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar chart + recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-6">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-gray-900">Recent Orders</h3>
            <ArrowUpRight className="w-5 h-5 text-gray-400" />
          </div>
          {recentOrders.length === 0 ? (
            <div className="space-y-3">
              {[
                { id: 'ORD-001', customer: 'John D.', total: 84.5, status: 'Delivered' },
                { id: 'ORD-002', customer: 'Sarah M.', total: 120.0, status: 'Preparing' },
                { id: 'ORD-003', customer: 'Mike R.', total: 56.0, status: 'Pending' },
                { id: 'ORD-004', customer: 'Emma L.', total: 92.0, status: 'Delivered' },
                { id: 'ORD-005', customer: 'David K.', total: 148.0, status: 'Preparing' },
              ].map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{o.id}</p>
                    <p className="text-xs text-gray-500">{o.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">${o.total}</p>
                    <span className={`text-xs ${o.status === 'Delivered' ? 'text-green-600' : o.status === 'Preparing' ? 'text-orange-500' : 'text-yellow-500'}`}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o._id || o.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{o._id || o.id}</p>
                    <p className="text-xs text-gray-500">{o.customer?.name}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">${o.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
