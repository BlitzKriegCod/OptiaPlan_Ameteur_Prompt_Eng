import type { Usuario, ActividadCritica, CorteElectrico, SugerenciaHorario, NotificacionMock } from "@/types"

export const usuariosMock: Usuario[] = [
  {
    id: "1",
    nombre: "María González",
    email: "maria@example.com",
    rol: "usuario",
    creadoEn: new Date("2024-01-15"),
  },
  {
    id: "2",
    nombre: "Carlos Admin",
    email: "admin@optiaplan.com",
    rol: "admin",
    creadoEn: new Date("2024-01-01"),
  },
]

export const actividadesMock: ActividadCritica[] = [
  {
    id: "1",
    titulo: "Consulta médica",
    descripcion: "Cita con el cardiólogo",
    fecha: "2024-12-11",
    horaInicio: "09:00",
    duracionMinutos: 60,
    categoria: "salud",
    criticidad: "alta",
    etiquetas: ["médico", "urgente"],
    lugar: "Hospital Provincial",
    usuarioId: "1",
    creadoEn: new Date("2024-12-10"),
  },
  {
    id: "2",
    titulo: "Reunión de trabajo",
    descripcion: "Presentación del proyecto Q4",
    fecha: "2024-12-11",
    horaInicio: "14:00",
    duracionMinutos: 120,
    categoria: "trabajo",
    criticidad: "media",
    etiquetas: ["proyecto", "presentación"],
    lugar: "Oficina Central",
    usuarioId: "1",
    creadoEn: new Date("2024-12-09"),
  },
  {
    id: "3",
    titulo: "Preparar cena familiar",
    descripcion: "Cumpleaños de mamá",
    fecha: "2024-12-12",
    horaInicio: "18:00",
    duracionMinutos: 90,
    categoria: "hogar",
    criticidad: "media",
    etiquetas: ["familia", "celebración"],
    lugar: "Casa",
    usuarioId: "1",
    creadoEn: new Date("2024-12-08"),
  },
  {
    id: "4",
    titulo: "Clases online",
    descripcion: "Curso de programación",
    fecha: "2024-12-13",
    horaInicio: "10:00",
    duracionMinutos: 180,
    categoria: "educacion",
    criticidad: "alta",
    etiquetas: ["estudio", "online"],
    lugar: "Casa",
    usuarioId: "1",
    creadoEn: new Date("2024-12-07"),
  },
]

export const cortesMock: CorteElectrico[] = [
  {
    id: "1",
    fecha: "2024-12-11",
    horaInicio: "08:00",
    horaFin: "12:00",
    descripcion: "Mantenimiento programado en la subestación Norte",
    severidad: "alta",
    creadoEn: new Date("2024-12-09"),
  },
  {
    id: "2",
    fecha: "2024-12-12",
    horaInicio: "15:00",
    horaFin: "18:00",
    descripcion: "Reparación de líneas en el sector Este",
    severidad: "media",
    creadoEn: new Date("2024-12-10"),
  },
  {
    id: "3",
    fecha: "2024-12-13",
    horaInicio: "09:00",
    horaFin: "11:00",
    descripcion: "Mantenimiento menor",
    severidad: "baja",
    creadoEn: new Date("2024-12-11"),
  },
]

export const sugerenciasMock: SugerenciaHorario[] = [
  {
    actividadId: "1",
    horarioSugerido: "2024-12-11T13:00:00Z",
    riesgo: "bajo",
  },
  {
    actividadId: "4",
    horarioSugerido: "2024-12-13T12:00:00Z",
    riesgo: "moderado",
  },
]

export const notificacionesMock: NotificacionMock[] = [
  {
    id: "1",
    titulo: "Corte programado",
    mensaje: "Habrá un corte eléctrico mañana de 8:00 AM a 12:00 PM",
    tipo: "corte",
    leida: false,
    creadoEn: new Date("2024-12-10T20:00:00Z"),
  },
  {
    id: "2",
    titulo: "Sugerencia de horario",
    mensaje: "Te sugerimos mover tu consulta médica a las 1:00 PM",
    tipo: "sugerencia",
    leida: false,
    creadoEn: new Date("2024-12-10T19:30:00Z"),
  },
]

// Credenciales mock para autenticación
export const credencialesMock = {
  usuario: { email: "maria@example.com", password: "usuario123" },
  admin: { email: "admin@optiaplan.com", password: "admin123" },
}
