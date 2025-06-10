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
