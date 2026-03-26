interface Props {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Contenido */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm z-10
                      border border-gray-200 dark:border-slate-700 p-6">

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full">
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger"
          >
            Sí, eliminar
          </button>
        </div>

      </div>
    </div>
  )
}