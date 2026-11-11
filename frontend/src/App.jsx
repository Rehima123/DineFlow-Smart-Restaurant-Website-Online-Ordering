import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/Layout'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'

// Customer pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Reservation from './pages/Reservation'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminMenu from './pages/admin/AdminMenu'
import AdminReservations from './pages/admin/AdminReservations'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminLayout from './pages/admin/AdminLayout'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1c1c1c',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
        <Routes>
          {/* Customer routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/menu" element={<Layout><Menu /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/reservation" element={<Layout><Reservation /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Layout><Checkout /></Layout>
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
