/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2332',
          light: '#243044',
          50: '#f0f2f5',
          100: '#d8dde5',
          200: '#b1baca',
          300: '#8a97b0',
          400: '#637495',
          500: '#3c517b',
          600: '#2d3d5c',
          700: '#1e293d',
          800: '#1a2332',
          900: '#111827',
        },
        cream: {
          DEFAULT: '#f8f7f5',
          50: '#fafaf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      maxWidth: {
        quiz: '700px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'card-hover': '0 2px 6px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
      },
      borderRadius: {
        card: '16px',
        option: '12px',
      },
    },
  },
  plugins: [],
}
