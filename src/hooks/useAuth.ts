import { useCallback, useEffect, useState } from 'react'
import { authService } from '../services/auth/authService'
import { storageService } from '../services/storage/storageService'
import type { User } from '../types/user'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const logout = useCallback(() => {
    storageService.removeToken()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const token = storageService.getToken()
      if (!token) {
        setLoading(false)
        return
      }

      const userData = await authService.validateToken(token)
      setUser(userData)
      setIsAuthenticated(true)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }, [logout])

  useEffect(() => {
    void checkAuth()
  }, [checkAuth])

  const login = useCallback(async (email: string, password: string) => {
    const { user: userData, token } = await authService.login({ email, password })
    storageService.setToken(token)
    setUser(userData)
    setIsAuthenticated(true)
  }, [])

  return { user, loading, isAuthenticated, login, logout, checkAuth }
}