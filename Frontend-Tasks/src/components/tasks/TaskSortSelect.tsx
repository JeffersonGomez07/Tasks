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
    <div className="flex items-center gap-2">
      <select
        value={sort.field}
        onChange={(e) => handleFieldChange(e.target.value as SortField)}
        className="select-base max-w-xs text-sm"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Botón asc/desc */}
      <button
        onClick={toggleDirection}
        title={sort.direction === 'asc' ? 'Ascendente' : 'Descendente'}
        className="btn-secondary p-2.5"
      >
        {sort.direction === 'asc' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
        )}
      </button>
    </div>
  )
}