interface Props {
  onCreateTask: () => void
}

export const TaskEmptyState = ({ onCreateTask }: Props) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        No tienes tareas todavía
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Crea tu primera tarea para empezar a organizarte
      </p>
      <button
        onClick={onCreateTask}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
      >
        Crear primera tarea
      </button>
    </div>
  )
}