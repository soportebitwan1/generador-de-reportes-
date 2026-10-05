# Documentación Técnica del Sistema de Votación de Personero Estudiantil

---

## 🎯 Propósito General

Este sistema fue desarrollado para organizar y simplificar el proceso de elección del **Personero Estudiantil del colegio. Permite a los estudiantes:

1. **Conocer** a los candidatos y sus propuestas
2. **Votar** de forma segura mediante su número de documento de identidad
3. **Consultar** los resultados actualizados en tiempo real

---

## 🏗️ Arquitectura General del Proyecto

### Tecnologías Utilizadas:
| Tecnología        | Versión | Propósito |
|---------------------|---------|-----------|
| **Next.js 14**      | 14.2.5  | Framework principal (App Router) |
| **React 18**        | 18.3   | UI Interfaz de Usuario |
| **TypeScript**      | 5.5     | Tipado seguro del código |
| **Tailwind CSS**    | 3.4      | Estilos visuales |
| **Node.js (fs)**    | Nativa   | Almacenamiento en archivos JSON |

### Despliegue:
- El proyecto está **100% compatible con **Vercel** (despliegue sin configuración extra).

---

## 📁 Estructura de Carpetas y Archivos

```
raiz-del-proyecto/
├── 📁 app/                              # Rutas de Next.js (App Router)
│   ├── 📄 globals.css                    # Estilos con Tailwind
│   ├── 📄 layout.tsx                     # Layout general (navbar + footer)
│   ├── 📄 page.tsx                         # PÁGINA 1: Home con candidatos
│   ├── 📁 votar/
│   │   └── 📄 page.tsx                    # PÁGINA 2: Formulario de votación
│   ├── 📁 resultados/
│   │   └── 📄 page.tsx                    # PÁGINA 3: Resultados en vivo
│   └── 📁 api/                            # Rutas API tipo REST
│       ├── 📁 validar-estudiante/route.ts # API: Validar documento
│       ├── 📁 votar/route.ts                # API: Registrar voto
│       └── 📁 resultados/route.ts          # API: Devolver conteo de votos
│
├── 📁 data/                               # Datos (base JSON)
│   ├── 📄 estudiantes.ts                 # Lista de estudiantes de prueba
│   ├── 📄 candidatos.ts                 # Los 3 candidatos
│   └── 📄 votos.json                    # Archivo de votos (persistencia)
│
├── 📁 lib/                                # Lógica del sistema
│   └── 📄 almacenamiento.ts             # Gestión archivo JSON
│
├── 📁 types/                              # Definición de tipos TS
│   └── 📄 index.ts                       # Interfaces
│
├── 📄 package.json                       # Dependencias
├── 📄 tsconfig.json                    # Config TypeScript
├── 📄 next.config.mjs                    # Config Next.js
├── 📄 tailwind.config.js                # Config Tailwind
└── 📄 postcss.config.js                # Config PostCSS
```

---

## 🔒 Flujo Completo del Voto (Paso a Paso)

### Paso 1 - Página Inicio (`/`)
- El usuario ve los 3 candidatos con foto, nombre, grado y **4 propuestas cada uno
- Botón para ir a votar

### Paso 2 - Validación de Identidad (`/votar` - Paso 1)
- El estudiante ingresa su **número de documento de identidad**
- El sistema llama a la API **`POST /api/validar-estudiante`**:
  1. Busca el documento en la lista oficial (`estudiantes.ts`)
  2. Si NO está → Error: "Documento no encontrado"
  3. SI está pero ya votó → Error: "Ya has votado antes"
  4. SI está y no ha votado → ✅ Pasa al Paso 2

### Paso 3 - Selección de Candidato (`/votar` - Paso 2)
- Se muestra el nombre del estudiante verificado
- Se listan los candidatos como tarjetas clicables
- El estudiante **selecciona UN candidato
- Presiona **Confirmar voto**
- Llamado a la API **`POST /api/votar`**:
  - Guarda el voto en `data/votos.json`
- Guarda: documento, ID candidato, fecha/hora

### Paso 4 - Confirmación y Resultados
- Muestra mensaje "Voto exitoso con datos del candidato elegido y hora
- Puede ver resultados parciales o volver al inicio

