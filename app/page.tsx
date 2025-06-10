"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"

export default function HomePage() {
  const { usuarioActual } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (usuarioActual) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [usuarioActual, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
    </div>
  )
}
