# 📝 Especificaciones del Sistema: OptiaPlan

## 🎯 Descripción General

**OptiaPlan** es un prototipo funcional de un calendario inteligente diseñado para optimizar la planificación de actividades críticas ante cortes eléctricos frecuentes en Santiago de Cuba. Este sistema permite a los usuarios organizar sus tareas en función de predicciones simuladas de apagones y sugerencias de horario, todo utilizando datos locales (MockData).

## 📌 Objetivo

Desarrollar una aplicación de gestión de actividades que utilice una arquitectura moderna, datos mock, soporte de autenticación simple y una interfaz intuitiva con soporte para temas.

## 💡 Funcionalidades

* Gestión (CRUD) de actividades críticas.
* Gestión (CRUD) de predicciones de cortes eléctricos.
* Sugerencias de horario mock en base a predicciones.
* Interfaz calendario básica.
* Notificaciones locales simuladas.
* Login mock (NextAuth).
* Persistencia en localStorage.
* Opción para exportar los datos.
* Chatbot embebido en la interfaz.

## ⚙️ Stack Tecnológico

* Next.js 14 (App Router)
* Tailwind CSS (light/dark mode)
* Lucide Icons
* Zustand o Context API
* NextAuth (modo mock)
* LLM configurable mediante OpenRouter u otros

## 🧱 Estructura de Proyecto

* `/app` – Rutas
* `/components` – Componentes UI reutilizables
* `/lib` – Funciones auxiliares
* `/mock` – Datos mock simulados
* `/public` – Recursos estáticos y logo
* `/styles` – Tailwind config + globals
* `/types` – Tipos TS de entidades

## 📊 Tipos de Datos (Mock)

* Usuario
* Actividad Crítica
* Corte Eléctrico
* Sugerencia de Horario

## 🔐 Autenticación

* Login simulado
* Autorización básica por rol ('admin', 'usuario')

## 🤖 Chatbot Integrado

* Actúa directamente sobre el sitio
* Permite agregar tareas con lenguaje natural
* Configurable vía OpenRouter u otros proveedores LLM

## 📤 Exportación de Datos

* Opción para exportar los datos en JSON desde la interfaz
* Ideal para respaldos o integraciones futuras

---

# 🎨 Proceso Creativo

## 📅 Planificación

* Revisión del documento base
* Recolección de requisitos y contexto
* Diseño de entidades y funcionalidades

## 🏗️ Diseño y Arquitectura

* Enfoque modular y reutilizable
* Datos simulados desde módulos TS (`/mock/*.ts`)
* Layout responsive y tematizable

## 🛠️ Herramientas Utilizadas

* VS Code (IDE)
* ChatGPT (Prompt engineering)
* GitHub para versión final como GitHub Pages
* Navegador con DevTools

## 🧠 Prompts Aplicados

* Generación del prototipo y funcionalidades
* Refinamiento iterativo del diseño
* Tipado explícito de entidades
* Generación de instrucciones y estructura de proyecto

## 🔁 Iteraciones

* Iteración 1: Diseño base de arquitectura y UI
* Iteración 2: MockData + CRUD funcional
* Iteración 3: Chatbot y exportación de datos
* Iteración 4: Ajustes visuales + UX

## ⚠️ Dificultades

* Emulación de predicciones sin IA real
* Control de estado local sincronizado
* Integración coherente de chatbot sobre tareas

---

# 📂 Entregables y Evaluación

## 🧪 Artefactos

* Prompt Maestro (Generación de Prototipo)
* Tipos TypeScript
* MockData JSON o módulos
* Código del chatbot embebido

## ✅ Requisitos Implementados

* [x] CRUD completo de entidades principales
* [x] Mock de predicción de cortes eléctricos
* [x] Chatbot funcional en sitio
* [x] Exportación de datos
* [x] UI accesible y moderna

## 💬 Experiencia

El desarrollo fue iterativo, apoyado en prompts bien diseñados y pruebas constantes en el navegador. Se utilizó la IA de forma activa tanto para generación de código como en la interfaz del prototipo, integrando todo en un solo entorno de trabajo local.

---

# 📬 Entrega Final

Enviar un correo a: **[yoeldcd@uci.cu](mailto:yoeldcd@uci.cu)**

**Asunto:** `{TU_NOMBRE}+{FACULTAD}+OPTATIVA IA`

**Contenido del correo:**

* Informe de investigación (PDF)
* Enlace al repositorio del prototipo (GitHub)
* Capturas o enlaces a los chats de IA usados (o evidencia integrada al IDE)

---

# 🏁 Evaluación

* Asistencia General
* Calidad del Trabajo Investigativo
* Calidad del Prototipo Desarrollado
* Uso Inteligente de IA
* Dominio del stack tecnológico
* Participación grupal evidenciada en el chat

---

Este markdown sirve como documentación completa del sistema **OptiaPlan** y puede incluirse directamente en el repositorio del proyecto para acompañar la entrega oficial.

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
