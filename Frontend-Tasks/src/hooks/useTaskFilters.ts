import { useState, useMemo } from 'react'
import type { Task } from '../types/task.types'
import type { TaskStatus, TaskPriority } from '../types/task.types'

export interface TaskFilters {
  search: string
  status: TaskStatus | ''
  priority: TaskPriority | ''
}

const initialFilters: TaskFilters = {
  search: '',
  status: '',
  priority: '',
}

export function useTaskFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<TaskFilters>(initialFilters)

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        filters.search === '' ||
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.search.toLowerCase())

      const matchesStatus =
        filters.status === '' || task.status === filters.status

      const matchesPriority =
        filters.priority === '' || task.priority === filters.priority

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, filters])

  const hasActiveFilters =
    filters.search !== '' || filters.status !== '' || filters.priority !== ''

  function updateFilter<K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function clearFilters() {
    setFilters(initialFilters)
  }

  return {
    filters,
    filteredTasks,
    hasActiveFilters,
    updateFilter,
    clearFilters,
  }
}