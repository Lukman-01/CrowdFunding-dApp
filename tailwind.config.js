/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./containers/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'exo': [ 'Exo', 'sans-serif', "ui-monospace, Menlo", "Monaco", 'Cascadia Mono', 'Segoe UI Mono']
      },
      colors: {
        primaryText: "#303c3d",
        secondary: "#3bd4e1",
        secondaryLight: "#E8FCFE"
      }
    },
  },
  plugins: [],
}
