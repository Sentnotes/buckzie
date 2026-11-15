/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a4f8',
          500: '#0e85ee',
          600: '#0267ce',
          700: '#0352a6',
          800: '#074688',
          900: '#0c3b70',
          950: '#082549',
        },
        navy: {
          900: '#071224',
          950: '#040b17'
        }
      },
      fontFamily: {
        sans: ['"Neue Haas Grotesk"', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        inktrap: ['"Whyte Inktrap"', '"Whyte Inktrap Medium"', '"ABC Whyte Inktrap"', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(14, 133, 238, 0.12)',
        'glass-hover': '0 12px 40px 0 rgba(14, 133, 238, 0.22)',
        'card-glow': '0 10px 30px -10px rgba(14, 133, 238, 0.15)',
        'elevated': '0 20px 45px -15px rgba(2, 44, 90, 0.12)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
