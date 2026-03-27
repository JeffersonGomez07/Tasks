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
    <div className="min-h-screen flex bg-white">
      {/* Sección izquierda - Gradiente (oculta en móvil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 items-center justify-center relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 text-center text-white px-8">
          <div className="mb-8">
            <div className="text-6xl font-extrabold mb-4">✓</div>
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              Organiza<br />tus tareas
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Gestiona proyectos, mantén el enfoque y completa lo que realmente importa
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 mt-12 text-sm">
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
            <p className="text-white/70">Diseñado para tu productividad</p>
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
          </div>
        </div>
      </div>

      {/* Sección derecha - Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-sm">
          {/* Logo - Visible solo en móvil */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 mb-4">
              <span className="text-white text-2xl font-bold">✓</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              TaskApp
            </h1>
          </div>

          {/* Contenido del formulario */}
          <div className="mb-8">
            <h2 className="hidden lg:block text-3xl font-extrabold text-gray-900 mb-2">
              Bienvenido de vuelta
            </h2>
            <h2 className="lg:hidden text-2xl font-extrabold text-gray-900 mb-2">
              Inicia sesión
            </h2>
            <p className="text-gray-600 font-medium">
              Accede a tu cuenta para continuar
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl mb-6 flex items-start gap-3 bg-red-50 border border-red-200">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
              <span className="text-sm font-semibold text-red-800">{error}</span>
            </div>
          )}

          {/* Formulario */}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          {/* Link a registro */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 font-medium">
              ¿No tienes cuenta?{' '}
              <Link 
                to="/register" 
                className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
              >
                Crea una aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-8">
          © 2026 TaskApp. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}