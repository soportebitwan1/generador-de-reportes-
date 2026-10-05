// ============================================================
// TIPOS DE DATOS PRINCIPALES
// Definimos las interfaces que usarán todas las partes del sistema
// ============================================================

/**
 * Representa a un estudiante registrado en el sistema
 * Solo los estudiantes con documento en esta lista podrán votar
 */
export interface Estudiante {
  documento: string;   // Número de identificación (cédula/tarjeta de identidad)
  nombre: string;      // Nombre completo del estudiante
  grado: string;       // Grado al que pertenece (ej: 10°, 11°)
  curso: string;       // Curso/Grupo (ej: 11-01, 10-03)
}

/**
 * Representa a un candidato para personero estudiantil
 */
export interface Candidato {
  id: number;                // Identificador único del candidato
  nombre: string;            // Nombre completo del candidato
  grado: string;             // Grado del candidato (todos son 11°)
  curso: string;             // Curso del candidato
  fotoUrl: string;           // URL de la foto de perfil
  slogan: string;            // Eslogan o frase representativa
  propuestas: Propuesta[];   // Lista de propuestas del candidato
}

/**
 * Una propuesta individual de un candidato
 */
export interface Propuesta {
  categoria: string;   // Categoría de la propuesta (ej: Deportes, Convivencia)
  descripcion: string; // Descripción detallada de la propuesta
}

/**
 * Representa un voto individual registrado
 */
export interface Voto {
  documentoEstudiante: string;  // Documento del estudiante que votó
  candidatoId: number;          // ID del candidato elegido
  fecha: string;                // Fecha y hora del voto (ISO)
}