### Paso 5 - Panel Resultados (`/resultados`)
- Consume API **`GET /api/resultados`**
- Muestra ranking visual con barras de progreso
- Tarjetas con: total de votos, candidato líder, última actualización
- Botón para actualizar manualmente

---

## 💾 Sistema de Almacenamiento (Archivo JSON)

> Archivo: `/data/votos.json`

**Formato de cada voto:**
```json
{
  "documentoEstudiante": "1001001001",
  "candidatoId": 1,
  "fecha": "2025-10-05T14:48:00.000Z"
}
```

**Módulo encargado:** `/lib/almacenamiento.ts` exporta:**
| Función | Propósito |
|---------|-----------|
| `leerTodosLosVotos()` | Lee el JSON y devuelve array votos |
| `guardarVoto(voto)` | Agrega voto + valida no-repetición |
| `estudianteYaVoto(doc)` | true/false si votó |
| `contarVotosPorCandidato()` | Conteo por ID de candidato |
| `totalVotosEmitidos()` | Número total |
| `reiniciarVotos()` | Limpia votos (testing) |

---

## 👥 Datos de Prueba - Estudiantes Habilitados

El sistema **solo** acepta** los documentos de identidad que estén pre-registrados.

**Ejemplos para probar:**

| Documento | Nombre | Grado |
|-----------|--------|-------|
| `1001001001` | Sofía Martínez López | 11° |
| `1001001002` | Juan Sebastián Pérez | 11° |
| `1001001003` | Valentina Gómez Ruiz | 11° |
| `1001002001` | Carlos Mendoza | 10° |
| `1001002002` | Laura Ortega | 10° |
| `1001003001` | Miguel Ángel Prieto | 9° |
| `1001004001` | Tomás Montoya | 8° |
| `1001005001` | Pedro Velásquez | 7° |

**Total:** ~50 estudiantes de prueba desde 6° a 11°.

Modifica el archivo `/data/estudiantes.ts` para agregar los estudiantes reales del colegio.

---

## 👥 Candidatos Predefinidos

### Candidato 1 - María Fernanda Campos Torres (11-01)
- Eslogan: "Unidos por un colegio mejor: ¡Voz de todos!
- Propuestas: Comités convivencia, mejoras zonas descanso, tutorías, festival cultural.

### Candidato 2 - Andrés Felipe Romero (11-02)
- Eslogan: "Deporte, educación y acción: ¡El cambio comienza hoy!"
- Propuestas: Torneos interclases, mejoras cancha, programa reciclaje, buzón sugerencias.

### Candidato 3 - Valentina Patiño Gómez (11-01)
- Eslogan: "Innovación y oportunidades: ¡El colegio que merecemos!"
- Propuestas: Capacitación tecnología, mejora biblioteca, cineclub y excursiones, semana bienestar.

Editar: `/data/candidatos.ts`

---

## 🌐 API Endpoints (Documentación Técnica

### 1. `POST /api/validar-estudiante`
**Descripción:** Valida documento antes de dar acceso al voto

**Body:**
```json
{ "documento": "1001001001" }
```

**Respuesta OK:**
```json
{
  "valido": true,
  "mensaje": "Identidad verificada",
  "datosEstudiante": {
    "nombre": "Sofía Martínez López",
    "grado": "11°",
    "curso": "11-01"
  }
}
```

**Respuesta Error:**
```json
{
  "valido": false,
  "mensaje": "Documento NO encontrado / Ya ha votado"
}
```

---

### 2. `POST /api/votar`
**Descripción:** Registra el voto en el sistema

**Body:**
```json
{
  "documentoEstudiante": "1001001001",
  "candidatoId": 1
}
```

**Respuesta Exitosa:**
```json
{
  "exitoso": true,
  "mensaje": "¡Voto registrado!",
  "datos": {
    "nombreEstudiante": "Sofía Martínez López",
    "nombreCandidato": "María Fernanda Campos Torres",
    "hora": "5/10/2025, 9:48:00 a. m."
  }
}
```

**Códigos de error HTTP:**
- 400 - Faltan datos / Candidato inválido
- 401 - Documento NO registrado
- 403 - El estudiante ya votó
- 500 - Error interno

