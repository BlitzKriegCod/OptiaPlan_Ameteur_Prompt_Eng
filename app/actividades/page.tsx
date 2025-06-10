"use client"

import type React from "react"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react"
import { formatearFecha, formatearHora, obtenerColorCriticidad, obtenerColorCategoria } from "@/lib/utils"
import type { ActividadCritica } from "@/types"

export default function ActividadesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <ActividadesContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function ActividadesContent() {
  const { actividades, agregarActividad, actualizarActividad, eliminarActividad, usuarioActual } = useAppStore()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [actividadEditando, setActividadEditando] = useState<ActividadCritica | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas")
  const [busqueda, setBusqueda] = useState("")

  // Filtrar actividades
  const actividadesFiltradas = actividades.filter((actividad) => {
    const coincideBusqueda =
      actividad.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      actividad.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = filtroCategoria === "todas" || actividad.categoria === filtroCategoria
    return coincideBusqueda && coincideCategoria
  })

  const handleEliminar = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta actividad?")) {
      eliminarActividad(id)
    }
  }

  const handleEditar = (actividad: ActividadCritica) => {
    setActividadEditando(actividad)
    setMostrarFormulario(true)
  }

  const handleNuevaActividad = () => {
    setActividadEditando(null)
    setMostrarFormulario(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Actividades</h1>
          <p className="text-gray-600 dark:text-gray-400">Gestiona tus actividades críticas</p>
        </div>
        <button
          onClick={handleNuevaActividad}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Nueva Actividad</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar actividades..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
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

      {/* Lista de actividades */}
      <div className="grid gap-4">
        {actividadesFiltradas.map((actividad) => (
          <div key={actividad.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{actividad.titulo}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorCategoria(actividad.categoria)}`}
                  >
                    {actividad.categoria}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${obtenerColorCriticidad(actividad.criticidad)}`}
                  >
                    {actividad.criticidad}
                  </span>
                </div>
                {actividad.descripcion && (
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{actividad.descripcion}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>📅 {formatearFecha(actividad.fecha)}</span>
                  <span>🕐 {formatearHora(actividad.horaInicio)}</span>
                  <span>⏱️ {actividad.duracionMinutos} min</span>
                  {actividad.lugar && <span>📍 {actividad.lugar}</span>}
                </div>
                {actividad.etiquetas && actividad.etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {actividad.etiquetas.map((etiqueta, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        #{etiqueta}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEditar(actividad)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleEliminar(actividad.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {actividadesFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No se encontraron actividades que coincidan con los filtros.
            </p>
          </div>
        )}
      </div>

      {/* Modal de formulario */}
      {mostrarFormulario && (
        <FormularioActividad
          actividad={actividadEditando}
          onGuardar={(actividad) => {
            if (actividadEditando) {
              actualizarActividad(actividadEditando.id, actividad)
            } else {
              agregarActividad({
                ...actividad,
                usuarioId: usuarioActual?.id || "1",
              })
            }
            setMostrarFormulario(false)
            setActividadEditando(null)
          }}
          onCancelar={() => {
            setMostrarFormulario(false)
            setActividadEditando(null)
          }}
        />
      )}
    </div>
  )
}

interface FormularioActividadProps {
  actividad: ActividadCritica | null
  onGuardar: (actividad: Omit<ActividadCritica, "id" | "usuarioId" | "creadoEn">) => void
  onCancelar: () => void
}

function FormularioActividad({ actividad, onGuardar, onCancelar }: FormularioActividadProps) {
  const [formData, setFormData] = useState({
    titulo: actividad?.titulo || "",
    descripcion: actividad?.descripcion || "",
    fecha: actividad?.fecha || new Date().toISOString().split("T")[0],
    horaInicio: actividad?.horaInicio || "09:00",
    duracionMinutos: actividad?.duracionMinutos || 60,
    categoria: actividad?.categoria || ("otro" as const),
    criticidad: actividad?.criticidad || ("media" as const),
    lugar: actividad?.lugar || "",
    etiquetas: actividad?.etiquetas?.join(", ") || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGuardar({
      ...formData,
      etiquetas: formData.etiquetas
        ? formData.etiquetas
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : undefined,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {actividad ? "Editar Actividad" : "Nueva Actividad"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título *</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha *</label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hora *</label>
                <input
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duración (minutos) *
              </label>
              <input
                type="number"
                value={formData.duracionMinutos}
                onChange={(e) => setFormData({ ...formData, duracionMinutos: Number.parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                min="1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría *</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="hogar">Hogar</option>
                  <option value="salud">Salud</option>
                  <option value="educacion">Educación</option>
                  <option value="trabajo">Trabajo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Criticidad *</label>
                <select
                  value={formData.criticidad}
                  onChange={(e) => setFormData({ ...formData, criticidad: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lugar</label>
              <input
                type="text"
                value={formData.lugar}
                onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                placeholder="Ej: Hospital, Oficina, Casa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Etiquetas</label>
              <input
                type="text"
                value={formData.etiquetas}
                onChange={(e) => setFormData({ ...formData, etiquetas: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                placeholder="Separadas por comas: urgente, médico, importante"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                {actividad ? "Actualizar" : "Crear"} Actividad
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
