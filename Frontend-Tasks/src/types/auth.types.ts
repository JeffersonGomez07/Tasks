export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    email: string
    password: string
    confirmPassword: string
}

export interface User {
  id: number
  email: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}