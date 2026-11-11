import express from 'express'
import { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createOrder)
router.get('/my-orders', protect, getMyOrders)
router.get('/:id', protect, getOrder)

// Admin routes
router.get('/', protect, admin, getAllOrders)
router.patch('/:id/status', protect, admin, updateOrderStatus)

export default router
