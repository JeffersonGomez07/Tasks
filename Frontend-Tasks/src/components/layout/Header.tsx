import { useAuth } from '../../hooks/useAuth'

interface Props {
  onMenuClick: () => void
}

export const Header = ({ onMenuClick }: Props) => {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h2 className="text-sm font-medium text-gray-500">
          Bienvenido de nuevo
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">
          {user?.email}
        </span>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:text-red-700 font-medium"
        >
          Cerrar sesión
        </button>
      </div>

    </header>
  )
}