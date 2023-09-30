
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderSpacing: {
        '13': '3.25rem',
      },
    }
  },
  plugins: [
    'tailwindcss',
    'autoprefixer',
    require('@tailwindcss/forms')({
      strategy: 'base', // only generate global styles
      strategy: 'class',
      
    })
  ],
}