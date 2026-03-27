import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Task, TaskStatus } from '../../types/task.types'
import { useSubtasks } from '../../hooks/useSubtasks'

interface Props {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onToggleStatus: (id: number, status: TaskStatus) => void
}



const PRIORITY_STYLES: Record<string, string> = {
  HIGH:   'bg-red-50 text-red-700',
  MEDIUM: 'bg-amber-50 text-amber-700',
  LOW:    'bg-green-50 text-green-700',
}

const PRIORITY_LABELS: Record<string, string> = {
  HIGH: 'Alta', MEDIUM: 'Media', LOW: 'Baja',
}

const PRIORITY_BORDER: Record<string, string> = {
  HIGH:   'border-l-red-500',
  MEDIUM: 'border-l-amber-500',
  LOW:    'border-l-green-500',
}

export const KanbanCard = ({ task, onEdit, onDelete, onToggleStatus }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id.toString() })

  const { subtasks, completedCount, progress } = useSubtasks(task.subtasks ?? [])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isCompleted = task.status === 'COMPLETED'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white rounded-xl border-l-4 border border-gray-200 p-4 space-y-3
        ${PRIORITY_BORDER[task.priority]}
        ${isDragging ? 'opacity-40 shadow-2xl scale-105 z-50' : 'hover:shadow-lg hover:-translate-y-0.5'}
        transition-all duration-200 cursor-default
      `}
    >
      {/* Drag handle + título */}
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 text-gray-400 hover:text-indigo-500 cursor-grab active:cursor-grabbing shrink-0 transition-colors"
          aria-label="Arrastrar tarea"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="9"  cy="5"  r="1.5" /><circle cx="15" cy="5"  r="1.5" />
            <circle cx="9"  cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
            <circle cx="9"  cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
          </svg>
        </button>
        <p className={`text-sm font-medium leading-snug flex-1 ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </p>
      </div>

      {/* Descripción */}
      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 pl-6">{task.description}</p>
      )}

      {subtasks.length > 0 && (
        <div className="pl-6 space-y-1">
            <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
                {completedCount}/{subtasks.length} subtareas
            </span>
            <span className="text-xs text-gray-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div
                className="h-1 rounded-full bg-indigo-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
            </div>
        </div>
        )}

      {/* Footer */}
      <div className="flex items-center justify-between pl-6 pt-1">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[task.priority]}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>

        <div className="flex items-center gap-1">
          {/* Toggle completar */}
          <button
            onClick={() => onToggleStatus(task.id, isCompleted ? 'PENDING' : 'COMPLETED')}
            title={isCompleted ? 'Reabrir' : 'Completar'}
            className="p-1 rounded text-gray-400 hover:text-green-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>

          {/* Editar */}
          <button
            onClick={() => onEdit(task)}
            title="Editar"
            className="p-1 rounded text-gray-400 hover:text-blue-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Eliminar */}
          <button
            onClick={() => onDelete(task)}
            title="Eliminar"
            className="p-1 rounded text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}