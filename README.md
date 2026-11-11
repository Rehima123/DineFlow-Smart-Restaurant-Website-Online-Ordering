# DineFlow – Premium Restaurant Website & Online Ordering Platform

A full-stack restaurant website built with React, Vite, Tailwind CSS, Express, and MongoDB.

## Features

### Customer Website
- **Home** — Hero, featured dishes, categories, about, testimonials, special offers, newsletter
- **Menu** — Search, filter by category, sort by price/popularity/rating, dish detail modal
- **Shopping Cart** — Add/remove items, quantity controls, persistent (localStorage)
- **Checkout** — Customer info form, delivery address, payment method, order confirmation
- **Table Reservation** — Date, time, guests, special requests with validation
- **About** — Restaurant story, values, team section
- **Contact** — Contact form, map, opening hours
- **Auth** — Register, Login, password visibility toggle, protected routes

### Admin Dashboard (`/admin`)
- Overview with revenue/orders charts (Recharts)
- Order management with status updates
- Menu item CRUD (create, edit, delete)
- Reservation management
- Customer list
- Role-based access control (admin only)

### Backend
- REST API with Express
- MongoDB with Mongoose models and relationships
- JWT authentication with bcrypt password hashing
- Role-based authorization (customer/admin)
- Error handling middleware
- Input validation
- Environment variable configuration

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios, Lucide React, Recharts, React Hot Toast
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # then edit values
npm run dev
```
Backend runs at `http://localhost:5000`

### Seed the Database
```bash
cd backend
npm run seed
```
This creates:
- Admin user: `admin@dineflow.com` / `admin123`
- Demo customer: `john@example.com` / `password123`
- 7 categories and 20 menu items

## Demo Mode
The frontend works even without the backend running. When the API is unreachable, it gracefully falls back to sample data for browsing the menu and placing demo orders.

## Admin Access
Login with `admin@dineflow.com` / `admin123` to access the admin dashboard at `/admin`.

## Project Structure
```
DineFlow/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI (Navbar, Footer, FoodCard, etc.)
│   │   ├── context/       # Auth & Cart context providers
│   │   ├── data/          # Sample menu data
│   │   ├── pages/         # Route pages
│   │   │   └── admin/     # Admin dashboard pages
│   │   ├── services/      # API client & endpoints
│   │   ├── App.jsx        # Routes
│   │   └── main.jsx       # Entry point
│   └── ...
├── backend/
│   ├── config/            # Database connection
│   ├── controllers/       # Route controllers
│   ├── middleware/       # Auth & error middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── seed.js            # Database seeding
│   └── server.js          # Express server
└── README.md
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Menu
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/menu` | Get all items (supports ?category=, ?search=) | Public |
| GET | `/api/menu/:id` | Get single item | Public |
| POST | `/api/menu` | Create item | Admin |
| PUT | `/api/menu/:id` | Update item | Admin |
| DELETE | `/api/menu/:id` | Delete item | Admin |

### Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/categories` | Get all categories | Public |
| POST | `/api/categories` | Create category | Admin |
| PUT | `/api/categories/:id` | Update category | Admin |
| DELETE | `/api/categories/:id` | Delete category | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders` | Create order | Customer |
| GET | `/api/orders/my-orders` | Get user's orders | Customer |
| GET | `/api/orders` | Get all orders | Admin |
| PATCH | `/api/orders/:id/status` | Update status | Admin |

### Reservations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/reservations` | Create reservation | Public |
| GET | `/api/reservations` | Get all reservations | Admin |
| PATCH | `/api/reservations/:id/status` | Update status | Admin |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard statistics |
| GET | `/api/admin/customers` | Customer list with order data |
