import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { RegisterCredentials } from '../types/auth.types'

const registerSchema = z.object({
  email: z.string().pipe(z.email('Correo inválido')),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

interface Props {
  onSubmit: (data: RegisterCredentials) => void
  isLoading: boolean
}

export const RegisterForm = ({ onSubmit, isLoading }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Correo</label>
        <input
          {...register('email')}
          type="email"
          placeholder="tu@correo.com"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Contraseña</label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

    </form>
  )
}