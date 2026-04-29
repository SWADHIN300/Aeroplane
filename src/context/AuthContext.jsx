import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexfly-user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isAuthenticated = !!user

  useEffect(() => {
    if (user) {
      localStorage.setItem('nexfly-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('nexfly-user')
      localStorage.removeItem('nexfly-token')
    }
  }, [user])

  const register = async (name, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.register(name, email, password)
      localStorage.setItem('nexfly-token', data.token)
      setUser({ name: data.name, email: data.email })
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.login(email, password)
      localStorage.setItem('nexfly-token', data.token)
      setUser({ name: data.name, email: data.email })
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
