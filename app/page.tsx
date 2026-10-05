// ============================================================
// PÁGINA PRINCIPAL (HOME)
// ============================================================
// Muestra la información de los 3 candidatos a personero
// estudiantil con sus propuestas detalladas
// Página accesible públicamente para todos los estudiantes
// ============================================================

import { candidatos } from "@/data/candidatos";
import Link from "next/link";
import type { Candidato, Propuesta } from "@/types";

// ============================================================
// SUB-COMPONENTE: Tarjeta individual de candidato
// ============================================================
/**
 * Tarjeta con toda la información de un candidato
 * Incluye foto, nombre, grado, slogan y propuestas
 */
function TarjetaCandidato({ candidato }: { candidato: Candidato }) {
  return (
    <article className="card-candidato flex flex-col">
      
      {/* --- Sección superior: Foto y datos básicos --- */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center text-white">
        <img
          src={candidato.fotoUrl}
          alt={`Foto de ${candidato.nombre}`}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
        />
        <h3 className="text-xl md:text-2xl font-bold">
          {candidato.nombre}
        </h3>
        <p className="opacity-90 mt-1">
          {candidato.grado} - Grupo {candidato.curso}
        </p>
      </div>

      {/* --- Eslogan del candidato --- */}
      <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
        <p className="text-center font-semibold text-amber-900 italic">
          &ldquo;{candidato.slogan}&rdquo;
        </p>
      </div>

      {/* --- Lista de propuestas --- */}
      <div className="p-6 flex-grow">
        <h4 className="font-bold text-primario mb-4 text-lg">
          📌 Propuestas de campaña:
        </h4>
        <ul className="space-y-4">
          {candidato.propuestas.map((prop: Propuesta, idx: number) => (
            <li key={idx} className="border-l-4 border-secundario pl-4 py-1">
              <h5 className="font-semibold text-gray-800">
                {prop.categoria}
              </h5>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {prop.descripcion}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ============================================================
// COMPONENTE PRINCIPAL DE LA PÁGINA
// ============================================================
/**
 * Página Home - Lista los 3 candidatos
 * Server Component (no tiene interactividad, solo muestra datos)
 */
export default function PaginaInicio() {
  return (
    <div className="space-y-10">

      {/* ============================================
         SECCIÓN: Encabezado de bienvenida
         ============================================ */}
      <section className="text-center space-y-4 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-blue-100">
        <div className="inline-block text-5xl md:text-6xl mb-2">🗳️</div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primario">
          Elecciones de Personero Estudiantil
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Bienvenido al sistema oficial de votación. Aquí conocerás a los 
          <strong className="text-primario"> 3 candidatos de grado 11° </strong> 
          y sus propuestas para mejorar nuestro colegio. ¡Lee con atención y elige sabiamente!
        </p>

        {/* Botón de acción para ir a votar */}
        <div className="pt-4">
          <Link href="/votar" className="btn-primario inline-block text-lg shadow-xl hover:shadow-2xl">
            🚀 Ir a Votar Ahora
          </Link>
        </div>

        {/* Información útil */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm md:text-base">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <span className="text-2xl block mb-2">📋</span>
            <p className="font-semibold text-gray-800">Conoce los candidatos</p>
            <p className="text-gray-600 mt-1">Revisa sus propuestas</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <span className="text-2xl block mb-2">✅</span>
            <p className="font-semibold text-gray-800">Vota de forma segura</p>
            <p className="text-gray-600 mt-1">Un voto por estudiante</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <span className="text-2xl block mb-2">📊</span>
            <p className="font-semibold text-gray-800">Consulta resultados</p>
            <p className="text-gray-600 mt-1">Totalmente transparente</p>
          </div>
        </div>
      </section>

      {/* ============================================
         SECCIÓN: Listado de Candidatos
         ============================================ */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          👥 Conoce a los Candidatos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {candidatos.map((candidato) => (
            <TarjetaCandidato key={candidato.id} candidato={candidato} />
          ))}
        </div>
      </section>

      {/* ============================================
         SECCIÓN: Recordatorio para votar
         ============================================ */}
      <section className="bg-gradient-to-r from-primario to-blue-700 rounded-3xl p-8 md:p-10 text-center text-white shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          ¿Ya te decidiste?
        </h2>
        <p className="text-lg md:text-xl mb-6 opacity-95 max-w-2xl mx-auto">
          Para votar necesitarás tu <strong>número de documento de identidad</strong>.
          Recuerda que solo puedes votar UNA VEZ y tu elección es secreta.
        </p>
        <Link
          href="/votar"
          className="bg-white text-primario font-bold py-4 px-8 rounded-xl text-lg
                     hover:bg-gray-100 inline-block transition-all duration-300
                     shadow-xl hover:shadow-2xl hover:scale-105"
        >
          ⚡ Ejercir mi derecho al voto
        </Link>
      </section>
    </div>
  );
}
