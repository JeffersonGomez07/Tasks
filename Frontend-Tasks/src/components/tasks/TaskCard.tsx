import type { Task, TaskRequest, TaskStatus } from '../../types/task.types'

interface Props {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onToggleComplete: (id: number, task: Partial<TaskRequest>) => void
  onToggleStatus: (id: number, status: TaskStatus) => void
}

const priorityBadges = {
  HIGH:   'badge-high',
  MEDIUM: 'badge-medium',
  LOW:    'badge-low',
}

const statusBadges = {
  PENDING:     'badge-pending',
  IN_PROGRESS: 'badge-progress',
  COMPLETED:   'badge-completed',
}

const priorityLabel = {
  HIGH:   'Alta',
  MEDIUM: 'Media',
  LOW:    'Baja',
}

const statusLabel = {
  PENDING:     'Pendiente',
  IN_PROGRESS: 'En progreso',
  COMPLETED:   'Completada',
}

const statusEmoji = {
  PENDING:     '',
  IN_PROGRESS: '',
  COMPLETED:   '',
}

const priorityEmoji = {
  HIGH:   '',
  MEDIUM: '',
  LOW:    '',
}

export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }: Props) => {
  const isCompleted = task.status === 'COMPLETED'

  return (
    <div className={`card overflow-hidden transition-all duration-200 ${
      isCompleted ? 'opacity-70' : 'hover:shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold transition-all ${
            isCompleted 
              ? 'line-through text-gray-400 dark:text-gray-500' 
              : 'text-gray-900 dark:text-gray-100'
          }`}>
            {task.title}
          </h3>
        </div>
        <span className={priorityBadges[task.priority]}>
          {priorityEmoji[task.priority]} {priorityLabel[task.priority]}
        </span>
      </div>

      {/* Descripción */}
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
        <span className={statusBadges[task.status]}>
          {statusEmoji[task.status]} {statusLabel[task.status]}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          {new Date(task.dueDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleComplete(task.id, {
            status: isCompleted ? 'PENDING' : 'COMPLETED'
          })}
          className={`flex-1 text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200 ${
            isCompleted
              ? 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
          }`}
        >
          {isCompleted ? 'Reabrir' : 'Completar'}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="flex-1 text-xs font-medium py-2 px-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 text-xs font-medium py-2 px-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}