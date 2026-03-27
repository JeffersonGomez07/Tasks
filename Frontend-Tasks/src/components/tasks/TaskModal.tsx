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
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md z-10 
                      border border-gray-100 overflow-hidden animate-in fade-in scale-95 duration-300">

        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-8">
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {taskToEdit ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              )}
            </svg>
            {taskToEdit ? 'Editar tarea' : 'Nueva tarea'}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl font-light
                       hover:bg-white/10 rounded-lg p-1.5 transition-all duration-200"
          >
            ×
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8">
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