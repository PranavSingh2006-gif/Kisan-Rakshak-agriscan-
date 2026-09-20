/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f3',
          100: '#e2f4e5',
          200: '#c5e8cc',
          300: '#97d6a3',
          400: '#5ebb73',
          500: '#349f4e',
          600: '#257038',
          700: '#206332',
          800: '#1d4e2a',
          900: '#184124',
          950: '#0c2413',
        },
        slateDark: '#12251a',
        sandLight: '#fbfcf8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 15px 45px -10px rgba(22, 60, 32, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'phone': '0 25px 50px -12px rgba(15, 45, 25, 0.35)',
      }
    },
  },
  plugins: [],
}

