import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { ChatBot } from "@/components/chat-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OptiaPlan - Menos Molestias, Más Eficiencia",
  description: "Sistema inteligente para gestionar actividades críticas ante cortes eléctricos en Santiago de Cuba",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
          <ChatBot />
        </LayoutWrapper>
      </body>
    </html>
  )
}
