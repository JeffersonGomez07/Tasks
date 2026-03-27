export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
  subtasks?: Subtask[]
}

export interface TaskRequest {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

export interface TaskFilters {
  status?: TaskStatus
  priority?: TaskPriority
  search?: string
}

export interface Subtask {
  id: number
  title: string
  completed: boolean
}
