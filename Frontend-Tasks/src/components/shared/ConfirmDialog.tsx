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
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm z-10
                      border border-gray-100 overflow-hidden">

        {/* Header con gradiente rojo */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-white">{title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 mb-8 leading-relaxed text-base font-medium">{message}</p>

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
    </div>
  )
}