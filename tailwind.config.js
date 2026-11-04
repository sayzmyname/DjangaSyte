/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F3F7FC',
          100: '#E6EEF8',
          500: '#3370B5',
          600: '#245A9A',
          700: '#1A4278',
          800: '#12305A',
          900: '#0B1F3A',
        },
        accent: {
          50: '#FFF7ED',
          400: '#FB923C',
          500: '#F97316',
          600: '#C2410C',
          700: '#9A3412',
        },
      },
    },
  },
  plugins: [],
};
