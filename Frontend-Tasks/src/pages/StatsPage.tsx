import { useEffect } from 'react'
import { useTasks } from '../hooks/useTasks'
import { StatsSkeleton } from '../components/tasks/StatsSkeleton'

interface StatCardProps {
  label: string
  value: number
  total?: number
  color: string
  bg: string
}

const StatCard = ({ label, value, total, color, bg }: StatCardProps) => (
  <div className={`rounded-xl p-5 ${bg} flex flex-col gap-1`}>
    <span className={`text-3xl font-bold ${color}`}>{value}</span>
    <span className="text-sm text-gray-600">{label}</span>
    {total !== undefined && total > 0 && (
      <span className="text-xs text-gray-400">
        {Math.round((value / total) * 100)}% del total
      </span>
    )}
  </div>
)

export const StatsPage = () => {
  const { tasks, loading, fetchTasks } = useTasks()

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const total      = tasks.length
  const pending    = tasks.filter(t => t.status === 'PENDING').length
  const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length
  const completed  = tasks.filter(t => t.status === 'COMPLETED').length

  const high   = tasks.filter(t => t.priority === 'HIGH').length
  const medium = tasks.filter(t => t.priority === 'MEDIUM').length
  const low    = tasks.filter(t => t.priority === 'LOW').length

  const today    = new Date()
  today.setHours(0, 0, 0, 0)

  const overdue = tasks.filter(t => {
    if (!t.dueDate || t.status === 'COMPLETED') return false
    return new Date(t.dueDate) < today
  })

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    if (loading) return <StatsSkeleton />


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Estadísticas</h1>
        <p className="text-sm text-gray-500 mt-1">
          Resumen general de tus tareas
        </p>
      </div>

      {/* Progreso general */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Progreso general</span>
          <span className="text-sm font-bold text-gray-800">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full bg-green-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">
          {completed} de {total} tareas completadas
        </p>
      </div>

      {/* Contadores por estado */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Por estado
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total"       value={total}      color="text-gray-700"  bg="bg-gray-50 border border-gray-200" />
          <StatCard label="Pendientes"  value={pending}    total={total} color="text-yellow-600" bg="bg-yellow-50 border border-yellow-100" />
          <StatCard label="En progreso" value={inProgress} total={total} color="text-blue-600"   bg="bg-blue-50 border border-blue-100" />
          <StatCard label="Completadas" value={completed}  total={total} color="text-green-600"  bg="bg-green-50 border border-green-100" />
        </div>
      </section>

      {/* Contadores por prioridad */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Por prioridad
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Alta"  value={high}   total={total} color="text-red-600"    bg="bg-red-50 border border-red-100" />
          <StatCard label="Media" value={medium} total={total} color="text-amber-600"  bg="bg-amber-50 border border-amber-100" />
          <StatCard label="Baja"  value={low}    total={total} color="text-emerald-600" bg="bg-emerald-50 border border-emerald-100" />
        </div>
      </section>

      {/* Tareas vencidas */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Tareas vencidas
          </h2>
          {overdue.length > 0 && (
            <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              {overdue.length} {overdue.length === 1 ? 'tarea' : 'tareas'}
            </span>
          )}
        </div>

        {overdue.length === 0 ? (
          <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-center">
            <p className="text-green-600 font-medium text-sm">Sin tareas vencidas</p>
            <p className="text-green-400 text-xs mt-1">Todo está al día</p>
          </div>
        ) : (
          <div className="space-y-2">
            {overdue.map(task => {
              const daysOverdue = Math.floor(
                (today.getTime() - new Date(task.dueDate!).getTime()) / (1000 * 60 * 60 * 24)
              )
              return (
                <div
                  key={task.id}
                  className="bg-white border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Venció el {new Date(task.dueDate!).toLocaleDateString('es-CR', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${task.priority === 'HIGH'   ? 'bg-red-100 text-red-600'    :
                        task.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-600' :
                                                     'bg-gray-100 text-gray-500'}`}>
                      {task.priority === 'HIGH' ? 'Alta' : task.priority === 'MEDIUM' ? 'Media' : 'Baja'}
                    </span>
                    <span className="text-xs text-red-500 font-medium">
                      {daysOverdue === 1 ? 'Ayer' : `Hace ${daysOverdue} días`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

    </div>
  )
}