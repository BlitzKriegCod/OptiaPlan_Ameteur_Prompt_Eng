"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { usuarioActual } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (!usuarioActual) {
      router.push("/login")
    }
  }, [usuarioActual, router])

  if (!usuarioActual) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
