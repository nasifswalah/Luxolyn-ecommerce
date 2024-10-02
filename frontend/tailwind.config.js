/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'scrollbar-thumb': '#292929',
        'scrollbar-track': '#292929',
      },
    },
  },
  plugins: [
  ],
}
