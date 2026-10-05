// ============================================================
// RUTA API: POST /api/votar
// ============================================================
// Recibe un voto enviado desde el formulario de la página /votar
// Realiza las validaciones y lo guarda en el almacenamiento JSON
// Devuelve un mensaje de éxito o error al cliente
// ============================================================

import { NextResponse } from "next/server";
import { Voto } from "@/types";
import { guardarVoto, estudianteYaVoto } from "@/lib/almacenamiento";
import { buscarEstudiantePorDocumento } from "@/data/estudiantes";
import { buscarCandidatoPorId } from "@/data/candidatos";

// ============================================================
// FUNCIÓN: POST - Registra un nuevo voto
// ============================================================
/**
 * Endpoint que recibe los datos del voto desde el frontend
 * Body esperado: { documentoEstudiante, candidatoId }
 */
export async function POST(request: Request) {
  try {
    // -------- Paso 1: Leer y parsear los datos del cuerpo --------
    const body = await request.json();
    const documento: string = body?.documentoEstudiante?.trim() || "";
    const candidatoId: number = Number(body?.candidatoId);

    // -------- Paso 2: Validar que los datos estén completos --------
    if (!documento || !candidatoId) {
      return NextResponse.json(
        {
          exitoso: false,
          mensaje: "Faltan datos requeridos: documento de identidad y candidato",
        },
        { status: 400 } // Bad Request
      );
    }

    // -------- Paso 3: Validar que el estudiante EXISTA en el registro oficial --------
    const estudiante = buscarEstudiantePorDocumento(documento);
    if (!estudiante) {
      return NextResponse.json(
        {
          exitoso: false,
          mensaje: "El número de documento NO se encuentra en la lista oficial de estudiantes matriculados. Por favor verifica el número e intenta de nuevo.",
        },
        { status: 401 } // Unauthorized
      );
    }

    // -------- Paso 4: Validar que el estudiante NO haya votado antes --------
    if (estudianteYaVoto(documento)) {
      return NextResponse.json(
        {
          exitoso: false,
          mensaje: `El estudiante ${estudiante.nombre} ya ha ejercido su derecho al voto. Cada estudiante puede votar SOLO UNA VEZ.`,
        },
        { status: 403 } // Forbidden
      );
    }

    // -------- Paso 5: Validar que el candidato exista en la lista oficial --------
    const candidato = buscarCandidatoPorId(candidatoId);
    if (!candidato) {
      return NextResponse.json(
        {
          exitoso: false,
          mensaje: "El candidato seleccionado no es válido. Intenta de nuevo.",
        },
        { status: 400 }
      );
    }

    // -------- Paso 6: Construir el objeto Voto --------
    const nuevoVoto: Voto = {
      documentoEstudiante: documento,
      candidatoId: candidatoId,
      fecha: new Date().toISOString(), // Fecha y hora actual
    };

    // -------- Paso 7: Guardar el voto en el archivo --------
    const resultado = guardarVoto(nuevoVoto);

    // -------- Paso 8: Responder al cliente con el resultado --------
    return NextResponse.json({
      exitoso: resultado.exitoso,
      mensaje: resultado.mensaje,
      // Si fue exitoso, enviamos info extra para confirmación (NO enviamos el voto en sí por privacidad)
      datos: resultado.exitoso
        ? {
            nombreEstudiante: estudiante.nombre,
            nombreCandidato: candidato.nombre,
            hora: new Date(nuevoVoto.fecha).toLocaleString("es-CO"),
          }
        : null,
    });

  } catch (error) {
    // Manejo de errores inesperados
    console.error("Error en la ruta /api/votar:", error);
    return NextResponse.json(
      {
        exitoso: false,
        mensaje: "Ocurrió un error interno en el servidor. Por favor intenta nuevamente.",
      },
      { status: 500 } // Internal Server Error
    );
  }
}
