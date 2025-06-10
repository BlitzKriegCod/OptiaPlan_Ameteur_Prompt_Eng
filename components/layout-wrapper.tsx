"use client"

import type React from "react"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { tema } = useAppStore()

  useEffect(() => {
    if (tema === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [tema])

  return <>{children}</>
}
