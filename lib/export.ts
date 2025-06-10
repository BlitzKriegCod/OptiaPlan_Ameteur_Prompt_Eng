import type { ActividadCritica, CorteElectrico } from "@/types"

// Función para exportar datos a JSON
export function exportarDatosJSON(datos: any, nombreArchivo: string): void {
  const jsonString = JSON.stringify(datos, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = nombreArchivo
  document.body.appendChild(a)
  a.click()

  // Limpieza
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Función para exportar datos a CSV
export function exportarDatosCSV(datos: ActividadCritica[] | CorteElectrico[], nombreArchivo: string): void {
  if (datos.length === 0) return

  // Obtener encabezados
  const headers = Object.keys(datos[0]).join(",")

  // Convertir datos a filas CSV
  const filas = datos.map((item) => {
    return Object.values(item)
      .map((valor) => {
        // Manejar valores especiales
        if (valor === null || valor === undefined) return ""
        if (typeof valor === "object") {
          if (valor instanceof Date) return valor.toISOString()
          return JSON.stringify(valor).replace(/"/g, '""')
        }
        // Escapar comillas y envolver en comillas si contiene comas o comillas
        const str = String(valor)
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      })
      .join(",")
  })

  // Combinar encabezados y filas
  const csv = [headers, ...filas].join("\n")

  // Crear y descargar archivo
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = nombreArchivo
  document.body.appendChild(a)
  a.click()

  // Limpieza
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Función para exportar datos a PDF (simulada)
export function exportarDatosPDF(datos: any, nombreArchivo: string): void {
  // En un entorno real, aquí usaríamos una biblioteca como jsPDF
  // Para este prototipo, simplemente mostramos un mensaje
  alert("Exportación a PDF simulada. En una implementación real, se generaría un PDF con los datos.")

  // Simulamos la descarga con un JSON
  exportarDatosJSON(datos, nombreArchivo.replace(".pdf", ".json"))
}

// Función para importar datos desde JSON
export function importarDatosJSON<T>(archivo: File): Promise<T> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const datos = JSON.parse(event.target?.result as string)
        resolve(datos)
      } catch (error) {
        reject(new Error("Error al parsear el archivo JSON"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Error al leer el archivo"))
    }

    reader.readAsText(archivo)
  })
}
