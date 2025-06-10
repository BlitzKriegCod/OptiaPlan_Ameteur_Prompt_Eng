import { usuariosMock, credencialesMock } from "./mock-data"
import type { Usuario } from "@/types"

export interface AuthResult {
  success: boolean
  usuario?: Usuario
  error?: string
}

export async function autenticarUsuario(email: string, password: string): Promise<AuthResult> {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Verificar credenciales mock
  const esUsuario = email === credencialesMock.usuario.email && password === credencialesMock.usuario.password
  const esAdmin = email === credencialesMock.admin.email && password === credencialesMock.admin.password

  if (esUsuario || esAdmin) {
    const usuario = usuariosMock.find((u) => u.email === email)
    return {
      success: true,
      usuario,
    }
  }

  return {
    success: false,
    error: "Credenciales inválidas",
  }
}

export function cerrarSesion(): void {
  // En una app real, aquí limpiarías tokens, cookies, etc.
  console.log("Sesión cerrada")
}
