"use client";
// ============================================================
// PÁGINA /votar - FORMULARIO DE VOTACIÓN
// ============================================================
// Esta es la página más importante del sistema, con 2 pasos:
//   PASO 1: El estudiante ingresa su documento y se valida
//           que esté registrado y no haya votado.
//   PASO 2: Si es válido, selecciona el candidato y confirma.
//
// Es un Client Component (por eso "use client") porque tiene
// estado del formulario, validaciones en tiempo real e
// interacción con el usuario mediante botones y alertas.
// ============================================================

import { useState } from "react";
import { candidatos } from "@/data/candidatos";
import Link from "next/link";
import type { Candidato } from "@/types";

// ============================================================
// TIPOS LOCALES PARA MANEJO DE DATOS DE LA PÁGINA
// ============================================================
interface InfoEstudiante {
  nombre: string;
  grado: string;
  curso: string;
}

// ============================================================
// COMPONENTE PRINCIPAL DE LA PÁGINA DE VOTACIÓN
// ============================================================
export default function PaginaVotar() {
  // -------------------
  // ESTADOS DE LA PÁGINA
  // -------------------
  // Paso actual del formulario: 1 = Verificar documento, 2 = Elegir candidato
  const [paso, setPaso] = useState<1 | 2>(1);

  // Valor del input del documento (PASO 1)
  const [documento, setDocumento] = useState("");

  // Almacena la info del estudiante cuando se valida correctamente
  const [estudiante, setEstudiante] = useState<InfoEstudiante | null>(null);

  // ID del candidato seleccionado (PASO 2)
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState<number | null>(null);

  // Estado de carga (mientras espera respuesta del servidor)
  const [cargando, setCargando] = useState(false);

  // Mensaje de error para mostrar al usuario
  const [mensajeError, setMensajeError] = useState<string>("");

  // Bandera para indicar que el voto fue exitoso (mostrar pantalla final)
  const [votoExitoso, setVotoExitoso] = useState(false);

  // Datos de confirmación del voto (para la pantalla de éxito)
  const [confirmacion, setConfirmacion] = useState<{
    nombreEstudiante: string;
    nombreCandidato: string;
    hora: string;
  } | null>(null);

  // ============================================================
  // FUNCIÓN 1: Validar documento (PASO 1)
  // Llama a la API /api/validar-estudiante
  // ============================================================
  async function validarDocumento(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setMensajeError("");

    try {
      // Enviamos la petición a la API
      const respuesta = await fetch("/api/validar-estudiante", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documento }),
      });

      const datos = await respuesta.json();

      if (datos.valido) {
        // ✅ Validación exitosa, guardamos datos y pasamos al paso 2
        setEstudiante(datos.datosEstudiante);
        setPaso(2);
      } else {
        // ❌ Validación fallida, mostramos mensaje de error
        setMensajeError(datos.mensaje);
      }
    } catch (err) {
      setMensajeError("⚠️ No se pudo conectar con el servidor. Verifica la conexión e intenta de nuevo.");
      console.error("Error de red:", err);
    } finally {
      setCargando(false);
    }
  }

  // ============================================================
  // FUNCIÓN 2: Confirmar y registrar el voto (PASO 2)
  // Llama a la API /api/votar
  // ============================================================
  async function confirmarVoto() {
    if (candidatoSeleccionado === null) {
      setMensajeError("⚠️ Debes seleccionar un candidato antes de confirmar tu voto.");
      return;
    }

    // Pregunta de confirmación para evitar votos accidentales
    const quiereConfirmar = window.confirm(
      "⚠️ ¡Atención!\n\n¿Estás SEGURO/A de tu elección?\nUna vez confirmado el voto, NO SE PODRÁ MODIFICAR."
    );
    if (!quiereConfirmar) return;

    setCargando(true);
    setMensajeError("");

    try {
      // Enviamos el voto a la API
      const respuesta = await fetch("/api/votar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentoEstudiante: documento,
          candidatoId: candidatoSeleccionado,
        }),
      });

      const datos = await respuesta.json();

      if (datos.exitoso) {
        // ✅ Voto registrado correctamente
        setVotoExitoso(true);
        setConfirmacion(datos.datos);
      } else {
        // ❌ Error al guardar
        setMensajeError(datos.mensaje);
        // Si ya votó, regresamos al paso 1
        if (respuesta.status === 403) {
          setTimeout(() => {
            setPaso(1);
            setDocumento("");
            setCandidatoSeleccionado(null);
          }, 3000);
        }
      }
    } catch (err) {
      setMensajeError("⚠️ No se pudo conectar con el servidor. Verifica la conexión.");
      console.error("Error:", err);
    } finally {
      setCargando(false);
    }
  }

  // ============================================================
  // FUNCIÓN 3: Volver al paso 1 (cancelar antes de votar)
  // ============================================================
  function volverAInicio() {
    setPaso(1);
    setDocumento("");
    setEstudiante(null);
    setCandidatoSeleccionado(null);
    setMensajeError("");
  }

  // ============================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================

  // ---- PANTALLA ESPECIAL: Voto exitoso ----
  if (votoExitoso && confirmacion) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-4 border-green-200">
          <div className="text-7xl md:text-8xl mb-4">✅</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-4">
            ¡Voto Registrado Exitosamente!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Muchas gracias por participar en la elección del personero estudiantil.
            Tu voto es secreto y ha sido registrado correctamente.
          </p>

          {/* Tarjeta de confirmación */}
          <div className="bg-green-50 rounded-2xl p-6 mb-8 border-2 border-green-200 text-left max-w-md mx-auto">
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Estudiante:</strong> {confirmacion.nombreEstudiante}
              </p>
              <p className="text-gray-700">
                <strong>Candidato elegido:</strong>{" "}
                <span className="font-bold text-primario">
                  {confirmacion.nombreCandidato}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Fecha y hora:</strong> {confirmacion.hora}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resultados" className="btn-secundario">
              📊 Ver Resultados Parciales
            </Link>
            <Link href="/" className="btn-primario">
              🏠 Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- PANTALLA NORMAL: Pasos 1 o 2 ----
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Encabezado */}
      <section className="text-center bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
        <div className="text-5xl mb-3">🗳️</div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-primario">
          Zona de Votación Oficial
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Paso {paso} de 2 -{" "}
          {paso === 1
            ? "Verifica tu identidad para acceder a la boleta"
            : "Selecciona el candidato de tu preferencia"}
        </p>
        {/* Barra de progreso */}
        <div className="max-w-md mx-auto mt-5 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primario to-secundario transition-all duration-500"
            style={{ width: paso === 1 ? "50%" : "100%" }}
          />
        </div>
      </section>

      {/* Mensaje de error global */}
      {mensajeError && (
        <div
          className="bg-red-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-xl"
          dangerouslySetInnerHTML={{ __html: mensajeError }}
        />
      )}

      {/* ================================================
         PASO 1: Verificación de documento de identidad
         ================================================ */}
      {paso === 1 && (
        <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-blue-100">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
            🔐 Paso 1: Verifica tu identidad
          </h2>
          <p className="text-gray-600 mb-6">
            Ingresa tu <strong>número de documento de identidad</strong> (cédula o
            tarjeta de identidad). Solo los estudiantes oficialmente matriculados
            podrán votar.
          </p>

          <form onSubmit={validarDocumento} className="space-y-5 max-w-xl mx-auto">
            <div>
              <label
                htmlFor="documento"
                className="block text-sm md:text-base font-semibold text-gray-700 mb-2"
              >
                📋 Número de documento de identidad
              </label>
              <input
                id="documento"
                type="text"
                inputMode="numeric"
                value={documento}
                onChange={(e) => {
                  // Permitimos solo números y borramos espacios
                  const soloNumeros = e.target.value.replace(/\D/g, "");
                  setDocumento(soloNumeros);
                  setMensajeError("");
                }}
                placeholder="Ejemplo: 1001001001"
                className="input-formulario tracking-wider"
                maxLength={15}
                autoFocus
                disabled={cargando}
              />
              <p className="text-xs md:text-sm text-gray-500 mt-2">
                💡 <strong>Prueba con los documentos:</strong> 1001001001, 1001002001, 1001003001
              </p>
            </div>

            <button
              type="submit"
              className="btn-primario w-full text-lg shadow-lg"
              disabled={cargando || documento.length < 5}
            >
              {cargando ? "🔄 Verificando..." : "➡️ Continuar al voto"}
            </button>
          </form>

          {/* Aviso de privacidad */}
          <div className="mt-8 text-sm text-gray-500 text-center max-w-lg mx-auto border-t pt-5">
            🔒 Tu información está protegida. El sistema solo verifica que tu documento
            exista y que no hayas votado antes. No compartimos tu información personal.
          </div>
        </section>
      )}

      {/* ================================================
         PASO 2: Selección de candidato y confirmación
         ================================================ */}
      {paso === 2 && estudiante && (
        <section className="space-y-6">
          {/* Tarjeta del estudiante verificado */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 md:p-6 border-2 border-green-200 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs uppercase text-green-700 font-bold tracking-wide">
                  ✅ Identidad verificada
                </p>
                <p className="text-xl font-bold text-gray-800 mt-1">
                  {estudiante.nombre}
                </p>
                <p className="text-gray-600">
                  {estudiante.grado} - Grupo {estudiante.curso}
                </p>
              </div>
              <button
                onClick={volverAInicio}
                className="text-sm bg-white border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ↩️ Cancelar
              </button>
            </div>
          </div>

          {/* Listado de candidatos para seleccionar */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
              🗳️ Paso 2: Selecciona a tu candidato
            </h2>
            <p className="text-gray-600 mb-6">
              Haz <strong>clic</strong> en el candidato de tu preferencia. Luego,
              presiona el botón <strong>&ldquo;Confirmar mi voto&rdquo;</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {candidatos.map((c: Candidato) => {
                const seleccionado = candidatoSeleccionado === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCandidatoSeleccionado(c.id);
                      setMensajeError("");
                    }}
                    className={`text-left rounded-2xl p-5 border-4 transition-all duration-300 ${
                      seleccionado
                        ? "border-primario bg-blue-50 shadow-xl scale-[1.02]"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
                    }`}
                  >
                    {/* Check de seleccionado */}
                    <div className="flex justify-end mb-2 h-6">
                      {seleccionado && (
                        <span className="inline-block bg-primario text-white rounded-full w-7 h-7 flex items-center justify-center font-bold shadow">
                          ✓
                        </span>
                      )}
                    </div>
                    {/* Foto */}
                    <img
                      src={c.fotoUrl}
                      alt={c.nombre}
                      className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-100 object-cover"
                    />
                    {/* Nombre */}
                    <h3
                      className={`font-bold text-center ${
                        seleccionado ? "text-primario" : "text-gray-800"
                      }`}
                    >
                      {c.nombre}
                    </h3>
                    <p className="text-xs text-center text-gray-500 mt-1">
                      {c.grado} - {c.curso}
                    </p>
                    {/* Slogan */}
                    <p className="text-xs md:text-sm italic text-amber-700 text-center mt-3 bg-amber-50 p-2 rounded-lg border border-amber-100">
                      &ldquo;{c.slogan}&rdquo;
                    </p>
                    {/* Resumen de propuestas */}
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-1">
                      <p className="text-xs font-semibold text-gray-600 mb-1">
                        📌 Propuestas:
                      </p>
                      {c.propuestas.map((p, idx) => (
                        <p key={idx} className="text-xs text-gray-500">
                          • <strong>{p.categoria}</strong>
                        </p>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Botón de confirmación del voto */}
            <div className="mt-10 pt-6 border-t-2 border-gray-100">
              <button
                onClick={confirmarVoto}
                className="btn-secundario w-full md:w-auto md:min-w-[350px] md:mx-auto block text-lg shadow-xl disabled:opacity-60"
                disabled={cargando || candidatoSeleccionado === null}
              >
                {cargando
                  ? "🔄 Registrando voto..."
                  : "✅ Confirmar mi voto (definitivo)"}
              </button>
              <p className="text-center text-sm text-red-600 mt-4 font-medium">
                ⚠️ Recuerda: Tu voto es definitivo y no se puede modificar una vez confirmado.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
