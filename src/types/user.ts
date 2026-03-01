export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}