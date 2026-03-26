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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f6eddc' }}>
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -z-10" style={{ backgroundColor: 'rgba(189, 214, 210, 0.2)' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10" style={{ backgroundColor: 'rgba(165, 200, 202, 0.2)' }}></div>

      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4" style={{ background: 'linear-gradient(to right, #a5c8ca, #bdd6d2)' }}>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            TaskApp
          </h1>
          <p>
            Únete para gestionar tus tareas
          </p>
        </div>

        {/* Card */}
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">
              Crear una cuenta
            </h2>
            <p className="text-sm">
              Completa los datos para registrarte
            </p>
          </div>

          {error && (
            <div className="text-sm px-4 py-3 rounded-lg mb-4 flex items-start gap-3 border-l-4" style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)', borderColor: '#e74c3c', color: '#e74c3c' }}>
              <span>{error}</span>
            </div>
          )}

          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />

          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #e3e5d7' }}>
            <p className="text-sm text-center">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="font-semibold hover:underline transition-colors"
                style={{ color: '#a5c8ca' }}
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center mt-6" style={{ color: '#bdd6d2' }}>
          © 2026 TaskApp. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}