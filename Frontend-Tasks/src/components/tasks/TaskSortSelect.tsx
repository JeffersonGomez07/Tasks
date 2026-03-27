import type { TaskSort, SortField, SortDirection } from '../../hooks/useTaskSort'

interface Props {
  sort: TaskSort
  onChange: (sort: TaskSort) => void
}

const options: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: 'Fecha de creación' },
  { value: 'dueDate',   label: 'Fecha límite' },
  { value: 'priority',  label: 'Prioridad' },
  { value: 'status',    label: 'Estado' },
]

export const TaskSortSelect = ({ sort, onChange }: Props) => {
  function handleFieldChange(field: SortField) {
    onChange({ ...sort, field })
  }

  function toggleDirection() {
    const next: SortDirection = sort.direction === 'asc' ? 'desc' : 'asc'
    onChange({ ...sort, direction: next })
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <select
          value={sort.field}
          onChange={(e) => handleFieldChange(e.target.value as SortField)}
          className="select-base max-w-xs text-sm font-semibold"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Botón asc/desc con efecto */}
      <button
        onClick={toggleDirection}
        title={sort.direction === 'asc' ? 'Ascendente' : 'Descendente'}
        className="inline-flex items-center justify-center p-2.5 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all duration-200 font-semibold"
      >
        {sort.direction === 'asc' ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7l-4 4m0 0l-4-4m4 4V3" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 19l-4-4m0 0l-4 4m4-4v8" />
          </svg>
        )}
      </button>
    </div>
  )
}