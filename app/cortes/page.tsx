"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { Plus, Edit, Trash2, Zap, AlertTriangle } from "lucide-react"
import { formatearFecha, formatearHora } from "@/lib/utils"
import type { CorteElectrico } from "@/types"

export default function CortesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <CortesContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function CortesContent() {
  const { cortes, agregarCorte, actualizarCorte, eliminarCorte, usuarioActual } = useAppStore()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [corteEditando, setCorteEditando] = useState<CorteElectrico | null>(null)

  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este corte programado?")) {
      eliminarCorte(id)
    }
  }

  const handleEditar = (corte: CorteElectrico) => {
    setCorteEditando(corte)
    setMostrarFormulario(true)
  }

  const handleNuevoCorte = () => {
    setCorteEditando(null)
    setMostrarFormulario(true)
  }

  const obtenerColorSeveridad = (severidad: string) => {
    switch (severidad) {
      case "alta":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300"
      case "media":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300"
      case "baja":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Zap className="mr-2 text-red-600" size={24} />
            Cortes Eléctricos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Gestiona los cortes eléctricos programados</p>
        </div>
        {usuarioActual?.rol === "admin" && (
          <button
            onClick={handleNuevoCorte}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Nuevo Corte</span>
          </button>
        )}
      </div>

      {/* Alerta de próximos cortes */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-600 dark:text-yellow-400 mr-3" size={20} />
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Próximos cortes programados</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Revisa tu calendario para planificar tus actividades críticas
            </p>
          </div>
        </div>
      </div>

      {/* Lista de cortes */}
      <div className="grid gap-4">
        {cortes.map((corte) => (
          <div key={corte.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Corte Programado</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${obtenerColorSeveridad(corte.severidad)}`}
                  >
                    Severidad {corte.severidad}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatearFecha(corte.fecha)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hora de inicio</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatearHora(corte.horaInicio)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hora de fin</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatearHora(corte.horaFin)}</p>
                  </div>
                </div>

                {corte.descripcion && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Descripción</p>
                    <p className="text-gray-700 dark:text-gray-300">{corte.descripcion}</p>
                  </div>
                )}

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Creado el {new Date(corte.creadoEn).toLocaleDateString("es-ES")}
                </div>
              </div>

              {usuarioActual?.rol === "admin" && (
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEditar(corte)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleEliminar(corte.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {cortes.length === 0 && (
          <div className="text-center py-12">
            <Zap className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No hay cortes eléctricos programados.</p>
          </div>
        )}
      </div>

      {/* Modal de formulario */}
      {mostrarFormulario && (
        <FormularioCorte
          corte={corteEditando}
          onGuardar={(corte) => {
            if (corteEditando) {
              actualizarCorte(corteEditando.id, corte)
            } else {
              agregarCorte(corte)
            }
            setMostrarFormulario(false)
            setCorteEditando(null)
          }}
          onCancelar={() => {
            setMostrarFormulario(false)
            setCorteEditando(null)
          }}
        />
      )}
    </div>
  )
}

interface FormularioCorteProps {
  corte: CorteElectrico | null
  onGuardar: (corte: Omit<CorteElectrico, "id" | "creadoEn">) => void
  onCancelar: () => void
}

function FormularioCorte({ corte, onGuardar, onCancelar }: FormularioCorteProps) {
  const [formData, setFormData] = useState({
    fecha: corte?.fecha || new Date().toISOString().split("T")[0],
    horaInicio: corte?.horaInicio || "08:00",
    horaFin: corte?.horaFin || "12:00",
    descripcion: corte?.descripcion || "",
    severidad: corte?.severidad || ("media" as const),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGuardar(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {corte ? "Editar Corte" : "Nuevo Corte Eléctrico"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha *</label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hora de inicio *
                </label>
                <input
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hora de fin *</label>
                <input
                  type="time"
                  value={formData.horaFin}
                  onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Severidad *</label>
              <select
                value={formData.severidad}
                onChange={(e) => setFormData({ ...formData, severidad: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Describe el motivo del corte eléctrico..."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                {corte ? "Actualizar" : "Crear"} Corte
              </button>
              <button
                type="button"
                onClick={onCancelar}
                className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
