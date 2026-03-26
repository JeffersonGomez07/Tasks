import { useAuth } from '../../hooks/useAuth'
import { ThemeToggle } from '../shared/ThemeToggle'

interface Props {
  onMenuClick: () => void
}

export const Header = ({ onMenuClick }: Props) => {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 flex items-center px-6 gap-4 shrink-0 border-b" style={{ backgroundColor: '#f6eddc', borderColor: '#bdd6d2' }}>

      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg transition-colors"
        style={{ color: '#586875' }}
        aria-label="Abrir menú"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="hidden sm:flex items-center gap-3 pl-3" style={{ borderLeft: '1px solid #bdd6d2' }}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg text-white text-sm font-bold" style={{ background: 'linear-gradient(to br, #a5c8ca, #bdd6d2)' }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium truncate max-w-[180px]">
            {user?.email}
          </span>
        </div>

        <button
          onClick={logout}
          className="btn-secondary px-3 py-2 text-sm"
        >
          Salir
        </button>
      </div>

    </header>
  )
}
