import { apiClient } from '../api/apiClient'
import type { LoginRequest, LoginResponse, User } from '../../types/user'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@revoderm.com',
  role: 'user',
}

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    if (!import.meta.env.VITE_API_URL) {
      await wait(400)
      if (!payload.email || !payload.password) {
        throw new Error('Email and password are required.')
      }
      return { user: { ...mockUser, email: payload.email }, token: 'mock-jwt-token' }
    }

    const { data } = await apiClient.post<LoginResponse>('/auth/login', payload)
    return data
  },

  async validateToken(token: string): Promise<User> {
    if (!import.meta.env.VITE_API_URL) {
      await wait(250)
      if (!token) {
        throw new Error('Invalid token')
      }
      return mockUser
    }

    const { data } = await apiClient.get<User>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  },
}