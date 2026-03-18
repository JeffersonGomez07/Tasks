import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { LoginCredentials } from '../types/auth.types'

// Define las reglas de validación
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
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label>Correo</label>
        <input
          {...register('email')}
          type="email"
          placeholder="tu@correo.com"
        />
        {errors.email && (
          <span>{errors.email.message}</span>
        )}
      </div>

      <div>
        <label>Contraseña</label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
        />
        {errors.password && (
          <span>{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Ingresando...' : 'Ingresar'}
      </button>

    </form>
  )
}