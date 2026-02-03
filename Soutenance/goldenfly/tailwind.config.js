/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          gold: {
            50: '#FFFEF5',
            100: '#FFFAEB',
            200: '#FFF4CC',
            300: '#FFEDAD',
            400: '#FFE06F',
            500: '#DFB717',
            600: '#C9A615',
            700: '#B39513',
            800: '#8C7510',
            900: '#665509',
          },
          white: '#FFFFFF',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }