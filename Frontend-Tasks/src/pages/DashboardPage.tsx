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
import { KanbanBoard } from '../components/tasks/KanbanBoard'
import type { Task, TaskRequest } from '../types/task.types'

export const DashboardPage = () => {
  const [view, setView] = useState<'grid' | 'kanban'>('grid')

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

  const viewToggle = (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white">
      <button
        onClick={() => setView('grid')}
        title="Vista grid"
        className={`p-1.5 rounded transition-colors ${
          view === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <button
        onClick={() => setView('kanban')}
        title="Vista Kanban"
        className={`p-1.5 rounded transition-colors ${
          view === 'kanban' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Mis tareas</h1>
            <p className="text-gray-600 mt-2 font-medium">
              {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'} en total
            </p>
          </div>
          <div className="flex items-center gap-3">
            {viewToggle}
            <button
              onClick={handleOpenCreate}
              className="btn-primary flex items-center gap-3 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva tarea
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && <TaskStatsBar tasks={tasks} />}

        {/* Error */}
        {error && (
          <div className="card border-l-4 border-red-500 bg-red-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-red-900">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtros — solo en vista grid */}
        {view === 'grid' && (
          <div className="card bg-white">
            <TaskFilters
              filters={filters}
              hasActiveFilters={hasActiveFilters}
              totalResults={filteredTasks.length}
              onFilterChange={updateFilter}
              onClear={clearFilters}
            />
          </div>
        )}

        {/* Contenido principal */}
        {view === 'grid' ? (
          <div className="space-y-4">

            {/* Sort bar */}
            {!loading && sortedTasks.length > 0 && (
              <div className="flex items-center gap-3 px-2 py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  Ordenar por: {
                    sort.field === 'dueDate'   ? 'Fecha vencimiento' :
                    sort.field === 'priority'  ? 'Prioridad' :
                    sort.field === 'status'    ? 'Estado' :
                                                 'Fecha de creación'
                  }
                </span>
                <div className="ml-auto">
                  <TaskSortSelect sort={sort} onChange={setSort} />
                </div>
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading && Array.from({ length: 3 }).map((_, i) => (
                <TaskSkeleton key={i} />
              ))}

              {!loading && sortedTasks.length === 0 && !hasActiveFilters && (
                <TaskEmptyState onCreateTask={handleOpenCreate} />
              )}

              {!loading && sortedTasks.length === 0 && hasActiveFilters && (
                <div className="col-span-full py-16 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-6">
                    <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Sin resultados</p>
                  <p className="text-gray-600 mb-6">No hay tareas que coincidan con los filtros aplicados</p>
                  <button onClick={clearFilters} className="btn-secondary px-6 py-2.5">
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
                />
              ))}
            </div>
          </div>
        ) : (
          <KanbanBoard
            tasks={sortedTasks}
            onEdit={handleOpenEdit}
            onDelete={(task) => setTaskToDelete(task)}
            onUpdateTask={updateTask}
            onToggleStatus={toggleStatus}
          />
        )}

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