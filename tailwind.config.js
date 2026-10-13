/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        border: '#2a2a2a',
        primary: '#ffffff',
        muted: '#888888',
      }
    },
  },
  plugins: [],
}
