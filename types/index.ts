export type Usuario = {
  id: string
  nombre: string
  email: string
  rol: "usuario" | "admin"
  creadoEn: Date
}

export type ActividadCritica = {
  id: string
  titulo: string
  descripcion?: string
  fecha: string
  horaInicio: string
  duracionMinutos: number
  categoria: "hogar" | "salud" | "educacion" | "trabajo" | "otro"
  criticidad: "alta" | "media" | "baja"
  etiquetas?: string[]
  lugar?: string
  usuarioId: string
  creadoEn: Date
}

export type CorteElectrico = {
  id: string
  fecha: string
  horaInicio: string
  horaFin: string
  descripcion?: string
  severidad: "alta" | "media" | "baja"
  creadoEn: Date
}

export type SugerenciaHorario = {
  actividadId: string
  horarioSugerido: string // ISO
  riesgo: "alto" | "moderado" | "bajo"
}

export type NotificacionMock = {
  id: string
  titulo: string
  mensaje: string
  tipo: "corte" | "actividad" | "sugerencia"
  leida: boolean
  creadoEn: Date
}

export type MensajeChat = {
  id: string
  contenido: string
  esUsuario: boolean
  timestamp: Date
}

export type ConfiguracionLLM = {
  proveedor: "openrouter" | "openai" | "anthropic" | "otro"
  apiKey: string
  modelo: string
  temperatura: number
  maxTokens: number
}
