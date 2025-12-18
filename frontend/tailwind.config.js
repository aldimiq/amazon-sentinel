/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sentinel: {
          900: '#0f172a', // Slate 900
          800: '#1e293b', // Slate 800
          500: '#10b981', // Emerald 500 (Primary)
          400: '#34d399', // Emerald 400
          accent: '#06b6d4', // Cyan 500
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
