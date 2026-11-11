import Reservation from '../models/Reservation.js'

// POST /api/reservations
export async function createReservation(req, res) {
  try {
    const data = { ...req.body, user: req.user?._id || null }
    const reservation = await Reservation.create(data)
    res.status(201).json({ reservation, message: 'Reservation request submitted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// GET /api/reservations (admin)
export async function getAllReservations(req, res) {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 })
    res.json({ reservations })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PATCH /api/reservations/:id/status (admin)
export async function updateReservationStatus(req, res) {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' })
    res.json({ reservation, message: 'Reservation status updated' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
