# Optiaplan prototype

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/taimis-projects/v0-optiaplan-prototype)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/7Tw5KUNf40R)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/taimis-projects/v0-optiaplan-prototype](https://vercel.com/taimis-projects/v0-optiaplan-prototype)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/7Tw5KUNf40R](https://v0.dev/chat/projects/7Tw5KUNf40R)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

// Prompt maestro para GPT-4 o Claude
// Objetivo: Generar un prototipo funcional de un calendario inteligente para gestionar actividades críticas ante cortes eléctricos en Santiago de Cuba, con datos mock y tipado definido.

PROMPT:

Eres un desarrollador fullstack experto. Tu tarea es construir un prototipo funcional del sistema **OptiaPlan** con las siguientes características:

---
📛 **Nombre del sistema:** OptiaPlan  
🧭 **Lema:** "Menos Molestias, Más Eficiencia"  
🎨 **Color base:** Esmeralda (#10B981)

---
🛠️ **Stack Tecnológico**
- Next.js 14 (App Router)
- Tailwind CSS + soporte dark/light
- Lucide Icons
- NextAuth.js (auth básica mock)
- MockData local para actividades, cortes y usuarios
- Zustand o Context API para estado global

---
📦 **Estructura del Proyecto**
- `/app`: rutas principales
- `/components`: UI reutilizable (Navbar, Sidebar, etc.)
- `/lib`: funciones helper (fechas, temas, etc.)
- `/types`: tipos TypeScript para cada entidad
- `/styles`: estilos globales
- `/public`: estáticos y logo SVG
- `/mock`: archivos de datos simulados (JSON o módulos TS)

---
🔐 **Autenticación**
- Simulada con NextAuth.js en modo "mock auth"
- Login con credenciales predefinidas
- Middleware para proteger rutas sensibles

---
📊 **Entidades y Tipos (mapear en `@/types`)**

1. Usuario
```ts
export type Usuario = {
  id: string;
  nombre: string;
  email: string;
  rol: 'usuario' | 'admin';
  creadoEn: Date;
};
```

2. Actividad Crítica
```ts
export type ActividadCritica = {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha: string;
  horaInicio: string;
  duracionMinutos: number;
  categoria: 'hogar' | 'salud' | 'educacion' | 'trabajo' | 'otro';
  criticidad: 'alta' | 'media' | 'baja';
  etiquetas?: string[];
  lugar?: string;
  usuarioId: string;
  creadoEn: Date;
};
```

3. Predicción de Corte
```ts
export type CorteElectrico = {
  id: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  descripcion?: string;
  severidad: 'alta' | 'media' | 'baja';
  creadoEn: Date;
};
```

4. Sugerencia de Horario
```ts
export type SugerenciaHorario = {
  actividadId: string;
  horarioSugerido: string; // ISO
  riesgo: 'alto' | 'moderado' | 'bajo';
};
```

---
📚 **Funcionalidades**
- CRUD de actividades usando Zustand o Context (sin DB)
- CRUD de predicciones de corte (mock)
- Dashboard con resumen (mock)
- Vista tipo calendario básica
- Mock de sugerencias de horario según cortes
- Simulación de notificaciones por hora próxima a corte

---
🎨 **Diseño UI**
- Navbar + Sidebar con iconos Lucide
- Dark/light switch
- Logo SVG en `/public/logo.svg` con nombre "OptiaPlan"
- Layout responsive
- Uso de tarjetas y tablas para visualización

---
📝 **Notas Finales**
- No debe depender de ningún backend ni base de datos real
- Todo debe funcionar con datos locales (mock JSON, fixtures o modulos TS)
- UX accesible y clara
- Solo usar Tailwind y Lucide Icons, sin librerías externas

=== Fin del Prompt ===
