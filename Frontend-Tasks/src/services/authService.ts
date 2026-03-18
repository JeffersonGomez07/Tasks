import axiosInstance from './axiosInstance'
import type { LoginCredentials, AuthResponse, RegisterCredentials } from '../types/auth.types'

const MOCK = true // Cambia a false cuando el backend esté listo

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (MOCK) {
    return {
      token: 'mock-token-123',
      user: { id: 1, email: credentials.email }
    }
  }

  const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials)
  return response.data
}

export const register = async (credentials: Omit<RegisterCredentials, 'confirmPassword'>): Promise<AuthResponse> => {
  if (MOCK) {
    return {
      token: 'mock-token-123',
      user: { id: 1, email: credentials.email }
    }
  }

  const response = await axiosInstance.post<AuthResponse>('/auth/register', credentials)
  return response.data
}