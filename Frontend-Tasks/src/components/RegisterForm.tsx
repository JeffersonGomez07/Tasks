import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Spinner } from './shared/Spinner'
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Correo Electrónico
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="correo@ejemplo.com"
          className="input-base"
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Contraseña
        </label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className="input-base"
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      {/* Confirmar contraseña */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          Confirmar Contraseña
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          className="input-base"
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Botón submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? (
          <>
            <Spinner size="sm" color="white" />
            Creando cuenta...
          </>
        ) : (
          'Crear cuenta'
        )}
      </button>
    </form>
  )
}