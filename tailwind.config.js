/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", //importante que no haya espacio entre las extensiones {js, jsx} asi NO, sino no se aplican los estilos.


  ],
  theme: {
    extend: {
      backgroundImage: {
        "header": "url('/bg.jpg')",
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.5'
          }
        }
      }
    },
  },
  plugins: [],
}

