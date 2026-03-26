import { useState, useMemo } from 'react'
import type { Task } from '../types/task.types'

export type SortField = 'dueDate' | 'priority' | 'status' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

export interface TaskSort {
  field: SortField
  direction: SortDirection
}

const PRIORITY_WEIGHT: Record<string, number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
}

const STATUS_WEIGHT: Record<string, number> = {
  PENDING: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
}

const initialSort: TaskSort = {
  field: 'createdAt',
  direction: 'desc',
}

export function useTaskSort(tasks: Task[]) {
  const [sort, setSort] = useState<TaskSort>(initialSort)

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let result = 0

      switch (sort.field) {
        case 'dueDate': {
          const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
          const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
          result = aTime - bTime
          break
        }
        case 'priority':
          result = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]
          break
        case 'status':
          result = STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status]
          break
        case 'createdAt':
          result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }

      return sort.direction === 'asc' ? result : -result
    })
  }, [tasks, sort])

  return { sort, setSort, sortedTasks }
}