import axiosInstance from './axiosInstance'
import type { LoginCredentials, RegisterCredentials,  AuthResponse } from '../types/auth.types'

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials)
  return response.data
}

export const register = async (credentials: Omit<RegisterCredentials, 'confirmPassword'>): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', credentials)
  return response.data
}

