const TOKEN_KEY = 'auth_token'

export const storageService = {
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  },
}