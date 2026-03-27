import type { Task } from '../../types/task.types'

interface Props {
  tasks: Task[]
}

export const TaskStatsBar = ({ tasks }: Props) => {
  const total     = tasks.length
  const pending   = tasks.filter(t => t.status === 'PENDING').length
  const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length
  const completed = tasks.filter(t => t.status === 'COMPLETED').length

  const stats = [
    {
      label: 'Total',
      value: total,
      gradient: 'from-indigo-600 to-purple-600',
      bgLight: 'bg-indigo-50',
      icon: '📊',
    },
    {
      label: 'Pendientes',
      value: pending,
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      icon: '⏳',
    },
    {
      label: 'En progreso',
      value: inProgress,
      gradient: 'from-blue-500 to-cyan-600',
      bgLight: 'bg-blue-50',
      icon: '⚙️',
    },
    {
      label: 'Completadas',
      value: completed,
      gradient: 'from-green-500 to-emerald-600',
      bgLight: 'bg-green-50',
      icon: '✓',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {stats.map(stat => (
        <div key={stat.label} className={`${stat.bgLight} rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative group`}>
          {/* Fondo degradado decorativo */}
          <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-300`}></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className={`text-4xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${stat.gradient} shadow-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
              {stat.value}
            </div>
          </div>
          
          {/* Barra de progreso sutil */}
          {stat.value > 0 && (
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${stat.gradient}`} style={{ width: `${Math.min((stat.value / total) * 100, 100)}%` }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}