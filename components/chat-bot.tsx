"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { simularLlamadaOpenRouter } from "@/lib/chat"
import { MessageSquare, Send, X, Settings, Trash2 } from "lucide-react"

export function ChatBot() {
  const {
    mensajesChat,
    agregarMensajeChat,
    limpiarChat,
    chatAbierto,
    setChatAbierto,
    configuracionLLM,
    actualizarConfiguracionLLM,
  } = useAppStore()

  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(false)
  const [mostrarConfig, setMostrarConfig] = useState(false)
  const [configTemp, setConfigTemp] = useState(configuracionLLM)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll al último mensaje
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [mensajesChat])

  const handleEnviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!mensaje.trim()) return

    // Agregar mensaje del usuario
    agregarMensajeChat({
      contenido: mensaje,
      esUsuario: true,
    })

    setMensaje("")
    setCargando(true)

    try {
      // Convertir mensajes para el formato esperado por la API
      const historialFormateado = mensajesChat.map((msg) => ({
        role: msg.esUsuario ? ("user" as const) : ("assistant" as const),
        content: msg.contenido,
      }))

      // Enviar mensaje al LLM
      const respuesta = await simularLlamadaOpenRouter(mensaje, configuracionLLM, historialFormateado)

      // Agregar respuesta del asistente
      agregarMensajeChat({
        contenido: respuesta,
        esUsuario: false,
      })
    } catch (error) {
      console.error("Error al procesar mensaje:", error)

      // Agregar mensaje de error
      agregarMensajeChat({
        contenido: "Lo siento, ha ocurrido un error al procesar tu mensaje.",
        esUsuario: false,
      })
    } finally {
      setCargando(false)
    }
  }

  const handleGuardarConfig = () => {
    actualizarConfiguracionLLM(configTemp)
    setMostrarConfig(false)
  }

  if (!chatAbierto) {
    return (
      <button
        onClick={() => setChatAbierto(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 shadow-lg z-50"
        aria-label="Abrir chat"
      >
        <MessageSquare size={24} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Cabecera del chat */}
      <div className="bg-emerald-600 dark:bg-emerald-700 text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare size={18} className="mr-2" />
          <h3 className="font-medium">Asistente OptiaPlan</h3>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setMostrarConfig(!mostrarConfig)}
            className="p-1 hover:bg-emerald-700 dark:hover:bg-emerald-800 rounded"
            aria-label="Configuración"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => limpiarChat()}
            className="p-1 hover:bg-emerald-700 dark:hover:bg-emerald-800 rounded"
            aria-label="Limpiar chat"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setChatAbierto(false)}
            className="p-1 hover:bg-emerald-700 dark:hover:bg-emerald-800 rounded"
            aria-label="Cerrar chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Panel de configuración */}
      {mostrarConfig && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h4 className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">Configuración del LLM</h4>

          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Proveedor</label>
              <select
                value={configTemp.proveedor}
                onChange={(e) => setConfigTemp({ ...configTemp, proveedor: e.target.value as any })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="openrouter">OpenRouter</option>
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">API Key</label>
              <input
                type="password"
                value={configTemp.apiKey}
                onChange={(e) => setConfigTemp({ ...configTemp, apiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Modelo</label>
              <select
                value={configTemp.modelo}
                onChange={(e) => setConfigTemp({ ...configTemp, modelo: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="openai/gpt-3.5-turbo">OpenAI GPT-3.5 Turbo</option>
                <option value="openai/gpt-4">OpenAI GPT-4</option>
                <option value="anthropic/claude-3-opus">Anthropic Claude 3 Opus</option>
                <option value="anthropic/claude-3-sonnet">Anthropic Claude 3 Sonnet</option>
                <option value="meta/llama-3-70b">Meta Llama 3 70B</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Temperatura: {configTemp.temperatura}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={configTemp.temperatura}
                onChange={(e) => setConfigTemp({ ...configTemp, temperatura: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleGuardarConfig}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensajes */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3 max-h-80">
        {mensajesChat.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <MessageSquare className="mx-auto mb-2 opacity-50" size={24} />
            <p className="text-sm">¡Hola! Soy tu asistente de OptiaPlan.</p>
            <p className="text-xs">¿En qué puedo ayudarte hoy?</p>
          </div>
        ) : (
          mensajesChat.map((msg) => (
            <div key={msg.id} className={`flex ${msg.esUsuario ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  msg.esUsuario
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.contenido}
                <div
                  className={`text-xs mt-1 ${msg.esUsuario ? "text-emerald-100" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))
        )}

        {cargando && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulario de entrada */}
      <form onSubmit={handleEnviarMensaje} className="border-t border-gray-200 dark:border-gray-700 p-3 flex">
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-white"
          disabled={cargando}
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-r-lg disabled:bg-emerald-400"
          disabled={cargando || !mensaje.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
