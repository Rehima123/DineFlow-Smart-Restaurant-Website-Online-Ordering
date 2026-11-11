import { Link } from 'react-router-dom'
import { Award, Heart, Leaf, Users, ArrowRight } from 'lucide-react'

export default function About() {
  const values = [
    { icon: Leaf, title: 'Fresh & Local', desc: 'We source ingredients from local farms and trusted suppliers daily.' },
    { icon: Heart, title: 'Crafted with Love', desc: 'Every dish is prepared with passion by our award-winning culinary team.' },
    { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standard in everything we serve.' },
    { icon: Users, title: 'Community', desc: 'We support our community through events, charities, and partnerships.' },
  ]

  const team = [
    { name: 'Marco Antonelli', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80' },
    { name: 'Sofia Laurent', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4b47?w=400&q=80' },
    { name: 'James O\'Connor', role: 'Head Sommelier', image: 'https://images.unsplash.com/photo-1583394293214-28a595dba642?w=400&q=80' },
    { name: 'Yuki Tanaka', role: 'Sous Chef', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1920&q=80" alt="Our restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Our Story</h1>
            <p className="text-gray-200 text-lg max-w-xl">Where passion meets the plate</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" alt="Chef cooking" className="rounded-2xl shadow-lg w-full h-[450px] object-cover" />
          <div>
            <span className="badge bg-orange-100 text-orange-700 mb-4">Est. 2009</span>
            <h2 className="section-title mb-4">From Humble Beginnings</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DineFlow started as a small family kitchen with a big dream: to bring people together through exceptional food. What began as a cozy 20-seat bistro has grown into one of the city's most beloved dining destinations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Over 15 years, we've stayed true to our roots — sourcing the best local ingredients, supporting our community, and treating every guest like family. Our menu evolves with the seasons, but our commitment to quality never changes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, our team of 40+ professionals serves hundreds of guests daily, but the heart of DineFlow remains the same: great food, warm hospitality, and memorable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge bg-orange-100 text-orange-700 mb-4">Our Mission</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          "To create moments of joy through extraordinary food and genuine hospitality."
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We believe dining is more than just a meal — it's an experience that brings people together. Every plate we serve is a reflection of our dedication to craft, community, and connection.
        </p>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Meet Our Team</h2>
            <p className="text-gray-400 mt-3 text-lg">The talented people behind every dish</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative h-72 overflow-hidden rounded-2xl">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="font-display text-xl font-semibold text-white">{member.name}</h3>
                    <p className="text-orange-400 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">Come Experience DineFlow</h2>
        <p className="text-gray-600 mb-8">Whether it's a special occasion or a casual dinner, we'd love to have you.</p>
        <Link to="/reservation" className="btn-primary inline-flex items-center gap-2">
          Reserve Your Table <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
