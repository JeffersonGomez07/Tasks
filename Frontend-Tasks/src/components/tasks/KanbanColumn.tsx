import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { KanbanCard } from './KanbanCard'
import type { Task } from '../../types/task.types'
import type { TaskStatus } from '../../types/task.types'

interface Props {
  status: TaskStatus
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onToggleStatus: (id: number, status: TaskStatus) => void
}

const COLUMN_CONFIG: Record<TaskStatus, { label: string; color: string; bg: string; dot: string }> = {
  PENDING:     { label: 'Pendiente',    color: 'text-amber-700',   bg: 'bg-amber-50',   dot: 'bg-amber-500' },
  IN_PROGRESS: { label: 'En progreso',  color: 'text-indigo-700',  bg: 'bg-indigo-50',  dot: 'bg-indigo-500' },
  COMPLETED:   { label: 'Completada',   color: 'text-green-700',   bg: 'bg-green-50',   dot: 'bg-green-500'  },
}

export const KanbanColumn = ({ status, tasks, onEdit, onDelete, onToggleStatus }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const config = COLUMN_CONFIG[status]

  return (
    <div className="flex flex-col gap-3 min-w-0">

      {/* Header de columna */}
      <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${config.bg} border border-gray-200`}>
        <span className={`w-3 h-3 rounded-full shrink-0 ${config.dot}`} />
        <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
        <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full bg-white ${config.color} border border-gray-200`}>
          {tasks.length}
        </span>
      </div>

      {/* Zona droppable */}
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-3 min-h-[250px] rounded-xl p-3 transition-all duration-200
          ${isOver ? 'bg-indigo-50 ring-2 ring-indigo-300 ring-dashed shadow-lg' : 'bg-gray-50 border border-gray-200'}`}
      >
        <SortableContext
          items={tasks.map(t => t.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <KanbanCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && !isOver && (
          <p className="text-xs text-gray-400 text-center mt-4 select-none">
            Sin tareas
          </p>
        )}
      </div>
    </div>
  )
}