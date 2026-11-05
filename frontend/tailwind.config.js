/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberdark: "#0f0f1e",
        cyberblue: "#00d4ff",
        cyberpurple: "#b700ff",
      }
    },
  },
  plugins: [],
}