import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import * as taskService from '../services/taskService'
import type { Task, TaskRequest, TaskFilters, TaskStatus } from '../types/task.types'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async (filters?: TaskFilters) => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.getTasks(filters)
      setTasks(data)
    } catch {
      setError('Error al cargar las tareas')
    } finally {
      setLoading(false)
    }
  }, [])

  const createTask = useCallback(async (task: TaskRequest) => {
    try {
      setError(null)
      const newTask = await taskService.createTask(task)
      setTasks(prev => [...prev, newTask])
      toast.success('Tarea creada correctamente')
    } catch {
      setError('Error al crear la tarea')
      toast.error('Error al crear la tarea')
    }
  }, [])

  const updateTask = useCallback(async (id: number, task: Partial<TaskRequest>) => {
    try {
      setError(null)
      const updated = await taskService.updateTask(id, task)
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
      toast.success('Tarea actualizada correctamente')
    } catch {
      setError('Error al actualizar la tarea')
      toast.error('Error al actualizar la tarea')
    }
  }, [])

  const deleteTask = useCallback(async (id: number) => {
    try {
      setError(null)
      await taskService.deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
      toast.success('Tarea eliminada correctamente')
    } catch {
      setError('Error al eliminar la tarea')
      toast.error('Error al eliminar la tarea')
    }
  }, [])

  const toggleStatus = useCallback(async (id: number, newStatus: TaskStatus) => {
  // Guarda el estado anterior para rollback
  const previousTasks = tasks

  // Optimistic update — actualiza la UI inmediatamente
  setTasks(prev => prev.map(t =>
    t.id === id ? { ...t, status: newStatus } : t
  ))

  try {
    await taskService.updateTaskStatus(id, newStatus)
    toast.success('Estado actualizado')
  } catch {
    // Rollback — revierte al estado anterior si falla
    setTasks(previousTasks)
    toast.error('Error al actualizar el estado')
  }
}, [tasks])

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
  }
}