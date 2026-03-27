import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'
import type { Task, TaskStatus, TaskRequest } from '../../types/task.types'

interface Props {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onUpdateTask: (id: number, data: Partial<TaskRequest>) => void
  onToggleStatus: (id: number, status: TaskStatus) => void
}

const STATUSES: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

export const KanbanBoard = ({ tasks, onEdit, onDelete, onUpdateTask, onToggleStatus }: Props) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Requiere mover 8px antes de iniciar el drag
      // Evita drags accidentales al hacer click
      activationConstraint: { distance: 8 },
    })
  )

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter(t => t.status === status)

  function handleDragStart({ active }: DragStartEvent) {
    const task = tasks.find(t => t.id.toString() === active.id)
    if (task) setActiveTask(task)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null)

    if (!over) return

    const taskId = parseInt(active.id as string)
    const newStatus = over.id as TaskStatus

    // Solo actualiza si cambió de columna
    const task = tasks.find(t => t.id === taskId)
    if (task && task.status !== newStatus && STATUSES.includes(newStatus)) {
      onUpdateTask(taskId, { status: newStatus })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasksByStatus(status)}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </div>

      {/* Card fantasma que sigue al cursor mientras arrastrás */}
      <DragOverlay>
        {activeTask && (
          <KanbanCard
            task={activeTask}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}