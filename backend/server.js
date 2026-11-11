import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

// Middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// CORS — allow frontend dev server
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DineFlow API is running' })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/admin', adminRoutes)

// 404 + error handler (must be last)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 DineFlow server running on port ${PORT}`)
})

export default app
