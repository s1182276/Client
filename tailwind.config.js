/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}","./public/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        theme_background: "#EBDDD4",
        theme_title: "#1B3B46",
        theme_second: "#B6BAC3",
        theme_text: "#000000",
      }
    },
  },
  plugins: [],
}