"use client"

import { Bell, Moon, Sun, User, LogOut } from "lucide-react"
import Image from "next/image"
import { useAppStore } from "@/lib/store"
import { cerrarSesion } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { usuarioActual, setUsuarioActual, tema, toggleTema, notificaciones } = useAppStore()
  const router = useRouter()

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length

  const handleLogout = () => {
    cerrarSesion()
    setUsuarioActual(null)
    router.push("/login")
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image src="/logo.svg" alt="OptiaPlan" width={32} height={32} />
          <div>
            <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">OptiaPlan</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Menos Molestias, Más Eficiencia</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Bell size={20} />
            {notificacionesNoLeidas > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificacionesNoLeidas}
              </span>
            )}
          </button>

          {/* Toggle tema */}
          <button
            onClick={toggleTema}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {tema === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Usuario */}
          {usuarioActual && (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{usuarioActual.nombre}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{usuarioActual.rol}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <User size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
