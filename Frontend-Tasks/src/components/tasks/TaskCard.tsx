import type { Task, TaskRequest } from '../../types/task.types'
import { SubtaskList } from './SubtaskList'
import { useSubtasks } from '../../hooks/useSubtasks'

interface Props {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onToggleComplete: (id: number, task: Partial<TaskRequest>) => void
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

// ✅ Completo
export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }: Props) => {
  const isCompleted = task.status === 'COMPLETED'
  
  const {
  subtasks,
  addSubtask,
  toggleSubtask,
  deleteSubtask,
  completedCount,
  progress,
} = useSubtasks(task.subtasks ?? []) 

  // Colores para borde izquierdo según prioridad
  const borderColors = {
    HIGH: '#EF4444',
    MEDIUM: '#F59E0B',
    LOW: '#10B981',
  }

  return (
    <div className={`card overflow-hidden border-l-4 transition-all duration-300 ${
      isCompleted ? 'opacity-60' : 'hover:shadow-2xl hover:scale-105'
    }`}
    style={{ borderLeftColor: borderColors[task.priority] }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-bold transition-all ${
            isCompleted 
              ? 'line-through text-gray-400' 
              : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
        </div>
        <span className={priorityBadges[task.priority]}>
          {priorityLabel[task.priority]}
        </span>
      </div>

      {/* Descripción */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-3 mb-5 pb-5 border-b border-gray-200">
        <span className={statusBadges[task.status]}>
          {statusLabel[task.status]}
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1.5 ml-auto">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {task.dueDate && (
            <span className="text-xs text-gray-500 flex items-center gap-1.5 ml-auto">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(task.dueDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
            </span>
          )}        </span>
      </div>
      {/* Subtareas */}
          {subtasks.length > 0 && (
            <div className="border-t border-gray-100 pt-3 mt-2 space-y-2">

              {/* Barra de progreso — solo si hay subtareas */}
              {subtasks.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Subtareas</span>
                    <span className="text-xs font-medium text-gray-600">
                      {completedCount}/{subtasks.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-indigo-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <SubtaskList
                subtasks={subtasks}
                onToggle={toggleSubtask}
                onDelete={deleteSubtask}
                onAdd={addSubtask}
              />
            </div>
          )}

      {/* Acciones */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleComplete(task.id, {
            status: isCompleted ? 'PENDING' : 'COMPLETED'
          })}
          title={isCompleted ? 'Reabrir tarea' : 'Marcar como completada'}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-semibold text-xs transition-all duration-200 ${
            isCompleted
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isCompleted ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            )}
          </svg>
        </button>

        <button
          onClick={() => onEdit(task)}
          title="Editar tarea"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-semibold text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        <button
          onClick={() => onDelete(task.id)}
          title="Eliminar tarea"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-semibold text-xs bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}