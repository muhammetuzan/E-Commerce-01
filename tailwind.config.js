/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
        },
        colors: {
          'primary': '#23856D',
          'secondary': '#23A6F0',
          'dark-navy': '#252B42',
          'light-gray': '#737373',
          'light-bg': '#FAFAFA',
        },
      },
    },
    plugins: [],
  };
  