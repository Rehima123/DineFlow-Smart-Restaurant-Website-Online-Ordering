import User from '../models/User.js'
import Order from '../models/Order.js'
import Reservation from '../models/Reservation.js'

// GET /api/admin/stats
export async function getStats(req, res) {
  try {
    const [totalOrders, totalRevenueAgg, totalCustomers, pendingOrders, recentOrders] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]),
      User.countDocuments({ role: 'customer' }),
      Order.countDocuments({ status: 'pending' }),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email'),
    ])

    const totalRevenue = totalRevenueAgg[0]?.total || 0

    // Monthly revenue aggregation
    const monthlyRevenue = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ])

    res.json({
      stats: {
        totalOrders,
        totalRevenue: Math.round(totalRevenue),
        totalCustomers,
        pendingOrders,
      },
      recentOrders,
      monthlyRevenue,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/admin/customers
export async function getCustomers(req, res) {
  try {
    const users = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 })

    // Aggregate order data per user
    const customerStats = await Order.aggregate([
      { $group: { _id: '$user', orderCount: { $sum: 1 }, totalSpent: { $sum: '$total' } } },
    ])

    const statsMap = customerStats.reduce((acc, s) => {
      acc[s._id?.toString()] = { orders: s.orderCount, spent: s.totalSpent }
      return acc
    }, {})

    const customers = users.map((u) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      phone: u.phone || 'N/A',
      orders: statsMap[u._id.toString()]?.orders || 0,
      spent: statsMap[u._id.toString()]?.spent || 0,
      joined: u.createdAt?.toISOString().split('T')[0] || '',
    }))

    res.json({ customers })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
