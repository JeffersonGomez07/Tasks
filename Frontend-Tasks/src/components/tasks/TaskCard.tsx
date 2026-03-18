import type { Task, TaskRequest, TaskStatus } from '../../types/task.types'

interface Props {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onToggleComplete: (id: number, task: Partial<TaskRequest>) => void
  onToggleStatus: (id: number, status: TaskStatus) => void
}

const priorityBadge = {
  HIGH:   'bg-red-100 text-red-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  LOW:    'bg-green-100 text-green-700',
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

export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }: Props) => {
  const isCompleted = task.status === 'COMPLETED'

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-5 flex flex-col gap-3 transition-opacity ${
      isCompleted ? 'opacity-60' : 'opacity-100'
    }`}>

      {/* Header — título y badge de prioridad */}
      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-semibold text-gray-800 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${priorityBadge[task.priority]}`}>
          {priorityLabel[task.priority]}
        </span>
      </div>

      {/* Descripción */}
      {task.description && (
        <p className="text-sm text-gray-500 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Estado y fecha */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{statusLabel[task.status]}</span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">

        <button
          onClick={() => onToggleComplete(task.id, {
            status: isCompleted ? 'PENDING' : 'COMPLETED'
          })}
          className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
            isCompleted
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          {isCompleted ? 'Reabrir' : '✓ Completar'}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="text-xs px-3 py-1.5 rounded-md font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-xs px-3 py-1.5 rounded-md font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors ml-auto"
        >
          Eliminar
        </button>

      </div>
    </div>
  )
}