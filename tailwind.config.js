/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./adminComponents/**/*.{js,ts,jsx,tsx}",
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
        "card-vh": "65vh",
        100: "27rem",
        120: "36rem",
      },
      width: {
        100: "27rem",
        120: "36rem",
      },
    },
  },
  plugins: [],
};
