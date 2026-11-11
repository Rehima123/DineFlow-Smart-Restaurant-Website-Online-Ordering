import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/endpoints'

const AuthContext = createContext()

const TOKEN_KEY = 'dineflow_token'
const USER_KEY = 'dineflow_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    const savedUser = localStorage.getItem(USER_KEY)
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      }
    }
    setLoading(false)
  }, [])

  // Register a new user
  const register = async (formData) => {
    const res = await authAPI.register(formData)
    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token)
      localStorage.setItem(USER_KEY, JSON.stringify(res.user))
      setUser(res.user)
    }
    return res
  }

  // Login existing user
  const login = async (formData) => {
    const res = await authAPI.login(formData)
    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token)
      localStorage.setItem(USER_KEY, JSON.stringify(res.user))
      setUser(res.user)
    }
    return res
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  const isAdmin = user?.role === 'admin'

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAdmin,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
