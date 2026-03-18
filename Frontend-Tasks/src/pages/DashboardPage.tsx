import { useAuth } from '../hooks/useAuth'

export const DashboardPage = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
        <p className="text-gray-600">Bienvenido, {user?.email}</p>
      </div>
    </div>
  )
}