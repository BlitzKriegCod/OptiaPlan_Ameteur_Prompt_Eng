import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatearHora(hora: string): string {
  return new Date(`2024-01-01T${hora}`).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function obtenerColorCriticidad(criticidad: "alta" | "media" | "baja"): string {
  switch (criticidad) {
    case "alta":
      return "text-red-600 bg-red-50 border-red-200"
    case "media":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "baja":
      return "text-green-600 bg-green-50 border-green-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export function obtenerColorCategoria(categoria: string): string {
  switch (categoria) {
    case "salud":
      return "text-red-600 bg-red-50"
    case "trabajo":
      return "text-blue-600 bg-blue-50"
    case "educacion":
      return "text-purple-600 bg-purple-50"
    case "hogar":
      return "text-emerald-600 bg-emerald-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}
