import { useState, useCallback } from 'react'
import type { Subtask } from '../types/task.types'

export function useSubtasks(initial: Subtask[] = []) {
  const [subtasks, setSubtasks] = useState<Subtask[]>(initial)

  const addSubtask = useCallback((title: string) => {
    if (!title.trim()) return
    setSubtasks(prev => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        completed: false,
      }
    ])
  }, [])

  const toggleSubtask = useCallback((id: number) => {
    setSubtasks(prev =>
      prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s)
    )
  }, [])

  const deleteSubtask = useCallback((id: number) => {
    setSubtasks(prev => prev.filter(s => s.id !== id))
  }, [])

  const completedCount = subtasks.filter(s => s.completed).length
  const progress = subtasks.length > 0
    ? Math.round((completedCount / subtasks.length) * 100)
    : 0

  return {
    subtasks,
    setSubtasks,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    completedCount,
    progress,
  }
}