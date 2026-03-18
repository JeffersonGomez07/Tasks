import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

  const inputClass = "border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass = "text-sm font-medium text-gray-700"
  const errorClass = "text-red-500 text-xs mt-1"

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as TaskRequest))} className="flex flex-col gap-4">

      {/* Título */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Título *</label>
        <input
          {...register('title')}
          type="text"
          placeholder="Nombre de la tarea"
          className={inputClass}
        />
        {errors.title && <span className={errorClass}>{errors.title.message as string}</span>}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Descripción</label>
        <textarea
          {...register('description')}
          placeholder="Descripción opcional"
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Prioridad y Estado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Prioridad</label>
          <select {...register('priority')} className={inputClass}>
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass}>Estado</label>
          <select {...register('status')} className={inputClass}>
            <option value="PENDING">Pendiente</option>
            <option value="IN_PROGRESS">En progreso</option>
            <option value="COMPLETED">Completada</option>
          </select>
        </div>
      </div>

      {/* Fecha límite */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Fecha límite *</label>
        <input
          {...register('dueDate')}
          type="date"
          className={inputClass}
        />
        {errors.dueDate && <span className={errorClass}>{errors.dueDate.message as string}</span>}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : 'Guardar tarea'}
        </button>
      </div>

    </form>
  )
}