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
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Contenido del modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 z-10">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {taskToEdit ? 'Editar tarea' : 'Nueva tarea'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <TaskForm
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
          defaultValues={taskToEdit ?? undefined}
        />

      </div>
    </div>
  )
}