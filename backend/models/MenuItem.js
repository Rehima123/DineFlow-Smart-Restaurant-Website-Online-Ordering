import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, default: 'mains' },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    popular: { type: Boolean, default: false },
    vegetarian: { type: Boolean, default: false },
    tags: [{ type: String }],
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Index for efficient text search
menuItemSchema.index({ name: 'text', description: 'text' })

export default mongoose.model('MenuItem', menuItemSchema)
