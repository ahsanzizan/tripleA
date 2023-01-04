/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.ejs', './views/templates/*.ejs'],
  theme: {
    container: {
      center: true,
      padding: '24px',
    },
    extend: {
      colors: {
        prim: '#240090'
      }
    },
  },
  plugins: [],
}
