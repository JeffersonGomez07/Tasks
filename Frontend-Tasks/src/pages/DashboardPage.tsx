import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { TaskCard } from '../components/tasks/TaskCard'
import { TaskSkeleton } from '../components/tasks/TaskSkeleton'
import { TaskEmptyState } from '../components/tasks/TaskEmptyState'
import { TaskStatsBar } from '../components/tasks/TaskStatsBar'
import { TaskModal } from '../components/tasks/TaskModal'
import { ConfirmDialog } from '../components/shared/ConfirmDialog'
import type { Task, TaskRequest } from '../types/task.types'


export const DashboardPage = () => {
const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, toggleStatus } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleOpenCreate = () => {
    setTaskToEdit(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit(task)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setTaskToEdit(null)
  }

  const handleSubmit = async (data: TaskRequest) => {
    if (taskToEdit) {
      await updateTask(taskToEdit.id, data)
    } else {
      await createTask(data)
    }
    handleClose()
  }

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task)
  }

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id)
      setTaskToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setTaskToDelete(null)
  }

  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mis tareas</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona y organiza tu trabajo</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          + Nueva tarea
        </button>
      </div>

      {/* Contadores */}
      {!loading && <TaskStatsBar tasks={tasks} />}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Grid de tareas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}

        {!loading && tasks.length === 0 && (
          <TaskEmptyState onCreateTask={handleOpenCreate} />
        )}

        {!loading && tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleOpenEdit}
            onDelete={() => handleDeleteClick(task)}
            onToggleComplete={updateTask}
            onToggleStatus={toggleStatus}
            />
        ))}
      </div>

      {/* Modal crear/editar */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        taskToEdit={taskToEdit}
      />

      {/* Dialog confirmar eliminación */}
      <ConfirmDialog
        isOpen={!!taskToDelete}
        title="Eliminar tarea"
        message={`¿Seguro que quieres eliminar "${taskToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}