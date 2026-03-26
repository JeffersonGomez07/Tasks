import { useRef } from 'react'
import type { TaskFilters as TaskFiltersType } from '../../hooks/useTaskFilters'
import type { TaskStatus, TaskPriority } from '../../types/task.types'

interface Props {
  filters: TaskFiltersType
  hasActiveFilters: boolean
  totalResults: number
  onFilterChange: <K extends keyof TaskFiltersType>(key: K, value: TaskFiltersType[K]) => void
  onClear: () => void
}

export const TaskFilters = ({
  filters,
  hasActiveFilters,
  totalResults,
  onFilterChange,
  onClear,
}: Props) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSearchChange(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onFilterChange('search', value)
    }, 300)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Búsqueda por texto */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar tareas..."
            defaultValue={filters.search}
            key={hasActiveFilters ? 'active' : 'clear'}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="input-base pl-9"
          />
        </div>

        {/* Filtro por estado */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value as TaskStatus | '')}
          className="select-base w-full sm:w-auto"
        >
          <option value="">Todos los estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="COMPLETED">Completada</option>
        </select>

        {/* Filtro por prioridad */}
        <select
          value={filters.priority}
          onChange={(e) => onFilterChange('priority', e.target.value as TaskPriority | '')}
          className="select-base w-full sm:w-auto"
        >
          <option value="">Todas las prioridades</option>
          <option value="HIGH">Alta</option>
          <option value="MEDIUM">Media</option>
          <option value="LOW">Baja</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="btn-secondary whitespace-nowrap"
          >
            Limpiar
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {totalResults === 0
              ? 'Sin resultados para los filtros aplicados'
              : `${totalResults} ${totalResults === 1 ? 'tarea encontrada' : 'tareas encontradas'}`}
          </span>
        </div>
      )}
    </div>
  )
}