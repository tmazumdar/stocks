/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
    "./**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["nord","dim"]
  }
}