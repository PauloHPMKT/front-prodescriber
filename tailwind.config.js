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
      },
    },
  },
  plugins: [],
};
