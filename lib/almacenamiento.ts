// ============================================================
// SISTEMA DE ALMACENAMIENTO DE VOTOS
// ============================================================
// Para mantener el proyecto SIMPLE y sin base de datos externa,
// guardamos los votos en un archivo JSON local.
//
// NOTA IMPORTANTE: En un despliegue real en Vercel, los archivos
// NO se modifican de forma permanente (el sistema es de solo
// lectura). Para pruebas LOCALES este sistema funciona perfectamente.
// Para un despliegue real, más adelante se podría cambiar a
// Vercel KV, Supabase o PostgreSQL.
// ============================================================

import fs from 'fs';
import path from 'path';
import { Voto } from '@/types';

// ============================================================
// RUTA DEL ARCHIVO JSON DONDE SE GUARDAN LOS VOTOS
// ============================================================
const RUTA_DATOS = path.join(process.cwd(), 'data', 'votos.json');

// ============================================================
// FUNCIÓN AUXILIAR: Asegurar que el archivo JSON exista
// Si no existe, lo crea con un array vacío
// ============================================================
function asegurarArchivoExiste(): void {
  try {
    // Verificamos si el archivo existe
    if (!fs.existsSync(RUTA_DATOS)) {
      // Si no existe, creamos la carpeta data si hace falta
      const directorio = path.dirname(RUTA_DATOS);
      if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, { recursive: true });
      }
      // Creamos el archivo con un array vacío
      fs.writeFileSync(RUTA_DATOS, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error al crear el archivo de votos:', error);
    throw new Error('No se pudo inicializar el sistema de almacenamiento');
  }
}

// ============================================================
// FUNCIÓN: Leer todos los votos guardados
// ============================================================
/**
 * Carga todos los votos almacenados en el archivo JSON
 * @returns Arreglo con todos los votos realizados
 */
export function leerTodosLosVotos(): Voto[] {
  try {
    // Nos aseguramos de que el archivo exista
    asegurarArchivoExiste();
    // Leemos el contenido del archivo
    const contenido = fs.readFileSync(RUTA_DATOS, 'utf-8');
    // Lo convertimos a objeto JavaScript
    return JSON.parse(contenido) as Voto[];
  } catch (error) {
    console.error('Error al leer los votos:', error);
    return [];
  }
}

// ============================================================
// FUNCIÓN: Guardar un voto nuevo
// ============================================================
/**
 * Registra un nuevo voto en el sistema
 * Primero valida que el estudiante NO haya votado antes
 * @param voto Datos del voto a registrar
 * @returns true si se guardó correctamente, false si ya votó
 */
export function guardarVoto(voto: Voto): { exitoso: boolean; mensaje: string } {
  try {
    // Cargamos los votos existentes
    const votosExistentes = leerTodosLosVotos();

    // VALIDACIÓN ANTI-REPETICIÓN
    // Verificamos si este documento ya votó
    const yaVoto = votosExistentes.some(v =>
      v.documentoEstudiante === voto.documentoEstudiante
    );

    if (yaVoto) {
      // Si ya votó, no permitimos guardar
      return {
        exitoso: false,
        mensaje: 'Este estudiante ya ha ejercido su derecho al voto anteriormente.'
      };
    }

    // Si no ha votado, añadimos el nuevo voto
    const votosActualizados = [...votosExistentes, voto];

    // Guardamos de nuevo en el archivo JSON (formateado con 2 espacios)
    fs.writeFileSync(
      RUTA_DATOS,
      JSON.stringify(votosActualizados, null, 2),
      'utf-8'
    );

    return {
      exitoso: true,
      mensaje: '¡Voto registrado exitosamente!'
    };

  } catch (error) {
    console.error('Error al guardar el voto:', error);
    return {
      exitoso: false,
      mensaje: 'Ocurrió un error al intentar registrar el voto.'
    };
  }
}

// ============================================================
// FUNCIÓN: Verificar si un estudiante ya votó
// ============================================================
/**
 * Consulta si un estudiante específico ya ha votado
 * @param documento Número de identificación del estudiante
 * @returns true si ya votó, false en caso contrario
 */
export function estudianteYaVoto(documento: string): boolean {
  const votos = leerTodosLosVotos();
  return votos.some(v => v.documentoEstudiante === documento.trim());
}

// ============================================================
// FUNCIÓN: Contar los votos por cada candidato
// ============================================================
/**
 * Cuenta cuántos votos ha recibido cada candidato
 * @returns Objeto con id del candidato y total de votos
 */
export function contarVotosPorCandidato(): { [candidatoId: number]: number } {
  const votos = leerTodosLosVotos();
  const conteo: { [key: number]: number } = {};

  // Inicializamos todos los conteos en 0
  // (importante para que aparezcan candidatos sin votos)
  for (let i = 1; i <= 3; i++) {
    conteo[i] = 0;
  }

  // Contamos los votos
  for (const voto of votos) {
    if (conteo[voto.candidatoId] !== undefined) {
      conteo[voto.candidatoId] += 1;
    }
  }

  return conteo;
}

// ============================================================
// FUNCIÓN: Obtener el total general de votos
// ============================================================
/**
 * @returns Cantidad total de votos registrados en el sistema
 */
export function totalVotosEmitidos(): number {
  return leerTodosLosVotos().length;
}

// ============================================================
// FUNCIÓN: Reiniciar los votos (para pruebas)
// ============================================================
/**
 * Elimina todos los votos registrados (solo para testing)
 */
export function reiniciarVotos(): void {
  try {
    asegurarArchivoExiste();
    fs.writeFileSync(RUTA_DATOS, JSON.stringify([], null, 2), 'utf-8');
    console.log('Votos reiniciados correctamente');
  } catch (error) {
    console.error('Error al reiniciar votos:', error);
  }
}
