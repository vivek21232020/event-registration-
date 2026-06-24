/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E',
          dark: '#16A34A',
          light: '#86EFAC',
          glow: 'rgba(34, 197, 94, 0.4)',
        },
        slate: {
          850: '#1E293B',
          950: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 8s infinite',
        'pulse-glow': 'pulse-glow 3s infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.95)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.05)',
          },
        }
      }
    },
  },
  plugins: [],
}
