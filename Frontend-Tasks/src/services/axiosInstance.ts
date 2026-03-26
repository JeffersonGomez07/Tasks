import axios from 'axios'
import { handleApiError } from './apiErrorHandler'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 segundos — evita requests colgados
})

// Request: agrega el token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response: manejo global de errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    // 401 — sesión expirada: limpia y redirige
    if (status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // Para el resto de errores dispara el toast global
    // Excepción: si la request tiene `skipGlobalErrorHandler: true`
    // en su config, el componente maneja el error por su cuenta
    if (!error.config?.skipGlobalErrorHandler) {
      handleApiError(error)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance