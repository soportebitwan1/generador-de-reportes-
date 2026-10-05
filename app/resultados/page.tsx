"use client";
// ============================================================
// PÁGINA /resultados - VISUALIZACIÓN DE LA VOTACIÓN
// ============================================================
// Muestra el conteo actual de votos:
// - Estadísticas generales (total votos, actualización)
// - Ranking de candidatos con barras de progreso visuales
// - Porcentajes y cantidades por candidato
//
// Tiene un botón para actualizar los datos en tiempo real
// ============================================================

import { useState, useEffect } from "react";
import Link from "next/link";

// ============================================================
// TIPOS LOCALES PARA LOS RESULTADOS
// ============================================================
interface ResultadoCandidato {
  id: number;
  nombre: string;
  fotoUrl: string;
  slogan: string;
  votos: number;
  porcentaje: number;
}

interface DatosResultadosAPI {
  exitoso: boolean;
  resultados: ResultadoCandidato[];
  estadisticas: {
    totalVotosEmitidos: number;
    totalCandidatos: number;
    candidatoLider: {
      nombre: string;
      votos: number;
      porcentaje: number;
    } | null;
    ultimaActualizacion: string;
  };
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export default function PaginaResultados() {
  // -------------------
  // ESTADOS
  // -------------------
  const [resultados, setResultados] = useState<ResultadoCandidato[]>([]);
  const [estadisticas, setEstadisticas] = useState<DatosResultadosAPI["estadisticas"] | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string>("");

  // ============================================================
  // FUNCIÓN: Cargar/actualizar resultados desde la API
  // ============================================================
  async function cargarResultados() {
    setCargando(true);
    setError("");

    try {
      const respuesta = await fetch("/api/resultados");
      const datos: DatosResultadosAPI = await respuesta.json();

      if (datos.exitoso) {
        setResultados(datos.resultados);
        setEstadisticas(datos.estadisticas);
      } else {
        setError(datos.mensaje || "No se pudieron cargar los resultados.");
      }
    } catch (err) {
      setError("⚠️ No se pudo conectar con el servidor para obtener los resultados.");
      console.error("Error al cargar resultados:", err);
    } finally {
      setCargando(false);
    }
  }

  // -------------------
  // EFECTO: Carga inicial al entrar a la página
  // -------------------
  useEffect(() => {
    cargarResultados();
  }, []);

  // ============================================================
  // SUB-COMPONENTE: Tarjeta con estadísticas generales
  // ============================================================
  function TarjetasEstadisticas() {
    if (!estadisticas) return null;

    return (
      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {/* Tarjeta 1: Total votos */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-blue-100 text-sm uppercase font-semibold tracking-wide">
            🗳️ Total Votos Emitidos
          </p>
          <p className="text-4xl md:text-5xl font-extrabold mt-2">
            {estadisticas.totalVotosEmitidos}
          </p>
          <p className="text-blue-100 text-xs mt-2 opacity-90">
            Votos registrados en el sistema
          </p>
        </div>

        {/* Tarjeta 2: Candidato líder */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-green-100 text-sm uppercase font-semibold tracking-wide">
            🏆 Candidato en Liderazgo
          </p>
          <p className="text-xl md:text-2xl font-extrabold mt-2 truncate">
            {estadisticas.candidatoLider
              ? estadisticas.candidatoLider.nombre
              : "Aún sin votaciones"}
          </p>
          <p className="text-green-100 text-xs mt-2 opacity-90">
            {estadisticas.candidatoLider
              ? `${estadisticas.candidatoLider.votos} votos (${estadisticas.candidatoLider.porcentaje}%)`
              : "Esperando los primeros votos"}
          </p>
        </div>

        {/* Tarjeta 3: Última actualización */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 shadow-xl">
          <p className="text-amber-100 text-sm uppercase font-semibold tracking-wide">
            ⏰ Última Actualización
          </p>
          <p className="text-base md:text-lg font-bold mt-2">
            {estadisticas.ultimaActualizacion}
          </p>
          <button
            onClick={cargarResultados}
            disabled={cargando}
            className="mt-3 bg-white/25 hover:bg-white/35 px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {cargando ? "🔄 Actualizando..." : "🔄 Actualizar datos"}
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // SUB-COMPONENTE: Barra de progreso de cada candidato
  // ============================================================
  function BarraResultado({
    candidato,
    posicion,
    maxVotos,
  }: {
    candidato: ResultadoCandidato;
    posicion: number;
    maxVotos: number;
  }) {
    // Calculamos ancho relativo para la barra visual (vs el líder)
    const anchoRelativo = maxVotos > 0 ? (candidato.votos / maxVotos) * 100 : 0;

    // Medalla según la posición
    const medalla =
      posicion === 0 ? "🥇" : posicion === 1 ? "🥈" : posicion === 2 ? "🥉" : `#${posicion + 1}`;

    return (
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Foto */}
          <div className="flex-shrink-0 relative">
            <img
              src={candidato.fotoUrl}
              alt={candidato.nombre}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-100 object-cover shadow-md"
            />
            <span className="absolute -top-2 -right-2 text-2xl md:text-3xl">
              {medalla}
            </span>
          </div>

          {/* Datos y barra */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-bold text-gray-800 text-base md:text-lg truncate">
                {candidato.nombre}
              </h3>
              <span className="text-lg md:text-xl font-extrabold text-primario flex-shrink-0">
                {candidato.porcentaje}%
              </span>
            </div>
            <p className="text-xs md:text-sm text-amber-700 italic mb-3 truncate">
              &ldquo;{candidato.slogan}&rdquo;
            </p>

            {/* Barra visual */}
            <div className="h-6 md:h-8 bg-gray-100 rounded-full overflow-hidden relative shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 transition-all duration-700 ease-out"
                style={{ width: `${Math.max(anchoRelativo, candidato.votos > 0 ? 3 : 0)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-end pr-3">
                <span className="text-xs md:text-sm font-bold text-white drop-shadow-lg">
                  {candidato.votos} {candidato.votos === 1 ? "voto" : "votos"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <section className="text-center bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-blue-100">
        <div className="text-5xl md:text-6xl mb-3">📊</div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-primario">
          Resultados de la Votación
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Panel oficial con el conteo en tiempo real de los votos para Personero
          Estudiantil. La transparencia es fundamental para todos.
        </p>
      </section>

      {/* Tarjetas estadísticas */}
      {!cargando && !error && <TarjetasEstadisticas />}

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-xl text-center">
          {error}
          <button
            onClick={cargarResultados}
            className="ml-4 underline font-semibold"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Pantalla de carga */}
      {cargando && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
          <div className="text-5xl mb-4 animate-bounce">🔄</div>
          <p className="text-xl font-semibold text-gray-700">
            Cargando resultados oficiales...
          </p>
        </div>
      )}

      {/* Ranking de candidatos */}
      {!cargando && !error && resultados.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            🏅 Ranking de Candidatos
          </h2>
          <div className="space-y-4">
            {resultados.map((c, idx) => (
              <BarraResultado
                key={c.id}
                candidato={c}
                posicion={idx}
                maxVotos={resultados[0].votos || 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Caso: No hay votos aún */}
      {!cargando && !error && resultados.length > 0 && estadisticas?.totalVotosEmitidos === 0 && (
        <div className="bg-amber-50 rounded-2xl p-8 md:p-10 border-2 border-amber-200 text-center">
          <div className="text-5xl mb-3">🗳️</div>
          <h3 className="text-xl font-bold text-amber-800 mb-2">
            Aún no se han registrado votos
          </h3>
          <p className="text-amber-700 mb-5 max-w-md mx-auto">
            ¡Sé el primero en ejercer tu derecho al voto! Invita a tus compañeros
            a participar en esta elección estudiantil.
          </p>
          <Link href="/votar" className="btn-primario inline-block">
            ⚡ Ser el primero en votar
          </Link>
        </div>
      )}

      {/* Botones de navegación finales */}
      {!cargando && !error && (
        <section className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/votar" className="btn-acento text-center">
            ✅ Votar
          </Link>
          <Link href="/" className="btn-primario text-center">
            📋 Ver candidatos
          </Link>
        </section>
      )}
    </div>
  );
}
