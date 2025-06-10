"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { BarChart3, PieChart, Calendar, Download, Filter, RefreshCw, ChevronDown } from "lucide-react"
import { useState } from "react"
import { obtenerColorCategoria, obtenerColorCriticidad } from "@/lib/utils"

export default function ReportesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <ReportesContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function ReportesContent() {
  const { actividades, cortes } = useAppStore()
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("mes")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas")

  // Filtrar actividades por categoría
  const actividadesFiltradas =
    categoriaSeleccionada === "todas"
      ? actividades
      : actividades.filter((act) => act.categoria === categoriaSeleccionada)

  // Calcular estadísticas
  const totalActividades = actividadesFiltradas.length
  const actividadesAlta = actividadesFiltradas.filter((a) => a.criticidad === "alta").length
  const actividadesMedia = actividadesFiltradas.filter((a) => a.criticidad === "media").length
  const actividadesBaja = actividadesFiltradas.filter((a) => a.criticidad === "baja").length

  // Calcular distribución por categoría
  const distribucionCategorias = {
    hogar: actividadesFiltradas.filter((a) => a.categoria === "hogar").length,
    salud: actividadesFiltradas.filter((a) => a.categoria === "salud").length,
    educacion: actividadesFiltradas.filter((a) => a.categoria === "educacion").length,
    trabajo: actividadesFiltradas.filter((a) => a.categoria === "trabajo").length,
    otro: actividadesFiltradas.filter((a) => a.categoria === "otro").length,
  }

  // Calcular horas afectadas por cortes
  const horasCortes = cortes.reduce((total, corte) => {
    const inicio = Number.parseInt(corte.horaInicio.split(":")[0])
    const fin = Number.parseInt(corte.horaFin.split(":")[0])
    return total + (fin - inicio)
  }, 0)

  // Calcular actividades afectadas por cortes
  const actividadesAfectadas = actividades.filter((actividad) => {
    return cortes.some((corte) => {
      if (corte.fecha !== actividad.fecha) return false

      const horaActividad = Number.parseInt(actividad.horaInicio.split(":")[0])
      const horaInicioCorte = Number.parseInt(corte.horaInicio.split(":")[0])
      const horaFinCorte = Number.parseInt(corte.horaFin.split(":")[0])

      return horaActividad >= horaInicioCorte && horaActividad < horaFinCorte
    })
  }).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="mr-2 text-emerald-600" size={24} />
            Reportes y Estadísticas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Análisis detallado de actividades y cortes eléctricos</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download size={16} />
            <span>Exportar</span>
          </button>
          <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <RefreshCw size={16} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={periodoSeleccionado}
              onChange={(e) => setPeriodoSeleccionado(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="semana">Última semana</option>
              <option value="mes">Último mes</option>
              <option value="trimestre">Último trimestre</option>
              <option value="año">Último año</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-gray-400" />
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="todas">Todas las categorías</option>
              <option value="hogar">Hogar</option>
              <option value="salud">Salud</option>
              <option value="educacion">Educación</option>
              <option value="trabajo">Trabajo</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Actividades" value={totalActividades} />
        <StatCard title="Actividades Alta Prioridad" value={actividadesAlta} />
        <StatCard title="Horas de Cortes" value={horasCortes} />
        <StatCard title="Actividades Afectadas" value={actividadesAfectadas} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de criticidad */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <PieChart className="mr-2 text-emerald-600" size={20} />
            Distribución por Criticidad
          </h2>
          <div className="flex justify-center">
            <div className="w-64 h-64 relative">
              {/* Gráfico circular simulado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Alta */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#ef4444"
                    strokeWidth="20"
                    strokeDasharray={`${(actividadesAlta / totalActividades) * 251.2} 251.2`}
                    transform="rotate(-90 50 50)"
                  />
                  {/* Media */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#eab308"
                    strokeWidth="20"
                    strokeDasharray={`${(actividadesMedia / totalActividades) * 251.2} 251.2`}
                    strokeDashoffset={`${-(actividadesAlta / totalActividades) * 251.2}`}
                    transform="rotate(-90 50 50)"
                  />
                  {/* Baja */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#22c55e"
                    strokeWidth="20"
                    strokeDasharray={`${(actividadesBaja / totalActividades) * 251.2} 251.2`}
                    strokeDashoffset={`${-((actividadesAlta + actividadesMedia) / totalActividades) * 251.2}`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalActividades}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Actividades</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Alta: {actividadesAlta}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Media: {actividadesMedia}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Baja: {actividadesBaja}</span>
            </div>
          </div>
        </div>

        {/* Gráfico de categorías */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="mr-2 text-emerald-600" size={20} />
            Distribución por Categoría
          </h2>
          <div className="space-y-4">
            <BarChartItem
              label="Hogar"
              value={distribucionCategorias.hogar}
              total={totalActividades}
              color="bg-emerald-500"
            />
            <BarChartItem
              label="Salud"
              value={distribucionCategorias.salud}
              total={totalActividades}
              color="bg-red-500"
            />
            <BarChartItem
              label="Educación"
              value={distribucionCategorias.educacion}
              total={totalActividades}
              color="bg-purple-500"
            />
            <BarChartItem
              label="Trabajo"
              value={distribucionCategorias.trabajo}
              total={totalActividades}
              color="bg-blue-500"
            />
            <BarChartItem
              label="Otro"
              value={distribucionCategorias.otro}
              total={totalActividades}
              color="bg-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Tabla de actividades */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resumen de Actividades</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Criticidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Duración
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {actividadesFiltradas.slice(0, 5).map((actividad) => (
                <tr key={actividad.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {actividad.titulo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorCategoria(actividad.categoria)}`}
                    >
                      {actividad.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${obtenerColorCriticidad(actividad.criticidad)}`}
                    >
                      {actividad.criticidad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(actividad.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {actividad.duracionMinutos} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {actividadesFiltradas.length > 5 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <button className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm font-medium flex items-center justify-center mx-auto">
              Ver todas las actividades
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Resumen de cortes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Impacto de Cortes Eléctricos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Distribución por Severidad</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Alta:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(cortes.filter((c) => c.severidad === "alta").length / cortes.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {cortes.filter((c) => c.severidad === "alta").length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Media:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${(cortes.filter((c) => c.severidad === "media").length / cortes.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {cortes.filter((c) => c.severidad === "media").length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Baja:</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(cortes.filter((c) => c.severidad === "baja").length / cortes.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {cortes.filter((c) => c.severidad === "baja").length}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Estadísticas de Impacto</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total de cortes:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{cortes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Horas totales sin electricidad:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{horasCortes} horas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Actividades afectadas:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{actividadesAfectadas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Porcentaje de actividades afectadas:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {totalActividades > 0 ? Math.round((actividadesAfectadas / totalActividades) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}

interface BarChartItemProps {
  label: string
  value: number
  total: number
  color: string
}

function BarChartItem({ label, value, total, color }: BarChartItemProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}
