export const TaskSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 animate-pulse">

    {/* Header: badge prioridad + título */}
    <div className="flex items-start justify-between gap-2">
      <div className="space-y-2 flex-1">
        <div className="h-3 w-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
      <div className="h-6 w-6 bg-gray-200 rounded-full shrink-0" />
    </div>

    {/* Descripción */}
    <div className="space-y-1.5">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>

    {/* Footer: estado + fecha */}
    <div className="flex items-center justify-between pt-1">
      <div className="h-3 w-20 bg-gray-200 rounded-full" />
      <div className="h-3 w-24 bg-gray-200 rounded" />
    </div>

    {/* Botones */}
    <div className="flex gap-2 pt-1 border-t border-gray-100">
      <div className="h-7 w-20 bg-gray-200 rounded-lg" />
      <div className="h-7 w-14 bg-gray-200 rounded-lg" />
      <div className="h-7 w-16 bg-gray-200 rounded-lg ml-auto" />
    </div>

  </div>
)