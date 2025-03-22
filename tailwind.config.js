/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rob': ["'Roboto','Arial', 'sans-serif'"],
        'robm': ["'Roboto Medium', Arial','sans-serif'"],
        'robb': ["'Roboto Bold',Arial','sans-serif'"],
      },
      screens:{
        xs:'320px',
        ys:'390px',
        zs:'1800px'
      }
    },
  },
  plugins: [],

}
