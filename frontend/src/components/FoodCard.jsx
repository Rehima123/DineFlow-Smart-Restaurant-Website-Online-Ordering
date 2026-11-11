import { Star, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function FoodCard({ item, onView }) {
  const { addToCart } = useCart()

  const handleAdd = () => {
    addToCart(item)
    toast.success(`${item.name} added to cart`)
  }

  return (
    <div className="card overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => onView?.(item)}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.tags?.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {item.tags.slice(0, 1).map((tag) => (
              <span key={tag} className="badge bg-orange-500 text-white text-xs shadow-md">
                {tag}
              </span>
            ))}
          </div>
        )}
        {item.vegetarian && (
          <span className="absolute top-3 right-3 badge bg-green-500 text-white text-xs shadow-md">
            🌱 Veg
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3
            className="font-display text-lg font-semibold text-gray-900 cursor-pointer hover:text-orange-500 transition-colors"
            onClick={() => onView?.(item)}
          >
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span className="font-medium text-gray-700">{item.rating}</span>
            <span className="text-gray-400 text-xs">({item.reviews})</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{item.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-xl font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  )
}
