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
    { label: 'Total',       value: total,      color: 'from-slate-600 to-slate-700', lightBg: 'bg-slate-100 dark:bg-slate-900/30', darkText: 'text-slate-900 dark:text-slate-200' },
    { label: 'Pendientes',  value: pending,    color: 'from-amber-500 to-amber-600', lightBg: 'bg-amber-100 dark:bg-amber-900/30', darkText: 'text-amber-900 dark:text-amber-200' },
    { label: 'En progreso', value: inProgress, color: 'from-blue-500 to-blue-600', lightBg: 'bg-blue-100 dark:bg-blue-900/30', darkText: 'text-blue-900 dark:text-blue-200' },
    { label: 'Completadas', value: completed,  color: 'from-emerald-500 to-emerald-600', lightBg: 'bg-emerald-100 dark:bg-emerald-900/30', darkText: 'text-emerald-900 dark:text-emerald-200' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.label} className={`card border-0 overflow-hidden`}>
          <div className={`flex items-center justify-between`}>
            <div className="flex-1">
              <p className={`text-3xl font-bold ${stat.darkText}`}>{stat.value}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-medium">{stat.label}</p>
            </div>
          <div className={`text-3xl ml-3 flex-shrink-0`}></div>
          </div>
          <div className={`absolute -bottom-0 -right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl`}></div>
        </div>
      ))}
    </div>
  )
}