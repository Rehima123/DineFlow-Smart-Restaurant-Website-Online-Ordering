import express from 'express'
import { createReservation, getAllReservations, updateReservationStatus } from '../controllers/reservationController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createReservation)

// Admin routes
router.get('/', protect, admin, getAllReservations)
router.patch('/:id/status', protect, admin, updateReservationStatus)

export default router
