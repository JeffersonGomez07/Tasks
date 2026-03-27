import { NavLink } from 'react-router-dom'

interface Props {
  onClose?: () => void
}

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/stats',     label: 'Estadísticas' },
]

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
    isActive
      ? 'text-white bg-white/20 shadow-lg'
      : 'text-white/70 hover:text-white hover:bg-white/10'
  }`

export const Sidebar = ({ onClose }: Props) => {
  return (
    <aside className="w-64 h-full flex flex-col bg-gradient-to-b from-indigo-600 to-violet-600 shadow-2xl">

      {/* Logo + botón cerrar en mobile */}
      <div className="h-20 flex items-center justify-between px-6 shrink-0 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-lg">
            ✓
          </div>
          <span className="text-lg font-extrabold text-white">TaskApp</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all text-white/70 hover:text-white"
          aria-label="Cerrar menú"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-2 p-5 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={navClass}
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {link.to === '/dashboard' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l4-4m0 0l4-4m-4 4l-4-4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              )}
            </svg>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-6 border-t border-white/10">
        <p className="text-xs text-center font-medium text-white/70">
          TaskApp v1.0
        </p>
      </div>

    </aside>
  )
}