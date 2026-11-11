import API from './api'
import { menuItems as sampleMenu, categories as sampleCategories } from '../data/menuData'

// ====== AUTH ======
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  me: () => API.get('/auth/me'),
}

// ====== MENU ITEMS ======
export const menuAPI = {
  // Fetch all menu items; gracefully fall back to sample data if backend is offline
  getAll: async (params = {}) => {
    try {
      return await API.get('/menu', { params })
    } catch {
      // Backend offline — return sample data filtered by params
      let items = [...sampleMenu]
      if (params.category && params.category !== 'all') {
        items = items.filter((i) => i.category === params.category)
      }
      if (params.search) {
        const q = params.search.toLowerCase()
        items = items.filter((i) => i.name.toLowerCase().includes(q))
      }
      return { items }
    }
  },
  getById: async (id) => {
    try {
      return await API.get(`/menu/${id}`)
    } catch {
      const item = sampleMenu.find((i) => i.id === Number(id) || i.id === id)
      return { item }
    }
  },
  create: (data) => API.post('/menu', data),
  update: (id, data) => API.put(`/menu/${id}`, data),
  remove: (id) => API.delete(`/menu/${id}`),
}

// ====== CATEGORIES ======
export const categoryAPI = {
  getAll: async () => {
    try {
      return await API.get('/categories')
    } catch {
      return { categories: sampleCategories }
    }
  },
  create: (data) => API.post('/categories', data),
  update: (id, data) => API.put(`/categories/${id}`, data),
  remove: (id) => API.delete(`/categories/${id}`),
}

// ====== ORDERS ======
export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getMyOrders: () => API.get('/orders/my-orders'),
  getById: (id) => API.get(`/orders/${id}`),
  getAll: (params) => API.get('/orders', { params }),
  updateStatus: (id, status) => API.patch(`/orders/${id}/status`, { status }),
}

// ====== RESERVATIONS ======
export const reservationAPI = {
  create: (data) => API.post('/reservations', data),
  getAll: () => API.get('/reservations'),
  updateStatus: (id, status) => API.patch(`/reservations/${id}/status`, { status }),
}

// ====== ADMIN ======
export const adminAPI = {
  getStats: async () => {
    try {
      return await API.get('/admin/stats')
    } catch {
      // Fallback demo stats when backend is offline
      return {
        stats: {
          totalOrders: 248,
          totalRevenue: 18420,
          totalCustomers: 156,
          pendingOrders: 12,
        },
        recentOrders: [],
        monthlyRevenue: [],
      }
    }
  },
  getCustomers: () => API.get('/admin/customers'),
}
