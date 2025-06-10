import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  ActividadCritica,
  CorteElectrico,
  NotificacionMock,
  Usuario,
  MensajeChat,
  ConfiguracionLLM,
} from "@/types"
import { actividadesMock, cortesMock, notificacionesMock } from "./mock-data"

interface AppState {
  // Usuario actual
  usuarioActual: Usuario | null
  setUsuarioActual: (usuario: Usuario | null) => void

  // Actividades
  actividades: ActividadCritica[]
  agregarActividad: (actividad: Omit<ActividadCritica, "id" | "creadoEn">) => void
  actualizarActividad: (id: string, actividad: Partial<ActividadCritica>) => void
  eliminarActividad: (id: string) => void

  // Cortes eléctricos
  cortes: CorteElectrico[]
  agregarCorte: (corte: Omit<CorteElectrico, "id" | "creadoEn">) => void
  actualizarCorte: (id: string, corte: Partial<CorteElectrico>) => void
  eliminarCorte: (id: string) => void

  // Notificaciones
  notificaciones: NotificacionMock[]
  marcarNotificacionLeida: (id: string) => void
  agregarNotificacion: (notificacion: Omit<NotificacionMock, "id" | "creadoEn">) => void

  // Chat
  mensajesChat: MensajeChat[]
  agregarMensajeChat: (mensaje: Omit<MensajeChat, "id" | "timestamp">) => void
  limpiarChat: () => void
  chatAbierto: boolean
  setChatAbierto: (abierto: boolean) => void

  // Configuración LLM
  configuracionLLM: ConfiguracionLLM
  actualizarConfiguracionLLM: (config: Partial<ConfiguracionLLM>) => void

  // Tema
  tema: "light" | "dark"
  toggleTema: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      usuarioActual: null,
      actividades: actividadesMock,
      cortes: cortesMock,
      notificaciones: notificacionesMock,
      mensajesChat: [],
      chatAbierto: false,
      configuracionLLM: {
        proveedor: "openrouter",
        apiKey: "",
        modelo: "openai/gpt-3.5-turbo",
        temperatura: 0.7,
        maxTokens: 1000,
      },
      tema: "light",

      // Acciones de usuario
      setUsuarioActual: (usuario) => set({ usuarioActual: usuario }),

      // Acciones de actividades
      agregarActividad: (actividad) =>
        set((state) => ({
          actividades: [
            ...state.actividades,
            {
              ...actividad,
              id: Date.now().toString(),
              creadoEn: new Date(),
            },
          ],
        })),

      actualizarActividad: (id, actividadActualizada) =>
        set((state) => ({
          actividades: state.actividades.map((actividad) =>
            actividad.id === id ? { ...actividad, ...actividadActualizada } : actividad,
          ),
        })),

      eliminarActividad: (id) =>
        set((state) => ({
          actividades: state.actividades.filter((actividad) => actividad.id !== id),
        })),

      // Acciones de cortes
      agregarCorte: (corte) =>
        set((state) => ({
          cortes: [
            ...state.cortes,
            {
              ...corte,
              id: Date.now().toString(),
              creadoEn: new Date(),
            },
          ],
        })),

      actualizarCorte: (id, corteActualizado) =>
        set((state) => ({
          cortes: state.cortes.map((corte) => (corte.id === id ? { ...corte, ...corteActualizado } : corte)),
        })),

      eliminarCorte: (id) =>
        set((state) => ({
          cortes: state.cortes.filter((corte) => corte.id !== id),
        })),

      // Acciones de notificaciones
      marcarNotificacionLeida: (id) =>
        set((state) => ({
          notificaciones: state.notificaciones.map((notif) => (notif.id === id ? { ...notif, leida: true } : notif)),
        })),

      agregarNotificacion: (notificacion) =>
        set((state) => ({
          notificaciones: [
            ...state.notificaciones,
            {
              ...notificacion,
              id: Date.now().toString(),
              creadoEn: new Date(),
            },
          ],
        })),

      // Acciones de chat
      agregarMensajeChat: (mensaje) =>
        set((state) => ({
          mensajesChat: [
            ...state.mensajesChat,
            {
              ...mensaje,
              id: Date.now().toString(),
              timestamp: new Date(),
            },
          ],
        })),

      limpiarChat: () => set({ mensajesChat: [] }),

      setChatAbierto: (abierto) => set({ chatAbierto: abierto }),

      // Acciones de configuración LLM
      actualizarConfiguracionLLM: (config) =>
        set((state) => ({
          configuracionLLM: {
            ...state.configuracionLLM,
            ...config,
          },
        })),

      // Acciones de tema
      toggleTema: () =>
        set((state) => ({
          tema: state.tema === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "optiaplan-storage",
      partialize: (state) => ({
        actividades: state.actividades,
        cortes: state.cortes,
        notificaciones: state.notificaciones,
        mensajesChat: state.mensajesChat,
        configuracionLLM: state.configuracionLLM,
        tema: state.tema,
      }),
    },
  ),
)
