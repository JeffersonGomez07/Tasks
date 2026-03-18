import axiosInstance from './axiosInstance'
import type { Task, TaskRequest, TaskFilters, TaskStatus } from '../types/task.types'

const MOCK = true // Cambiar a false cuando el backend esté listo

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Configurar proyecto',
    description: 'Setup inicial del frontend',
    status: 'COMPLETED',
    priority: 'HIGH',
    dueDate: '2026-03-20',
    createdAt: '2026-03-01',
  },
  {
    id: 2,
    title: 'Crear login',
    description: 'Página de autenticación',
    status: 'COMPLETED',
    priority: 'HIGH',
    dueDate: '2026-03-22',
    createdAt: '2026-03-02',
  },
  {
    id: 3,
    title: 'Implementar tareas',
    description: 'CRUD completo de tareas',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2026-03-25',
    createdAt: '2026-03-03',
  },
]

export const getTasks = async (filters?: TaskFilters): Promise<Task[]> => {
  if (MOCK) {
    let result = [...mockTasks]

    if (filters?.status) {
      result = result.filter(t => t.status === filters.status)
    }
    if (filters?.priority) {
      result = result.filter(t => t.priority === filters.priority)
    }
    if (filters?.search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(filters.search!.toLowerCase())
      )
    }

    return result
  }

  const response = await axiosInstance.get<Task[]>('/tasks', { params: filters })
  return response.data
}

export const createTask = async (task: TaskRequest): Promise<Task> => {
  if (MOCK) {
    const newTask: Task = {
      ...task,
      id: mockTasks.length + 1,
      createdAt: new Date().toISOString(),
    }
    mockTasks.push(newTask)
    return newTask
  }

  const response = await axiosInstance.post<Task>('/tasks', task)
  return response.data
}

export const updateTask = async (id: number, task: Partial<TaskRequest>): Promise<Task> => {
  if (MOCK) {
    const index = mockTasks.findIndex(t => t.id === id)
    mockTasks[index] = { ...mockTasks[index], ...task }
    return mockTasks[index]
  }

  const response = await axiosInstance.put<Task>(`/tasks/${id}`, task)
  return response.data
}

export const deleteTask = async (id: number): Promise<void> => {
  if (MOCK) {
    const index = mockTasks.findIndex(t => t.id === id)
    mockTasks.splice(index, 1)
    return
  }

  await axiosInstance.delete(`/tasks/${id}`)
}

export const updateTaskStatus = async (id: number, status: TaskStatus): Promise<Task> => {
  if (MOCK) {
    const index = mockTasks.findIndex(t => t.id === id)
    mockTasks[index] = { ...mockTasks[index], status }
    return mockTasks[index]
  }

  const response = await axiosInstance.patch<Task>(`/tasks/${id}/status`, { status })
  return response.data
}