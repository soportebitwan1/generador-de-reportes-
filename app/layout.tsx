// ============================================================
// LAYOUT PRINCIPAL DE LA APLICACIÓN
// ============================================================
// Este componente envuelve TODAS las páginas del sitio.
// Aquí definimos elementos que aparecen en todas las páginas:
// - Barra de navegación superior
// - Pie de página
// - Título y metadatos SEO
// - Carga de estilos globales
// ============================================================

import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

// ============================================================
// METADATOS DE LA PÁGINA (SEO)
// ============================================================
export const metadata: Metadata = {
  title: "Elección Personero Estudiantil",
  description: "Sistema oficial para la elección del personero estudiantil del colegio. Conoce a los candidatos, sus propuestas y ejerce tu derecho al voto.",
  keywords: ["votación", "personero", "estudiantil", "colegio", "elecciones"],
  authors: [{ name: "Comité Electoral Estudiantil" }],
};

// ============================================================
// COMPONENTE LAYOUT (se repite en todas las páginas)
// ============================================================
/**
 * Layout raíz de toda la aplicación
 * @param children Contenido dinámico de cada página
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">

        {/* ============================================
           BARRA DE NAVEGACIÓN SUPERIOR
           Contiene el logo/título y menú principal
           ============================================ */}
        <header className="bg-primario shadow-lg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <nav className="flex flex-col md:flex-row justify-between items-center gap-3">
              
              {/* Logo / Título principal */}
              <Link href="/" className="text-white text-xl md:text-2xl font-bold hover:text-blue-200 transition-colors">
                🗳️ Votación Personero
              </Link>

              {/* Menú de navegación */}
              <div className="flex gap-3 flex-wrap justify-center">
                <Link 
                  href="/" 
                  className="text-white px-4 py-2 rounded-lg hover:bg-white/15 transition-colors font-medium"
                >
                  📋 Candidatos
                </Link>
                <Link 
                  href="/votar" 
                  className="text-white px-4 py-2 rounded-lg bg-acento hover:bg-amber-500 transition-colors font-bold shadow-md"
                >
                  ✅ Votar
                </Link>
                <Link 
                  href="/resultados" 
                  className="text-white px-4 py-2 rounded-lg hover:bg-white/15 transition-colors font-medium"
                >
                  📊 Resultados
                </Link>
              </div>
            </nav>
          </div>
        </header>

        {/* ============================================
           CONTENIDO PRINCIPAL
           Aquí se renderiza cada página según la ruta
           ============================================ */}
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            {children}
          </div>
        </main>

        {/* ============================================
           PIE DE PÁGINA
           ============================================ */}
        <footer className="bg-gray-800 text-gray-300 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center">
            <p className="font-bold text-white mb-2">
              🎓 Comité Electoral Estudiantil
            </p>
            <p className="text-sm opacity-90">
              Sistema de votación electrónica seguro y transparente
            </p>
            <p className="text-xs opacity-70 mt-4">
              Tu voto es secreto y solo se registrará una vez por estudiante
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
