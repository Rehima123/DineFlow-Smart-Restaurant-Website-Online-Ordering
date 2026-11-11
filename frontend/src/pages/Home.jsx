import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Quote, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import FoodCard from '../components/FoodCard'
import DishModal from '../components/DishModal'
import { menuItems, categories, testimonials, specialOffers } from '../data/menuData'

export default function Home() {
  const [selectedDish, setSelectedDish] = useState(null)
  const featuredItems = menuItems.filter((i) => i.popular).slice(0, 6)
  const featuredCategories = categories.filter((c) => c.id !== 'all')

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="DineFlow restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <span className="inline-block badge bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-6 backdrop-blur-sm">
            ✦ Award-winning fine dining
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            A Taste of <span className="text-orange-400">Perfection</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Experience extraordinary flavors crafted by world-class chefs. From farm-fresh ingredients to unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="btn-primary flex items-center justify-center gap-2">
              Explore Menu <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/reservation" className="btn-secondary text-white border-white hover:bg-white hover:text-gray-900 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" /> Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* ===== POPULAR CATEGORIES ===== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Explore Our Categories</h2>
          <p className="section-subtitle">Discover dishes crafted for every craving</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="card flex flex-col items-center gap-3 p-5 text-center group hover:border-orange-300 border-2 border-transparent"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED DISHES ===== */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="section-title">Featured Dishes</h2>
              <p className="section-subtitle">Our most-loved creations, handpicked by our chef</p>
            </div>
            <Link to="/menu" className="text-orange-500 font-medium hover:text-orange-600 flex items-center gap-1">
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <FoodCard key={item.id} item={item} onView={setSelectedDish} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SNIPPET ===== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="DineFlow dining experience"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white rounded-2xl p-6 shadow-xl hidden md:block">
              <p className="font-display text-3xl font-bold">15+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>
          <div>
            <span className="badge bg-orange-100 text-orange-700 mb-4">Our Story</span>
            <h2 className="section-title mb-4">Where Every Meal Becomes a Memory</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DineFlow was born from a simple belief: that great food brings people together. Since 2009, we've been crafting exceptional dishes using locally sourced, seasonal ingredients.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our team of passionate chefs combines traditional techniques with modern innovation, creating a menu that celebrates flavor in every bite. We don't just serve meals — we craft experiences.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="font-display text-3xl font-bold text-orange-500">50k+</p>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-orange-500">120+</p>
                <p className="text-sm text-gray-500">Signature Dishes</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-orange-500">4.9</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
            </div>
            <Link to="/about" className="btn-secondary inline-flex items-center gap-2 mt-8">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">What Our Guests Say</h2>
            <p className="text-gray-400 mt-3 text-lg">Real stories from our wonderful guests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <Quote className="w-8 h-8 text-orange-500 mb-4" />
                <p className="text-gray-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIAL OFFERS ===== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Special Offers</h2>
          <p className="section-subtitle">Limited-time deals you don't want to miss</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialOffers.map((offer) => (
            <div key={offer.id} className="card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 badge bg-orange-500 text-white shadow-md">{offer.badge}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{offer.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-orange-500">${offer.offerPrice}</span>
                  <span className="text-lg text-gray-400 line-through">${offer.originalPrice}</span>
                  <span className="badge bg-green-100 text-green-700 ml-auto">Save ${offer.originalPrice - offer.offerPrice}</span>
                </div>
                <Link to="/reservation" className="btn-primary w-full text-center">Book Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Reserve your table or order online — your next great meal is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation" className="bg-white text-orange-500 font-semibold px-8 py-3 rounded-full hover:bg-cream-100 transition-colors">
              Reserve a Table
            </Link>
            <Link to="/menu" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-orange-500 transition-colors">
              Order Online
            </Link>
          </div>
        </div>
      </section>

      <DishModal item={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  )
}
