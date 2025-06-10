"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { useAppStore } from "@/lib/store"
import { Settings, Bell, Moon, Sun, User, Shield, Save, Trash2 } from "lucide-react"
import { ExportarDatos } from "@/components/exportar-datos"

export default function ConfiguracionPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <ConfiguracionContent />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function ConfiguracionContent() {
  const { usuarioActual, tema, toggleTema } = useAppStore()
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Settings className="mr-2 text-emerald-600" size={24} />
          Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Personaliza tu experiencia en OptiaPlan</p>
      </div>

      {/* Pestañas */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "general"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab("notificaciones")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "notificaciones"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Notificaciones
          </button>
          <button
            onClick={() => setActiveTab("cuenta")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "cuenta"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Cuenta
          </button>
          <button
            onClick={() => setActiveTab("datos")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "datos"
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Datos
          </button>
          {usuarioActual?.rol === "admin" && (
            <button
              onClick={() => setActiveTab("admin")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "admin"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Administración
            </button>
          )}
        </nav>
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === "general" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuración General</h2>

            {/* Tema */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tema</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cambia entre modo claro y oscuro</p>
              </div>
              <button
                onClick={toggleTema}
                className="flex items-center justify-center w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative"
              >
                <div
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${tema === "dark" ? "transform translate-x-6 bg-emerald-500" : "bg-white"}`}
                ></div>
                <Sun size={12} className="absolute left-1 top-1 text-yellow-500 dark:text-transparent" />
                <Moon size={12} className="absolute right-1 top-1 text-transparent dark:text-emerald-300" />
              </button>
            </div>

            {/* Idioma */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Idioma</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Selecciona el idioma de la aplicación</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Zona horaria */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Zona horaria</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configura tu zona horaria local</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                <option value="america/havana">América/La Habana (UTC-5)</option>
                <option value="america/new_york">América/Nueva York (UTC-5)</option>
                <option value="america/mexico_city">América/Ciudad de México (UTC-6)</option>
                <option value="europe/madrid">Europa/Madrid (UTC+1)</option>
              </select>
            </div>

            {/* Formato de fecha */}
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Formato de fecha</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Elige cómo se muestran las fechas</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                <option value="dd/mm/yyyy">DD/MM/AAAA</option>
                <option value="mm/dd/yyyy">MM/DD/AAAA</option>
                <option value="yyyy-mm-dd">AAAA-MM-DD</option>
              </select>
            </div>

            <div className="pt-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Save size={18} />
                <span>Guardar cambios</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "notificaciones" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Bell className="mr-2 text-emerald-600" size={20} />
              Configuración de Notificaciones
            </h2>

            <div className="space-y-4">
              {/* Notificaciones de cortes */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Cortes eléctricos</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibe alertas sobre nuevos cortes programados
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              {/* Notificaciones de actividades */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Recordatorios de actividades</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibe recordatorios de tus próximas actividades
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              {/* Notificaciones de sugerencias */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Sugerencias inteligentes</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibe sugerencias para optimizar tu planificación
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>

              {/* Tiempo de anticipación */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tiempo de anticipación</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ¿Con cuánta anticipación quieres recibir recordatorios?
                  </p>
                </div>
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                  <option value="15">15 minutos antes</option>
                  <option value="30">30 minutos antes</option>
                  <option value="60">1 hora antes</option>
                  <option value="120">2 horas antes</option>
                  <option value="1440">1 día antes</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Save size={18} />
                <span>Guardar preferencias</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "cuenta" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="mr-2 text-emerald-600" size={20} />
              Configuración de Cuenta
            </h2>

            {/* Información de perfil */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                <input
                  type="text"
                  defaultValue={usuarioActual?.nombre}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  defaultValue={usuarioActual?.email}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirmar nueva contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Save size={18} />
                <span>Guardar cambios</span>
              </button>

              <button className="bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Trash2 size={18} />
                <span>Eliminar cuenta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "datos" && (
        <ExportarDatos />
      )}

      {activeTab === "admin" && usuarioActual?.rol === "admin" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="mr-2 text-emerald-600" size={20} />
              Configuración de Administración
            </h2>

            <div className="space-y-4">
              {/* Configuración del sistema */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">Configuración del Sistema</h3>

                <div className="space-\
