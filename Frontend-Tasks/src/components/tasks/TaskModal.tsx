import { TaskForm } from './TaskForm'
import type { Task, TaskRequest } from '../../types/task.types'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TaskRequest) => void
  isLoading?: boolean
  taskToEdit?: Task | null
}

export const TaskModal = ({ isOpen, onClose, onSubmit, isLoading, taskToEdit }: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenido del modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md z-10 
                      border border-gray-200 dark:border-slate-700">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 p-6 pb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {taskToEdit ? 'Editar tarea' : 'Nueva tarea'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-light
                       hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg p-1 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <TaskForm
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
            defaultValues={taskToEdit ?? undefined}
          />
        </div>

      </div>
    </div>
  )
}