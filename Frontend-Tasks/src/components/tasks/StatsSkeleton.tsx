export const StatsSkeleton = () => (
  <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-8 animate-pulse">

    {/* Header */}
    <div className="space-y-2">
      <div className="h-7 w-40 bg-gray-200 rounded" />
      <div className="h-4 w-56 bg-gray-200 rounded" />
    </div>

    {/* Barra de progreso */}
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <div className="flex justify-between">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded" />
      </div>
      <div className="h-3 bg-gray-200 rounded-full w-full" />
      <div className="h-3 w-44 bg-gray-200 rounded" />
    </div>

    {/* Grid de cards — por estado */}
    <div className="space-y-3">
      <div className="h-4 w-20 bg-gray-200 rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-5 space-y-2">
            <div className="h-8 w-10 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>

    {/* Grid de cards — por prioridad */}
    <div className="space-y-3">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-5 space-y-2">
            <div className="h-8 w-10 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>

  </div>
)