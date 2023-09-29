/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand : {
          900: '#0A2647',
          800: '#144272',
          700: '#205295',
          600: '#2C74B3',
        }
      }
    },
  },
  plugins: [],
}