import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Spinner } from '../shared/Spinner'
import type { TaskRequest } from '../../types/task.types'

const taskSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']),
  dueDate: z.string().min(1, 'La fecha es obligatoria'),
})

interface Props {
  onSubmit: (data: TaskRequest) => void
  onCancel: () => void
  isLoading?: boolean
  defaultValues?: Partial<TaskRequest>
}

export const TaskForm = ({ onSubmit, onCancel, isLoading, defaultValues }: Props) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM' as const,
      status: 'PENDING' as const,
      dueDate: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as TaskRequest))} className="space-y-5">
      {/* Título */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Título *
        </label>
        <input
          {...register('title')}
          type="text"
          placeholder="Nombre de la tarea"
          className="input-base"
        />
        {errors.title && <p className="error-message">{errors.title.message as string}</p>}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Descripción
        </label>
        <textarea
          {...register('description')}
          placeholder="Descripción de la tarea (opcional)"
          rows={3}
          className="textarea-base"
        />
      </div>

      {/* Prioridad y Estado */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Prioridad
          </label>
          <select {...register('priority')} className="select-base">
            <option value="LOW">🟢 Baja</option>
            <option value="MEDIUM">🟡 Media</option>
            <option value="HIGH">🔴 Alta</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Estado
          </label>
          <select {...register('status')} className="select-base">
            <option value="PENDING">Pendiente</option>
            <option value="IN_PROGRESS">En progreso</option>
            <option value="COMPLETED">Completada</option>
          </select>
        </div>
      </div>

      {/* Fecha límite */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Fecha límite *
        </label>
        <input
          {...register('dueDate')}
          type="date"
          className="input-base"
        />
        {errors.dueDate && <p className="error-message">{errors.dueDate.message as string}</p>}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-200 dark:border-slate-700">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <>
              <Spinner size="sm" color="white" />
              Guardando...
            </>
          ) : (
            'Guardar tarea'
          )}
        </button>
      </div>
    </form>
  )
}