/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2ff',
          100: '#e0e7ff',
          700: '#1e2a5a',
          800: '#16224a',
          900: '#0b1533',
          950: '#070f26',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(11, 21, 51, 0.08)',
        'card-hover': '0 12px 32px rgba(11, 21, 51, 0.14)',
      },
    },
  },
  plugins: [],
}
