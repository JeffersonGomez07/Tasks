import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useTaskFilters } from '../hooks/useTaskFilters'
import { useTaskSort } from '../hooks/useTaskSort'
import { TaskCard } from '../components/tasks/TaskCard'
import { TaskSkeleton } from '../components/tasks/TaskSkeleton'
import { TaskEmptyState } from '../components/tasks/TaskEmptyState'
import { TaskStatsBar } from '../components/tasks/TaskStatsBar'
import { TaskModal } from '../components/tasks/TaskModal'
import { TaskFilters } from '../components/tasks/TaskFilters'
import { TaskSortSelect } from '../components/tasks/TaskSortSelect'
import { ConfirmDialog } from '../components/shared/ConfirmDialog'
import type { Task, TaskRequest } from '../types/task.types'

export const DashboardPage = () => {
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, toggleStatus } = useTasks()

  const { filters, filteredTasks, hasActiveFilters, updateFilter, clearFilters } = useTaskFilters(tasks)
  const { sort, setSort, sortedTasks } = useTaskSort(filteredTasks)

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

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id)
      setTaskToDelete(null)
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-8" style={{ backgroundColor: '#f6eddc' }}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Mis tareas
            </h1>
            <p className="text-sm mt-1">
              {tasks.length} tareas en total
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva tarea
          </button>
        </div>

        {/* Stats Bar */}
        {!loading && <TaskStatsBar tasks={tasks} />}

        {/* Error Message */}
        {error && (
          <div className="card border-l-4" style={{ borderLeftColor: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.1)' }}>
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold" style={{ color: '#e74c3c' }}>Error</p>
                <p className="text-sm" style={{ color: '#e74c3c' }}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="card">
          <TaskFilters
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            totalResults={filteredTasks.length}
            onFilterChange={updateFilter}
            onClear={clearFilters}
          />
        </div>

        {/* Tasks Grid */}
        <div>
          {!loading && sortedTasks.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#a5c8ca' }}>
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">
                Ordenar por: {sort.field === 'dueDate' ? 'Fecha vencimiento' : sort.field === 'priority' ? 'Prioridad' : 'Nombre'}
              </span>
              <div className="ml-auto">
                <TaskSortSelect sort={sort} onChange={setSort} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading && Array.from({ length: 3 }).map((_, i) => (
              <TaskSkeleton key={i} />
            ))}

            {!loading && sortedTasks.length === 0 && !hasActiveFilters && (
              <TaskEmptyState onCreateTask={handleOpenCreate} />
            )}

            {!loading && sortedTasks.length === 0 && hasActiveFilters && (
              <div className="col-span-full py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'rgba(189, 214, 210, 0.3)' }}>
                  <span className="text-3xl">🔍</span>
                </div>
                <p className="font-medium">
                  No hay tareas que coincidan con los filtros
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-sm font-medium hover:underline"
                  style={{ color: '#a5c8ca' }}
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {!loading && sortedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={() => setTaskToDelete(task)}
                onToggleComplete={updateTask}
                onToggleStatus={toggleStatus}
              />
            ))}
          </div>
        </div>
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
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  )
}