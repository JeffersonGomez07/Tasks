interface Props {
  onCreateTask: () => void
}

export const TaskEmptyState = ({ onCreateTask }: Props) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl mb-8 shadow-lg">
        <svg className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
        Sin tareas todavía
      </h3>
      <p className="text-gray-600 mb-8 max-w-sm leading-relaxed font-medium">
        Crea tu primera tarea para empezar a organizar tu trabajo de manera eficiente
      </p>
      <button
        onClick={onCreateTask}
        className="btn-primary flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Crear primera tarea
      </button>
    </div>
  )
}