/** @type {import('tailwindcss').Config} */
// Configuración de Tailwind CSS para estilos
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados para la identidad del colegio
        primario: '#1e40af',
        secundario: '#059669',
        acento: '#d97706',
      },
    },
  },
  plugins: [],
}
