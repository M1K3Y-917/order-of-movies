/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,css}"],
  theme: {
    fontFamily: {
      sans: ["Inter Tight", "Instrument Sans", "sans-serif"],
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#aa00ff",

          secondary: "#00e55b",

          accent: "#91a7ff",

          neutral: "#343a40",

          "base-100": "#fffaff",

          info: "#00e7ff",

          success: "#008420",

          warning: "#9d7a00",

          error: "#cb0f4b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
