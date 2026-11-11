import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, default: '' },
})

const customerInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, default: '' },
  zip: { type: String, default: '' },
  notes: { type: String, default: '' },
})

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    items: [orderItemSchema],
    customer: { type: customerInfoSchema, required: true },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 4.99 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'demo-card'],
      default: 'cod',
    },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
