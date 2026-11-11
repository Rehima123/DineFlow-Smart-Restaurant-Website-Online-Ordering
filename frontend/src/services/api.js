import axios from 'axios'

// Centralized API client with JWT interceptor
const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('dineflow_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-logout on 401
API.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('dineflow_token')
      localStorage.removeItem('dineflow_user')
    }
    return Promise.reject(error)
  }
)

export default API
