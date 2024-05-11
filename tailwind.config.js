/** @type {import('tailwindcss').Config} */

const colors = require('./src/Colors.js');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {...colors},
      fontFamily: 'Segoe UI',
      width: {
        'fill-available': '-webkit-fill-available',
      },
    },
  },
  plugins: [],
}

