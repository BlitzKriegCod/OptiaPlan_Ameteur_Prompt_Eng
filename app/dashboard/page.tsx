"use client"

import type React from "react"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { Activity, Zap, Clock, AlertTriangle, Calendar, TrendingUp } from "lucide-react"
import { formatearFecha, formatearHora, obtenerColorCriticidad } from "@/lib/utils"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <DashboardContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { actividades, cortes, usuarioActual } = useAppStore()

  // Estadísticas
  const actividadesHoy = actividades.filter((a) => a.fecha === new Date().toISOString().split("T")[0])
  const cortesHoy = cortes.filter((c) => c.fecha === new Date().toISOString().split("T")[0])
  const actividadesAlta = actividades.filter((a) => a.criticidad === "alta")
  const proximasActividades = actividades.slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">¡Bienvenido, {usuarioActual?.nombre}!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Aquí tienes un resumen de tus actividades y cortes programados
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Actividades Hoy" value={actividadesHoy.length} icon={Calendar} color="emerald" />
        <StatCard title="Cortes Hoy" value={cortesHoy.length} icon={Zap} color="red" />
        <StatCard title="Alta Prioridad" value={actividadesAlta.length} icon={AlertTriangle} color="yellow" />
        <StatCard title="Total Actividades" value={actividades.length} icon={Activity} color="blue" />
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas actividades */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="mr-2 text-emerald-600" size={20} />
            Próximas Actividades
          </h2>
          <div className="space-y-3">
            {proximasActividades.map((actividad) => (
              <div key={actividad.id} className="border-l-4 border-emerald-500 pl-4 py-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{actividad.titulo}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatearFecha(actividad.fecha)} a las {formatearHora(actividad.horaInicio)}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${obtenerColorCriticidad(actividad.criticidad)}`}
                >
                  {actividad.criticidad}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cortes programados */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Zap className="mr-2 text-red-600" size={20} />
            Cortes Programados
          </h2>
          <div className="space-y-3">
            {cortes.slice(0, 3).map((corte) => (
              <div key={corte.id} className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{formatearFecha(corte.fecha)}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatearHora(corte.horaInicio)} - {formatearHora(corte.horaFin)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{corte.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gráfico de tendencias (mock) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="mr-2 text-blue-600" size={20} />
          Tendencias de la Semana
        </h2>
        <div className="h-64 flex items-end justify-between space-x-2">
          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((dia, index) => (
            <div key={dia} className="flex flex-col items-center">
              <div className="bg-emerald-500 rounded-t w-8" style={{ height: `${Math.random() * 150 + 50}px` }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{dia}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: "emerald" | "red" | "yellow" | "blue"
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
    yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
