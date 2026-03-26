import { NavLink } from 'react-router-dom'

interface Props {
  onClose?: () => void
}

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/stats',     label: 'Estadísticas' },
]

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
    isActive
      ? 'text-white shadow-md'
      : 'hover:bg-gray-100'
  }`

export const Sidebar = ({ onClose }: Props) => {
  return (
    <aside className="w-64 h-full flex flex-col" style={{ backgroundColor: '#f6eddc', borderRight: '1px solid #bdd6d2' }}>

      {/* Logo + botón cerrar en mobile */}
      <div className="h-16 flex items-center justify-between px-6 shrink-0" style={{ borderBottom: '1px solid #bdd6d2' }}>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gradient">TaskApp</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:transition-all"
          style={{ color: '#586875' }}
          aria-label="Cerrar menú"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Links — al hacer click en mobile cierra el sidebar */}
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={navClass}
            onClick={onClose}
            style={({ isActive }) => isActive ? { background: 'linear-gradient(to right, #a5c8ca, #bdd6d2)' } : {}}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid #bdd6d2', color: '#586875' }}>
        <p className="text-xs text-center font-medium">
          TaskApp v1.0
        </p>
      </div>

    </aside>
  )
}