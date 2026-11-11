import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Star } from 'lucide-react'
import FoodCard from '../components/FoodCard'
import DishModal from '../components/DishModal'
import { menuAPI } from '../services/endpoints'
import { categories as allCats } from '../data/menuData'

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDish, setSelectedDish] = useState(null)

  const category = searchParams.get('category') || 'all'
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'popular'

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      const res = await menuAPI.getAll({ category, search })
      if (active) {
        setItems(res.items || [])
        setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [category, search])

  // Sort items
  const sortedItems = useMemo(() => {
    const sorted = [...items]
    switch (sort) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'popular':
      default:
        return sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    }
  }, [items, sort])

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value && value !== 'all') params.set(key, value)
    else params.delete(key)
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen">
      {/* Header banner */}
      <div className="relative h-64 mb-8">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
          alt="Our Menu"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Our Menu</h1>
            <p className="text-gray-200 mt-2">Crafted with passion, served with pride</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => updateParam('search', e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="input-field pl-12 appearance-none cursor-pointer min-w-[200px]"
            >
              <option value="popular">Sort: Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam('category', cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
              }`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="spinner w-12 h-12" />
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍽️</p>
            <h3 className="font-display text-xl font-semibold text-gray-700 mb-2">No dishes found</h3>
            <p className="text-gray-500">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <FoodCard key={item.id} item={item} onView={setSelectedDish} />
            ))}
          </div>
        )}
      </div>

      <DishModal item={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  )
}
