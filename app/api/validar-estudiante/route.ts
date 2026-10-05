// ============================================================
// RUTA API: POST /api/validar-estudiante
// ============================================================
// Verifica que un número de documento corresponda a un
// estudiante registrado y que NO haya votado aún.
// Se usa en la página de votación para autorizar el acceso
// al formulario de selección de candidato.
// ============================================================

import { NextResponse } from "next/server";
import { buscarEstudiantePorDocumento } from "@/data/estudiantes";
import { estudianteYaVoto } from "@/lib/almacenamiento";

// ============================================================
// FUNCIÓN: POST - Validar documento de estudiante
// ============================================================
export async function POST(request: Request) {
  try {
    // Leemos el documento enviado por el cliente
    const body = await request.json();
    const documento: string = body?.documento?.trim() || "";

    // Validación básica: que el documento no esté vacío
    if (!documento) {
      return NextResponse.json(
        {
          valido: false,
          mensaje: "Por favor ingresa tu número de documento de identidad.",
        },
        { status: 400 }
      );
    }

    // ---- Paso 1: Buscar el estudiante en la lista oficial ----
    const estudiante = buscarEstudiantePorDocumento(documento);
    if (!estudiante) {
      return NextResponse.json({
        valido: false,
        mensaje:
          "⚠️ Documento NO encontrado. Este número no está registrado en la base de datos de estudiantes matriculados. Por favor verifica el número e intenta de nuevo. (Solo los estudiantes de la lista oficial pueden votar)",
      });
    }

    // ---- Paso 2: Verificar si ya votó ----
    const yaVoto = estudianteYaVoto(documento);
    if (yaVoto) {
      return NextResponse.json({
        valido: false,
        mensaje: `⚠️ El estudiante <strong>${estudiante.nombre}</strong> (${estudiante.grado} - ${estudiante.curso}) <strong>ya ha votado anteriormente</strong>. Recuerda que solo puedes ejercer tu derecho al voto UNA VEZ.`,
      });
    }

    // ---- Todo está OK: autorizamos el acceso ----
    return NextResponse.json({
      valido: true,
      mensaje: "Identidad verificada exitosamente. Ahora puedes elegir a tu candidato.",
      datosEstudiante: {
        nombre: estudiante.nombre,
        grado: estudiante.grado,
        curso: estudiante.curso,
      },
    });

  } catch (error) {
    console.error("Error en /api/validar-estudiante:", error);
    return NextResponse.json(
      {
        valido: false,
        mensaje: "Ocurrió un error interno al validar tu documento. Intenta nuevamente.",
      },
      { status: 500 }
    );
  }
}
