/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans"],
        poppins: ["Poppins"],
        roboto: ["Roboto"],
      },
      height: {
        "85-vh": "85vh",
      },
    },
  },
  plugins: [],
};
