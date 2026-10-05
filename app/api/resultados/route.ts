// ============================================================
// RUTA API: GET /api/resultados
// ============================================================
// Devuelve el conteo actualizado de votos por cada candidato
// y datos estadísticos generales de la votación
// Es una API pública para mostrar los resultados en la página
// ============================================================

import { NextResponse } from "next/server";
import {
  contarVotosPorCandidato,
  totalVotosEmitidos,
  leerTodosLosVotos,
} from "@/lib/almacenamiento";
import { candidatos } from "@/data/candidatos";
import { Candidato } from "@/types";

// ============================================================
// FUNCIÓN: GET - Obtener resultados de la votación
// ============================================================
export async function GET() {
  try {
    // Obtenemos el conteo bruto de votos por candidato
    const conteo = contarVotosPorCandidato();
    const totalVotos = totalVotosEmitidos();
    const todosLosVotos = leerTodosLosVotos();

    // -------- Construimos el array detallado con info de cada candidato --------
    const resultadosPorCandidato = candidatos.map((c: Candidato) => {
      const votosRecibidos = conteo[c.id] || 0;
      // Calculamos el porcentaje (evitamos división por 0)
      const porcentaje =
        totalVotos > 0
          ? Number(((votosRecibidos / totalVotos) * 100).toFixed(1))
          : 0;

      return {
        id: c.id,
        nombre: c.nombre,
        fotoUrl: c.fotoUrl,
        slogan: c.slogan,
        votos: votosRecibidos,
        porcentaje: porcentaje,
      };
    });

    // Ordenamos la lista de mayor a menor cantidad de votos
    resultadosPorCandidato.sort((a, b) => b.votos - a.votos);

    // -------- Datos estadísticos generales --------
    const estadisticas = {
      totalVotosEmitidos: totalVotos,
      totalCandidatos: candidatos.length,
      // Determinamos quién va ganando en este momento (si hay votos)
      candidatoLider:
        totalVotos > 0
          ? {
              nombre: resultadosPorCandidato[0].nombre,
              votos: resultadosPorCandidato[0].votos,
              porcentaje: resultadosPorCandidato[0].porcentaje,
            }
          : null,
      // Último voto registrado (si existe)
      ultimaActualizacion:
        todosLosVotos.length > 0
          ? new Date(
              todosLosVotos[todosLosVotos.length - 1].fecha
            ).toLocaleString("es-CO")
          : "Aún no se han registrado votos",
    };

    // -------- Devolvemos la respuesta JSON --------
    return NextResponse.json({
      exitoso: true,
      resultados: resultadosPorCandidato,
      estadisticas,
    });

  } catch (error) {
    console.error("Error en /api/resultados:", error);
    return NextResponse.json(
      {
        exitoso: false,
        mensaje: "No se pudieron cargar los resultados en este momento.",
      },
      { status: 500 }
    );
  }
}
