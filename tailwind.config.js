/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    
    extend: {
      colors: {
        'blue-1000': '#001338',
        'semi-blacky': '#080808'
      }
    },
  },
  plugins: [],
}
