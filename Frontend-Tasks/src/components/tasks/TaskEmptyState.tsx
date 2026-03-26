interface Props {
  onCreateTask: () => void
}

export const TaskEmptyState = ({ onCreateTask }: Props) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        No tienes tareas todavía
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
        Crea tu primera tarea para empezar a organizarte y gestionar tu trabajo de manera eficiente
      </p>
      <button
        onClick={onCreateTask}
        className="btn-primary"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Crear primera tarea
      </button>
    </div>
  )
}