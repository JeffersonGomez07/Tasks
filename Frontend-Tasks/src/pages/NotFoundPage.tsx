import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">

        {/* Número 404 */}
        <p className="text-8xl font-bold text-gray-200 dark:text-gray-800 select-none">
          404
        </p>

        {/* Mensaje */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-4">
          Página no encontrada
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          La ruta que buscás no existe o fue movida.
        </p>

        {/* Botón */}
        <button
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login', { replace: true })}
          className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                     text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {isAuthenticated ? 'Volver al dashboard' : 'Ir al login'}
        </button>

      </div>
    </div>
  )
}