import express from 'express'
import { getStats, getCustomers } from '../controllers/adminController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/stats', protect, admin, getStats)
router.get('/customers', protect, admin, getCustomers)

export default router
