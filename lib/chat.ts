import type { ConfiguracionLLM } from "@/types"

// Función para enviar mensaje al LLM
export async function enviarMensajeALLM(
  mensaje: string,
  configuracion: ConfiguracionLLM,
  historialMensajes: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  try {
    // En un entorno real, aquí se haría la llamada a la API del proveedor
    // Para este prototipo, simulamos una respuesta

    // Simulamos un tiempo de respuesta
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Respuestas simuladas basadas en palabras clave
    if (mensaje.toLowerCase().includes("actividad") || mensaje.toLowerCase().includes("tarea")) {
      return "Puedo ayudarte a gestionar tus actividades. ¿Quieres crear una nueva actividad, ver las existentes o recibir sugerencias para optimizar tu tiempo?"
    }

    if (mensaje.toLowerCase().includes("corte") || mensaje.toLowerCase().includes("electricidad")) {
      return "Los cortes eléctricos programados pueden afectar tus actividades. Te recomiendo revisar la sección de cortes para planificar mejor tu tiempo."
    }

    if (mensaje.toLowerCase().includes("sugerencia") || mensaje.toLowerCase().includes("recomendar")) {
      return "Basado en tu calendario y los cortes programados, te sugiero reorganizar tus actividades de alta prioridad para evitar interrupciones. ¿Quieres que te muestre algunas sugerencias específicas?"
    }

    if (mensaje.toLowerCase().includes("exportar") || mensaje.toLowerCase().includes("datos")) {
      return "Puedes exportar tus datos desde la sección de configuración. Soportamos formatos JSON y CSV para que puedas mantener un respaldo de tu información."
    }

    if (mensaje.toLowerCase().includes("ayuda") || mensaje.toLowerCase().includes("help")) {
      return "Estoy aquí para ayudarte con OptiaPlan. Puedo asistirte con la gestión de actividades, información sobre cortes eléctricos, sugerencias de optimización y más. ¿En qué puedo ayudarte específicamente?"
    }

    // Respuesta genérica
    return "Entiendo tu mensaje. Como asistente de OptiaPlan, estoy aquí para ayudarte a optimizar tu tiempo y gestionar tus actividades críticas. ¿Hay algo específico en lo que pueda asistirte?"
  } catch (error) {
    console.error("Error al enviar mensaje al LLM:", error)
    return "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde."
  }
}

// Función para simular la integración con OpenRouter
export async function simularLlamadaOpenRouter(
  mensaje: string,
  configuracion: ConfiguracionLLM,
  historialMensajes: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  // Simulamos un tiempo de respuesta
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simulamos una respuesta basada en el modelo seleccionado
  const modeloBase = configuracion.modelo.split("/")[0]

  let respuesta = ""

  switch (modeloBase) {
    case "openai":
      respuesta =
        "Respuesta simulada de OpenAI: He analizado tu mensaje y puedo ayudarte con la gestión de actividades en OptiaPlan."
      break
    case "anthropic":
      respuesta =
        "Respuesta simulada de Anthropic: Basado en tu consulta, te ofrezco las siguientes sugerencias para optimizar tu tiempo."
      break
    case "meta":
      respuesta =
        "Respuesta simulada de Meta: Entiendo tu solicitud. Aquí tienes información sobre cómo gestionar mejor tus actividades."
      break
    default:
      respuesta =
        "Respuesta simulada: Como asistente de OptiaPlan, estoy aquí para ayudarte con la gestión de tus actividades y optimización de tiempo."
  }

  // Añadimos algo de contexto basado en el mensaje
  if (mensaje.toLowerCase().includes("actividad")) {
    respuesta +=
      " Las actividades son el componente central de OptiaPlan, te permiten organizar tu tiempo de manera eficiente."
  } else if (mensaje.toLowerCase().includes("corte")) {
    respuesta += " Los cortes eléctricos programados son importantes para planificar tus actividades críticas."
  }

  return respuesta
}
