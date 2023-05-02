/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-red": "#FF424D",
        "light-gray": "#F2EFEF",
        "dark-gray": "#808080",
      },
    },
  },
  plugins: [],
};
