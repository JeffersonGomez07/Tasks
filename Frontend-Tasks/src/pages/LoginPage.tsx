import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import type { LoginCredentials } from '../types/auth.types'

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      await login(credentials)
      navigate('/dashboard')

    } catch {
      setError('Correo o contraseña incorrectos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido</h1>
        <p className="text-sm text-gray-500 mb-6">Ingresa a tu cuenta</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

        <p className="text-sm text-center text-gray-500 mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>

      </div>
    </div>
  )
}