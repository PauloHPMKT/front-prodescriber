/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FF6363",
        secondary: {
          100: "#F9F8F9",
          200: "#e7e6e8",
        },
        "dark-1000": "#121212",
        "gray-1000": "#0C090A",
      },
      borderColor: {
        "gray-1050": "#1B1819",
      },
      colors: {
        "gray-1050": "#1B1819",
      },
    },
  },
  plugins: [],
};
