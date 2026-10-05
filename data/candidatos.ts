// ============================================================
// DATOS DE CANDIDATOS A PERSONERO ESTUDIANTIL
// ============================================================
// Los candidatos son estudiantes de grado 11
// Son 3 candidatos con sus propuestas detalladas
// ============================================================

import { Candidato } from '@/types';

// ============================================================
// IMÁGENES DE LOS CANDIDATOS (usamos imágenes de placeholder
// de Unsplash que son de libre uso)
// ============================================================
const FOTO_CANDIDATO_1 = "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=400&fit=crop&crop=face";
const FOTO_CANDIDATO_2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face";
const FOTO_CANDIDATO_3 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face";

// ============================================================
// LISTADO OFICIAL DE CANDIDATOS
// ============================================================
export const candidatos: Candidato[] = [
  // ===============================================
  // CANDIDATO #1
  // ===============================================
  {
    id: 1,
    nombre: "María Fernanda Campos Torres",
    grado: "11°",
    curso: "11-01",
    fotoUrl: FOTO_CANDIDATO_1,
    slogan: "Unidos por un colegio mejor: ¡Voz de todos!",
    propuestas: [
      {
        categoria: "Convivencia Escolar",
        descripcion: "Crear comités de convivencia por grado para resolver conflictos de manera pacífica entre compañeros, con mediadores estudiantiles capacitados."
      },
      {
        categoria: "Instalaciones",
        descripcion: "Gestionar mejoras en las zonas de descanso: más sombra, bancas nuevas y zonas verdes cuidadas para el recreo."
      },
      {
        categoria: "Academia",
        descripcion: "Organizar tutorías entre estudiantes de grados mayores y menores, para reforzar las materias difíciles."
      },
      {
        categoria: "Cultura y Arte",
        descripcion: "Realizar un festival cultural semestral con música, danza, pintura y teatro para dar espacio a los talentos del colegio."
      }
    ]
  },

  // ===============================================
  // CANDIDATO #2
  // ===============================================
  {
    id: 2,
    nombre: "Andrés Felipe Romero",
    grado: "11°",
    curso: "11-02",
    fotoUrl: FOTO_CANDIDATO_2,
    slogan: "Deporte, educación y acción: ¡El cambio comienza hoy!",
    propuestas: [
      {
        categoria: "Deportes",
        descripcion: "Crear torneos interclases mensuales de fútbol, baloncesto y voleibol con premios para los equipos ganadores."
      },
      {
        categoria: "Infraestructura Deportiva",
        descripcion: "Solicitar mejoras en la cancha: remodelación de gradas, pinturas nuevas y mantenimiento de las porterías."
      },
      {
        categoria: "Medio Ambiente",
        descripcion: "Implementar un programa de reciclaje con puntos verdes en cada salón y jornadas de limpieza del colegio."
      },
      {
        categoria: "Participación",
        descripcion: "Crear buzón de sugerencias físico y digital para que todos los estudiantes propongan ideas a la dirección."
      }
    ]
  },

  // ===============================================
  // CANDIDATO #3
  // ===============================================
  {
    id: 3,
    nombre: "Valentina Patiño Gómez",
    grado: "11°",
    curso: "11-01",
    fotoUrl: FOTO_CANDIDATO_3,
    slogan: "Innovación y oportunidades: ¡El colegio que merecemos!",
    propuestas: [
      {
        categoria: "Tecnología",
        descripcion: "Gestionar jornadas de capacitación en herramientas digitales (edición de video, programación básica, diseño gráfico)."
      },
      {
        categoria: "Biblioteca",
        descripcion: "Ampliar y modernizar la biblioteca con más libros juveniles, cómics y una sala de estudio con computadores."
      },
      {
        categoria: "Eventos Sociales",
        descripcion: "Organizar cineclub semanal, excursiones culturales y un baile de integración para todos los grados."
      },
      {
        categoria: "Bienestar Estudiantil",
        descripcion: "Crear una semana de bienestar con charlas sobre salud mental, autoestima y orientación vocacional."
      }
    ]
  }
];

// ============================================================
// FUNCIÓN: Buscar un candidato por su ID
// ============================================================
/**
 * Busca un candidato por su identificador único
 * @param id Número de ID del candidato
 * @returns El candidato encontrado o null si no existe
 */
export function buscarCandidatoPorId(id: number): Candidato | null {
  return candidatos.find(c => c.id === id) || null;
}