---

### 3. `GET /api/resultados`
**Descripción:** Devuelve el conteo de votos con estadísticas

**Respuesta:**
```json
{
  "exitoso": true,
  "resultados": [
    {
      "id": 1,
      "nombre": "Nombre Candidato",
      "fotoUrl": "...",
      "slogan": "...",
      "votos": 15,
      "porcentaje": 42.9
    },
    { ... }
  ],
  "estadisticas": {
    "totalVotosEmitidos": 35,
    "totalCandidatos": 3,
    "candidatoLider": { "nombre": "...", "votos": 15, "porcentaje": 42.9 },
    "ultimaActualizacion": "5/10/2025..."
  }
}
```

---

## 🚀 Guía de Instalación y Ejecución Local

### Requisitos Previos
- Node.js **versión 18+

### Instalar Dependencias
```bash
cd nombre-carpeta-del-proyecto
npm install
```

### Ejecutar en Modo Desarrollo
```bash
npm run dev
```
Abre en el navegador: **http://localhost:3000**

### Construir Producción
```bash
npm run build
npm start
```

---

## ☁️ Despliegue en Vercel (Paso a Paso)

**OPCIÓN 1: CLI (Terminal)
```bash
npm install -g vercel
cd carpeta-proyecto
vercel           # Sigue las instrucciones
```

**OPCIÓN 2: Interfaz Web**
1. Subir el proyecto a GitHub (GitHub/GitLab
2. Entrar a [vercel.com](https://vercel.com
3. Importar repositorio
4. Framework: **Next.js** (se detecta auto)
5. Click "Deploy" ✅
6. Listo!

---

## 🚨 IMPORTANTE SOBRE PERSISTENCIA EN VERCEL:
> El sistema usa **despliegue serverless (Serverless Functions), los archivos JSON **no** no persisten entre solicitudes en Vercel.

- ✅ Funciona bien para la **PRUEBAS y DEMO LOCAL.
- ⚠️ En producción real se recomienda cambiar almacenar los votos en una base de datos como: Vercel KV, Supabase PostgreSQL, NeonDB.

---

## 🔄 Escalabilidad Futura: ¿Qué sigue?

El proyecto fue diseñado para ser **fácilmente ampliable**:

1. **Migrar almacenamiento**:
   - Reemplazar `/lib/almacenamiento.ts` con cliente de BD (Supabase, Vercel KV)
   - Mantener mismas funciones (mismas API cambia las funciones se mantienen igual

2. **Autenticación real**: JWT, usuario/contraseña para administrador

3. **Panel Admin**: Dashboard comisión electoral, reiniciar votos, cambiar contraseña, importar estudiantes

4. **Certificado digital**, gráficos avanzados exportar resultados PDF

---

## 🔐 Seguridad Implementada

✅ **Sistema Anti-repetición**: validación doble (API + Frontend)
✅ **Estudiantes**: Solo documentos pre-registrados
✅ **HTTPS en Vercel SSL)
✅ **Sin dependencias mínimas
✅ **Voto secreto:** No muestra en almacena nombres

---

## 📝 Archivos Clave para Modificar

| ¿Qué quieres cambiar? | Archivo a editar |
|---|---|
| Agregar/editar estudiantes | `data/estudiantes.ts` |
| Modificar candidatos / propuestas | `data/candidatos.ts` |
| Colores del colegio | `tailwind.config.js` |
| Textos del navbar/footer | `app/layout.tsx` |
| Textos de la página inicio | `app/page.tsx` |
| Lógica validación voto | `app/api/votar/route.ts` |
| Apariencia del voto | `app/votar/page.tsx` |
| Panel de Resultados | `app/resultados/page.tsx` |

---

## 📌 Resumen de Funcionalidades

✅ Home con lista de candidatos detallada
✅ Verificación de identidad por documento
✅ Restricción: un voto por estudiante
✅ Formulario de votación en 2 pasos
✅ Almacenamiento de votos en JSON
✅ Panel de resultados en tiempo real
✅ Diseño responsivo (móvil, tablet y pc
✅ 100% compatible con Vercel
✅ Todo el código comentado en español

**Listo para presentar y probar!
