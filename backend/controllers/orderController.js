import Order from '../models/Order.js'

// POST /api/orders
export async function createOrder(req, res) {
  try {
    const orderData = {
      ...req.body,
      user: req.user?._id || null,
    }
    const order = await Order.create(orderData)
    res.status(201).json({ order, message: 'Order created successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// GET /api/orders/my-orders
export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json({ orders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/orders/:id
export async function getOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ order })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/orders (admin)
export async function getAllOrders(req, res) {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}
    const orders = await Order.find(filter).sort({ createdAt: -1 })
    res.json({ orders })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PATCH /api/orders/:id/status (admin)
export async function updateOrderStatus(req, res) {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ order, message: 'Order status updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
