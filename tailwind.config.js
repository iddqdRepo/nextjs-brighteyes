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
      colors: {
        brand: {
          DEFAULT: "#8b3479",
          dark: "#6e2960",
          deep: "#571f4c",
          light: "#b05a9d",
          50: "#faf3f8",
          100: "#f4e3ef",
          200: "#e8c7de",
        },
        cream: {
          DEFAULT: "#fdf5e6",
          deep: "#fef4df",
        },
        night: "#181330",
      },
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
