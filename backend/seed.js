import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'
import Category from './models/Category.js'
import MenuItem from './models/MenuItem.js'

dotenv.config()

// Sample categories
const categories = [
  { name: 'Starters', slug: 'starters', icon: '🥗', description: 'Light bites to begin your meal' },
  { name: 'Main Course', slug: 'mains', icon: '🍖', description: 'Hearty main dishes' },
  { name: 'Pasta & Risotto', slug: 'pasta', icon: '🍝', description: 'Italian classics' },
  { name: 'Seafood', slug: 'seafood', icon: '🦞', description: 'Fresh from the sea' },
  { name: 'Pizza', slug: 'pizza', icon: '🍕', description: 'Wood-fired pizzas' },
  { name: 'Desserts', slug: 'desserts', icon: '🍮', description: 'Sweet endings' },
  { name: 'Drinks', slug: 'drinks', icon: '🍷', description: 'Beverages and cocktails' },
]

// Sample menu items
const menuItems = [
  { name: 'Burrata & Heirloom Tomatoes', description: 'Creamy burrata with heirloom tomatoes, fresh basil, aged balsamic, and cold-pressed olive oil.', price: 16, category: 'starters', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', rating: 4.8, reviews: 124, popular: true, vegetarian: true, tags: ["Chef's Pick", 'Vegetarian'] },
  { name: 'Truffle Arancini', description: 'Golden risotto balls filled with black truffle, fontina cheese, served with roasted tomato sauce.', price: 14, category: 'starters', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80', rating: 4.7, reviews: 98, vegetarian: true, tags: ['Vegetarian'] },
  { name: 'Seared Scallops', description: 'Pan-seared diver scallops with pea purée, crispy pancetta, lemon butter, and micro herbs.', price: 22, category: 'starters', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80', rating: 4.9, reviews: 156, popular: true, tags: ["Chef's Pick", 'Signature'] },
  { name: 'French Onion Soup', description: 'Classic caramelized onion soup with aged Gruyère crust, fresh thyme, and a touch of brandy.', price: 12, category: 'starters', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', rating: 4.6, reviews: 87, vegetarian: true, tags: ['Vegetarian'] },
  { name: 'Dry-Aged Ribeye Steak', description: '45-day dry-aged 400g ribeye, compound herb butter, roasted garlic mash, and broccolini.', price: 58, category: 'mains', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', rating: 4.9, reviews: 203, popular: true, tags: ['Signature', 'Best Seller'] },
  { name: 'Herb-Crusted Rack of Lamb', description: 'New Zealand lamb rack with Dijon & herb crust, dauphinoise potatoes, and rosemary jus.', price: 52, category: 'mains', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80', rating: 4.8, reviews: 134, popular: true, tags: ["Chef's Pick"] },
  { name: 'Pan-Roasted Duck Breast', description: 'Magret duck breast with cherry gastrique, celeriac purée, wilted spinach, and duck fat potatoes.', price: 44, category: 'mains', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', rating: 4.7, reviews: 112 },
  { name: 'Mushroom Wellington', description: 'Wild mushroom & lentil Wellington in golden puff pastry, red wine jus, and seasonal vegetables.', price: 36, category: 'mains', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80', rating: 4.6, reviews: 76, vegetarian: true, tags: ['Vegetarian'] },
  { name: 'Black Truffle Tagliatelle', description: 'Hand-rolled egg pasta with shaved black truffle, Parmesan, brown butter, and truffle oil.', price: 32, category: 'pasta', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80', rating: 4.9, reviews: 189, popular: true, vegetarian: true, tags: ['Signature', 'Vegetarian'] },
  { name: 'Lobster Bisque Risotto', description: 'Carnaroli rice cooked in lobster bisque, with half a lobster tail, tarragon, and crème fraîche.', price: 42, category: 'pasta', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80', rating: 4.8, reviews: 143, popular: true, tags: ["Chef's Pick"] },
  { name: 'Cacio e Pepe', description: 'Roman-style tonnarelli pasta with Pecorino Romano, aged Parmesan, and freshly cracked black pepper.', price: 24, category: 'pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80', rating: 4.7, reviews: 165, vegetarian: true, tags: ['Vegetarian'] },
  { name: 'Whole Grilled Sea Bass', description: 'Line-caught sea bass grilled whole with lemon, capers, Mediterranean herbs, and ratatouille.', price: 48, category: 'seafood', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80', rating: 4.8, reviews: 118, popular: true, tags: ['Signature'] },
  { name: 'King Prawn Linguine', description: 'Wild king prawns in white wine, garlic, cherry tomatoes, chilli, and linguine with parsley.', price: 34, category: 'seafood', image: 'https://images.unsplash.com/photo-1563379091339-03246963e69e?w=600&q=80', rating: 4.7, reviews: 92 },
  { name: 'Truffle & Porcini Pizza', description: 'Fior di latte, porcini cream, fresh truffle shavings, wild mushrooms, and rocket on sourdough base.', price: 26, category: 'pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', rating: 4.9, reviews: 234, popular: true, vegetarian: true, tags: ['Best Seller', 'Vegetarian'] },
  { name: 'Margherita Classica', description: 'San Marzano tomatoes, fresh buffalo mozzarella, fresh basil, and extra-virgin olive oil.', price: 18, category: 'pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', rating: 4.6, reviews: 198, vegetarian: true, tags: ['Vegetarian'] },
  { name: 'Chocolate Fondant', description: 'Warm Valrhona dark chocolate fondant with vanilla Chantilly, praline crumble, and salted caramel.', price: 14, category: 'desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80', rating: 4.9, reviews: 267, popular: true, vegetarian: true, tags: ['Best Seller', 'Vegetarian'] },
  { name: 'Crème Brûlée', description: 'Classic Madagascan vanilla custard with caramelized sugar crust and seasonal berry compote.', price: 11, category: 'desserts', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80', rating: 4.7, reviews: 143, vegetarian: true, tags: ['Vegetarian'] },
  { name: 'Tiramisu', description: 'Traditional Italian tiramisu with mascarpone, Kahlúa-soaked savoiardi, and cocoa.', price: 12, category: 'desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', rating: 4.8, reviews: 189, popular: true, vegetarian: true, tags: ["Chef's Pick", 'Vegetarian'] },
  { name: 'Signature Espresso Martini', description: 'Freshly pulled espresso, Kahlúa, Grey Goose vodka, shaken to a perfect golden foam.', price: 15, category: 'drinks', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80', rating: 4.8, reviews: 211, popular: true, tags: ['Best Seller'] },
  { name: 'Barrel-Aged Negroni', description: 'Campari, Martini Rosso, and Tanqueray gin aged in oak barrels for 30 days.', price: 16, category: 'drinks', image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&q=80', rating: 4.7, reviews: 134 },
]

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      MenuItem.deleteMany({}),
    ])

    // Create admin user
    const admin = await User.create({
      name: 'DineFlow Admin',
      email: 'admin@dineflow.com',
      password: 'admin123',
      role: 'admin',
    })
    console.log('✅ Admin user created:', admin.email)

    // Create a demo customer
    const customer = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'customer',
    })
    console.log('✅ Demo customer created:', customer.email)

    // Insert categories
    await Category.insertMany(categories)
    console.log(`✅ ${categories.length} categories seeded`)

    // Insert menu items
    await MenuItem.insertMany(menuItems)
    console.log(`✅ ${menuItems.length} menu items seeded`)

    console.log('\n🎉 Database seeded successfully!')
    console.log('\nLogin credentials:')
    console.log('  Admin:    admin@dineflow.com / admin123')
    console.log('  Customer: john@example.com / password123')
  } catch (error) {
    console.error('❌ Seed error:', error.message)
  } finally {
    mongoose.connection.close()
    process.exit(0)
  }
}

seedDB()
