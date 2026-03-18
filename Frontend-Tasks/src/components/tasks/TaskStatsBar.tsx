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
    { label: 'Total',       value: total,      color: 'text-gray-700',  bg: 'bg-gray-100'   },
    { label: 'Pendientes',  value: pending,    color: 'text-yellow-700', bg: 'bg-yellow-100' },
    { label: 'En progreso', value: inProgress, color: 'text-blue-700',  bg: 'bg-blue-100'   },
    { label: 'Completadas', value: completed,  color: 'text-green-700', bg: 'bg-green-100'  },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map(stat => (
        <div key={stat.label} className={`${stat.bg} rounded-xl px-4 py-3`}>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}