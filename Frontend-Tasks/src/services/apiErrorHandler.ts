import axios from 'axios'
import { toast } from 'react-toastify'

const ERROR_MESSAGES: Record<number, string> = {
  400: 'La solicitud tiene datos incorrectos.',
  401: 'Tu sesión expiró. Iniciá sesión de nuevo.',
  403: 'No tenés permiso para realizar esta acción.',
  404: 'El recurso solicitado no existe.',
  409: 'Ya existe un registro con esos datos.',
  422: 'Los datos enviados no son válidos.',
  429: 'Demasiadas solicitudes. Esperá un momento.',
  500: 'Error interno del servidor. Intentá más tarde.',
  502: 'El servidor no está disponible.',
  503: 'Servicio temporalmente fuera de línea.',
}

const NETWORK_ERROR = 'Sin conexión. Verificá tu internet.'
const UNKNOWN_ERROR = 'Ocurrió un error inesperado.'

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return UNKNOWN_ERROR

  // Sin respuesta del servidor — problema de red o CORS
  if (!error.response) return NETWORK_ERROR

  const status = error.response.status

  // El backend puede mandar su propio mensaje — lo usamos si existe
  const serverMessage =
    error.response.data?.message ||
    error.response.data?.error

  if (serverMessage && typeof serverMessage === 'string') {
    return serverMessage
  }

  return ERROR_MESSAGES[status] ?? UNKNOWN_ERROR
}

export function handleApiError(error: unknown): void {
  const message = getApiErrorMessage(error)
  toast.error(message)
}