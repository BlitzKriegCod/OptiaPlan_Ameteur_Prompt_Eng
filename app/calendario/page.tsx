"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { formatearHora, obtenerColorCriticidad } from "@/lib/utils"

export default function CalendarioPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <CalendarioContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function CalendarioContent() {
  const { actividades, cortes } = useAppStore()
  const [fechaActual, setFechaActual] = useState(new Date())

  // Obtener días del mes
  const primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
  const ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0)
  const primerDiaSemana = primerDiaDelMes.getDay()
  const diasEnMes = ultimoDiaDelMes.getDate()

  // Crear array de días
  const dias = []

  // Días vacíos al inicio
  for (let i = 0; i < primerDiaSemana; i++) {
    dias.push(null)
  }

  // Días del mes
  for (let dia = 1; dia <= diasEnMes; dia++) {
    dias.push(dia)
  }

  const navegarMes = (direccion: "anterior" | "siguiente") => {
    const nuevaFecha = new Date(fechaActual)
    if (direccion === "anterior") {
      nuevaFecha.setMonth(nuevaFecha.getMonth() - 1)
    } else {
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 1)
    }
    setFechaActual(nuevaFecha)
  }

  const obtenerActividadesDia = (dia: number) => {
    const fechaDia = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
    return actividades.filter((actividad) => actividad.fecha === fechaDia)
  }

  const obtenerCortesDia = (dia: number) => {
    const fechaDia = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
    return cortes.filter((corte) => corte.fecha === fechaDia)
  }

  const nombreMes = fechaActual.toLocaleDateString("es-ES", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <CalendarIcon className="mr-2 text-emerald-600" size={24} />
            Calendario
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Vista mensual de actividades y cortes eléctricos</p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navegarMes("anterior")}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize min-w-[200px] text-center">
            {nombreMes}
          </h2>
          <button
            onClick={() => navegarMes("siguiente")}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendario */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Encabezados de días */}
        <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-700">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia) => (
            <div key={dia} className="p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              {dia}
            </div>
          ))}
        </div>

        {/* Días del calendario */}
        <div className="grid grid-cols-7">
          {dias.map((dia, index) => (
            <div key={index} className="min-h-[120px] border-r border-b border-gray-200 dark:border-gray-600 p-2">
              {dia && (
                <>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">{dia}</div>

                  {/* Actividades del día */}
                  <div className="space-y-1">
                    {obtenerActividadesDia(dia).map((actividad) => (
                      <div
                        key={actividad.id}
                        className={`text-xs p-1 rounded truncate ${obtenerColorCriticidad(actividad.criticidad)}`}
                        title={`${actividad.titulo} - ${formatearHora(actividad.horaInicio)}`}
                      >
                        {formatearHora(actividad.horaInicio)} {actividad.titulo}
                      </div>
                    ))}

                    {/* Cortes del día */}
                    {obtenerCortesDia(dia).map((corte) => (
                      <div
                        key={corte.id}
                        className="text-xs p-1 rounded truncate bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        title={`Corte: ${formatearHora(corte.horaInicio)} - ${formatearHora(corte.horaFin)}`}
                      >
                        ⚡ {formatearHora(corte.horaInicio)}-{formatearHora(corte.horaFin)}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Leyenda</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Alta prioridad</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Media prioridad</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Baja prioridad</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">⚡ Cortes eléctricos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
