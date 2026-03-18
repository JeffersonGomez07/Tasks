import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
import { register } from '../services/authService'
import type { RegisterCredentials } from '../types/auth.types'
import axios from 'axios'

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = credentials
      const { token } = await register(registerData)
      localStorage.setItem('token', token)
      navigate('/dashboard')

    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('No autorizado, verifica tus datos')
      } else {
        setError('Ocurrió un error, intenta de nuevo')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Crear cuenta</h1>
        <p className="text-sm text-gray-500 mb-6">Completa los datos para registrarte</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />

        <p className="text-sm text-center text-gray-500 mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>

      </div>
    </div>
  )
}