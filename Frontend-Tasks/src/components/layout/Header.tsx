import { useAuth } from '../../hooks/useAuth'

interface Props {
  onMenuClick: () => void
}

export const Header = ({ onMenuClick }: Props) => {
  const { user, logout } = useAuth()

  return (
    <header className="h-20 flex items-center px-8 gap-4 shrink-0 bg-white border-b border-gray-200 shadow-sm">

      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        aria-label="Abrir menú"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-6">
        {/* Barra de búsqueda (visual) */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent text-sm outline-none w-40 text-gray-600 placeholder-gray-400"
            disabled
          />
        </div>

        {/* Avatar y menu */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
              {user?.email}
            </p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>

        <button
          onClick={logout}
          className="btn-secondary px-4 py-2.5 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Salir
        </button>
      </div>

    </header>
  )
}
