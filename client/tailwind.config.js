/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#161617",
        "secondary": "#000000",
        "main": "#F5F5F7",
        "sub": "#86868B",
        "title": "#2997FF"
      },
    },
  },
  plugins: [],
}