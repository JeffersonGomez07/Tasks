import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Spinner } from './shared/Spinner'
import type { LoginCredentials } from '../types/auth.types'

const loginSchema = z.object({
  email: z.string().pipe(z.email('Correo inválido')),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

interface Props {
  onSubmit: (data: LoginCredentials) => void
  isLoading: boolean
}

export const LoginForm = ({ onSubmit, isLoading }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900">
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
        <label className="block text-sm font-semibold text-gray-900">
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

      {/* Botón submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? (
          <>
            <Spinner size="sm" color="white" />
            Ingresando...
          </>
        ) : (
          'Ingresar'
        )}
      </button>
    </form>
  )
}