"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { Clock, Lightbulb, CheckCircle, AlertCircle } from "lucide-react"
import { formatearFecha, formatearHora } from "@/lib/utils"

export default function SugerenciasPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <SugerenciasContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function SugerenciasContent() {
  const { actividades, cortes } = useAppStore()

  // Generar sugerencias inteligentes
  const generarSugerencias = () => {
    const sugerencias = []

    // Verificar conflictos entre actividades y cortes
    actividades.forEach((actividad) => {
      const cortesDelDia = cortes.filter((corte) => corte.fecha === actividad.fecha)

      cortesDelDia.forEach((corte) => {
        const horaActividad = Number.parseInt(actividad.horaInicio.split(":")[0])
        const horaInicioCorte = Number.parseInt(corte.horaInicio.split(":")[0])
        const horaFinCorte = Number.parseInt(corte.horaFin.split(":")[0])

        // Si la actividad está durante el corte
        if (horaActividad >= horaInicioCorte && horaActividad < horaFinCorte) {
          const nuevaHora = horaFinCorte + 1
          sugerencias.push({
            id: `${actividad.id}-${corte.id}`,
            tipo: "conflicto",
            actividad,
            corte,
            sugerencia: `Mover "${actividad.titulo}" a las ${nuevaHora}:00`,
            riesgo: actividad.criticidad === "alta" ? "alto" : actividad.criticidad === "media" ? "moderado" : "bajo",
            razon: `Hay un corte eléctrico programado de ${formatearHora(corte.horaInicio)} a ${formatearHora(corte.horaFin)}`,
          })
        }
      })
    })

    // Sugerencias de optimización
    const actividadesAlta = actividades.filter((a) => a.criticidad === "alta")
    if (actividadesAlta.length > 0) {
      sugerencias.push({
        id: "optimizacion-1",
        tipo: "optimizacion",
        sugerencia: "Considera agrupar actividades de alta prioridad en horarios sin cortes",
        riesgo: "bajo",
        razon: `Tienes ${actividadesAlta.length} actividades de alta prioridad que podrían beneficiarse de una mejor planificación`,
      })
    }

    return sugerencias
  }

  const sugerencias = generarSugerencias()

  const obtenerIconoRiesgo = (riesgo: string) => {
    switch (riesgo) {
      case "alto":
        return <AlertCircle className="text-red-500" size={20} />
      case "moderado":
        return <Clock className="text-yellow-500" size={20} />
      case "bajo":
        return <CheckCircle className="text-green-500" size={20} />
      default:
        return <Lightbulb className="text-blue-500" size={20} />
    }
  }

  const obtenerColorRiesgo = (riesgo: string) => {
    switch (riesgo) {
      case "alto":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
      case "moderado":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
      case "bajo":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      default:
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Lightbulb className="mr-2 text-emerald-600" size={24} />
          Sugerencias Inteligentes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Optimiza tu planificación con recomendaciones personalizadas</p>
      </div>

      {/* Estadísticas de sugerencias */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sugerencias</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sugerencias.length}</p>
            </div>
            <Lightbulb className="text-emerald-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conflictos Detectados</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sugerencias.filter((s) => s.tipo === "conflicto").length}
              </p>
            </div>
            <AlertCircle className="text-red-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Optimizaciones</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sugerencias.filter((s) => s.tipo === "optimizacion").length}
              </p>
            </div>
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      {/* Lista de sugerencias */}
      <div className="space-y-4">
        {sugerencias.map((sugerencia) => (
          <div
            key={sugerencia.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 ${obtenerColorRiesgo(sugerencia.riesgo)}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">{obtenerIconoRiesgo(sugerencia.riesgo)}</div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{sugerencia.sugerencia}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      sugerencia.riesgo === "alto"
                        ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        : sugerencia.riesgo === "moderado"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    Riesgo {sugerencia.riesgo}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-3">{sugerencia.razon}</p>

                {sugerencia.actividad && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Actividad afectada:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sugerencia.actividad.titulo} - {formatearFecha(sugerencia.actividad.fecha)} a las{" "}
                      {formatearHora(sugerencia.actividad.horaInicio)}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Aplicar Sugerencia
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                    Descartar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sugerencias.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">¡Excelente planificación!</h3>
            <p className="text-gray-500 dark:text-gray-400">
              No hay conflictos detectados entre tus actividades y los cortes eléctricos programados.
            </p>
          </div>
        )}
      </div>

      {/* Consejos adicionales */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-3 flex items-center">
          <Lightbulb className="mr-2" size={20} />
          Consejos para una mejor planificación
        </h3>
        <ul className="space-y-2 text-emerald-700 dark:text-emerald-300">
          <li>• Programa actividades críticas en horarios sin cortes eléctricos</li>
          <li>• Mantén dispositivos cargados antes de cortes programados</li>
          <li>• Agrupa actividades similares para optimizar el tiempo</li>
          <li>• Revisa regularmente las predicciones de cortes</li>
          <li>• Ten planes alternativos para actividades importantes</li>
        </ul>
      </div>
    </div>
  )
}
