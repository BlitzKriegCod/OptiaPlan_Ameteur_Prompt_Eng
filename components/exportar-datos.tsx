"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { exportarDatosJSON, exportarDatosCSV, exportarDatosPDF, importarDatosJSON } from "@/lib/export"
import { Download, Upload, FileJson, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"

export function ExportarDatos() {
  const { actividades, cortes, agregarActividad, agregarCorte } = useAppStore()
  const [tipoExportacion, setTipoExportacion] = useState<"json" | "csv" | "pdf">("json")
  const [tiposDatos, setTiposDatos] = useState<{ actividades: boolean; cortes: boolean }>({
    actividades: true,
    cortes: true,
  })
  const [importando, setImportando] = useState(false)
  const [archivoImportado, setArchivoImportado] = useState<File | null>(null)

  const handleExportar = () => {
    // Preparar datos para exportar
    const datosExportar: any = {}

    if (tiposDatos.actividades) {
      datosExportar.actividades = actividades
    }

    if (tiposDatos.cortes) {
      datosExportar.cortes = cortes
    }

    // Exportar según el formato seleccionado
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const nombreBase = `optiaplan_export_${timestamp}`

    switch (tipoExportacion) {
      case "json":
        exportarDatosJSON(datosExportar, `${nombreBase}.json`)
        break
      case "csv":
        if (tiposDatos.actividades) {
          exportarDatosCSV(actividades, `${nombreBase}_actividades.csv`)
        }
        if (tiposDatos.cortes) {
          exportarDatosCSV(cortes, `${nombreBase}_cortes.csv`)
        }
        break
      case "pdf":
        exportarDatosPDF(datosExportar, `${nombreBase}.pdf`)
        break
    }
  }

  const handleImportar = async () => {
    if (!archivoImportado) return

    try {
      const datos = await importarDatosJSON<{ actividades?: any[]; cortes?: any[] }>(archivoImportado)

      // Importar actividades
      if (datos.actividades && Array.isArray(datos.actividades)) {
        datos.actividades.forEach((actividad) => {
          // Omitimos id y creadoEn para que se generen nuevos
          const { id, creadoEn, ...actividadData } = actividad
          agregarActividad(actividadData)
        })
      }

      // Importar cortes
      if (datos.cortes && Array.isArray(datos.cortes)) {
        datos.cortes.forEach((corte) => {
          // Omitimos id y creadoEn para que se generen nuevos
          const { id, creadoEn, ...corteData } = corte
          agregarCorte(corteData)
        })
      }

      alert("Datos importados correctamente")
      setArchivoImportado(null)
      setImportando(false)
    } catch (error) {
      console.error("Error al importar datos:", error)
      alert("Error al importar datos. Verifica que el archivo tenga el formato correcto.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Download className="mr-2 text-emerald-600" size={20} />
          Exportar Datos
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Formato de exportación
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="formato"
                  checked={tipoExportacion === "json"}
                  onChange={() => setTipoExportacion("json")}
                  className="mr-2"
                />
                <FileJson size={16} className="mr-1 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">JSON</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="formato"
                  checked={tipoExportacion === "csv"}
                  onChange={() => setTipoExportacion("csv")}
                  className="mr-2"
                />
                <FileSpreadsheet size={16} className="mr-1 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">CSV</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="formato"
                  checked={tipoExportacion === "pdf"}
                  onChange={() => setTipoExportacion("pdf")}
                  className="mr-2"
                />
                <FilePdf size={16} className="mr-1 text-red-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">PDF</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Datos a exportar</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={tiposDatos.actividades}
                  onChange={() => setTiposDatos({ ...tiposDatos, actividades: !tiposDatos.actividades })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Actividades</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={tiposDatos.cortes}
                  onChange={() => setTiposDatos({ ...tiposDatos, cortes: !tiposDatos.cortes })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Cortes Eléctricos</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleExportar}
            disabled={!tiposDatos.actividades && !tiposDatos.cortes}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:bg-emerald-400"
          >
            <Download size={18} />
            <span>Exportar Datos</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Upload className="mr-2 text-emerald-600" size={20} />
          Importar Datos
        </h3>

        {!importando ? (
          <button
            onClick={() => setImportando(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Upload size={18} />
            <span>Importar desde archivo</span>
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selecciona un archivo JSON
              </label>
              <input
                type="file"
                accept=".json"
                onChange={(e) => setArchivoImportado(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Solo se aceptan archivos JSON exportados desde OptiaPlan
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleImportar}
                disabled={!archivoImportado}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:bg-blue-400"
              >
                <Upload size={18} />
                <span>Importar</span>
              </button>

              <button
                onClick={() => {
                  setImportando(false)
                  setArchivoImportado(null)
                }}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
