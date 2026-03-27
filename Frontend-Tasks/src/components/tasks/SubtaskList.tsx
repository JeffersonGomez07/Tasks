import { useRef, useState } from 'react'
import type { Subtask } from '../../types/task.types'

interface Props {
  subtasks: Subtask[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onAdd: (title: string) => void
}

export const SubtaskList = ({ subtasks, onToggle, onDelete, onAdd }: Props) => {
  const [isAdding, setIsAdding] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleAdd() {
    if (inputValue.trim()) {
      onAdd(inputValue.trim())
      setInputValue('')
    }
    setIsAdding(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') {
      setInputValue('')
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-1.5">

      {/* Lista de subtareas */}
      {subtasks.map(subtask => (
        <div
          key={subtask.id}
          className="group flex items-center gap-2 py-1"
        >
          {/* Checkbox */}
          <button
            onClick={() => onToggle(subtask.id)}
            className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center
              transition-colors duration-150
              ${subtask.completed
                ? 'bg-indigo-600 border-indigo-600'
                : 'border-gray-300 hover:border-indigo-400'
              }`}
          >
            {subtask.completed && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Título */}
          <span className={`text-xs flex-1 leading-snug
            ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {subtask.title}
          </span>

          {/* Eliminar — solo visible en hover */}
          <button
            onClick={() => onDelete(subtask.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity
                       text-gray-300 hover:text-red-400 shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      {/* Input para nueva subtarea */}
      {isAdding ? (
        <div className="flex items-center gap-2 pt-1">
          <div className="w-4 h-4 rounded border-2 border-gray-200 shrink-0" />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleAdd}
            placeholder="Nueva subtarea..."
            className="flex-1 text-xs border-b border-indigo-300 focus:outline-none
                       focus:border-indigo-500 py-0.5 bg-transparent text-gray-700
                       placeholder-gray-400"
          />
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 text-xs text-gray-400
                     hover:text-indigo-500 transition-colors pt-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar subtarea
        </button>
      )}
    </div>
  )
}