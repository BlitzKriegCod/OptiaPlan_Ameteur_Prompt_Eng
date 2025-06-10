# 📘 README – OptiaPlan

> *Un calendario inteligente para gestionar actividades críticas ante cortes eléctricos en Santiago de Cuba.*

## 🎯 Objetivo del Proyecto

Explorar cómo puede integrarse de forma natural la **Inteligencia Artificial (IA)** en el flujo de trabajo diario de desarrollo de software, mediante la construcción de un prototipo funcional que utilice generación asistida por IA y tecnologías web modernas.

---

## 🧠 ¿Qué es OptiaPlan?

OptiaPlan es un calendario inteligente diseñado para ayudar a personas y organizaciones a organizar sus tareas en función de predicciones de cortes eléctricos (mock), optimizando el uso del tiempo y minimizando afectaciones.

Incluye:

* Gestión de actividades críticas.
* Predicción simulada de apagones.
* Sugerencias de horario.
* Chatbot embebido para interacción directa.
* Exportación de datos en local.

---

## 🛠️ Stack Tecnológico

* **Next.js 14** (App Router)
* **Tailwind CSS** (light/dark mode)
* **Lucide Icons**
* **Zustand** o **Context API** para estado global
* **MockData** para persistencia local
* **NextAuth.js** (en modo mock)
* **LLM embebido** (configurable vía OpenRouter)
* **v0.dev** para generación de UI prototipo

---

## 🔧 Funcionalidades

* [x] CRUD de actividades críticas
* [x] CRUD de predicciones de corte eléctrico
* [x] Mock de sugerencias horarias
* [x] Chatbot que entiende comandos naturales
* [x] Interfaz adaptable y tematizable
* [x] Exportación de datos desde navegador

---

## 📁 Estructura de Proyecto

```
├── /app              # Rutas principales
├── /components       # Navbar, Sidebar, Cards...
├── /lib              # Funciones auxiliares
├── /mock             # Datos mock simulados
├── /public           # Logo SVG, favicon, etc.
├── /styles           # Tailwind y global.css
├── /types            # Tipos TS de entidades
└── /llm              # Chatbot embebido
```

---

## 🤖 Integración de IA

* Se usó **ChatGPT** para generar tipos, CRUD, layout, lógica básica y mejorar el Prompt.
* Se usó **v0.dev** para generar la estructura inicial del prototipo de forma visual.
* El prototipo incluye un **chatbot en el frontend** que permite agregar tareas por comandos naturales.

---

## 🔄 Flujo de Desarrollo Asistido por IA

* Planificación y modelado de entidades.
* Generación de estructura y layout.
* Iteraciones de refinamiento con prompts.
* Integración de chatbot sobre LLM externo.
* Validación de funcionalidades con mock data.

---

## 📤 Exportación

Los datos de actividades y cortes pueden exportarse desde el navegador en formato `.json`, permitiendo respaldo o futura integración.

---

## 📸 Evidencias y Entrega

* Chat de desarrollo con ChatGPT adjunto/capturado.
* Prototipo desplegado en GitHub Pages (modo SPA estática).
* README + Documentación de especificaciones incluida.

---

## 🏁 Evaluación

* ✅ Calidad del trabajo investigativo
* ✅ Dominio del stack moderno (Next.js, Tailwind, Zustand)
* ✅ Uso coherente de IA generativa
* ✅ Diseño intuitivo y funcional
* ✅ Participación activa demostrada

---

Gracias por revisar OptiaPlan. Este proyecto demuestra que la IA no es solo una herramienta auxiliar, sino un agente creativo capaz de transformar el desarrollo diario.

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
