/** @type import('tailwindcss').Config */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.ts",
    "./resources/**/*.vue",
  ],
  safelist: ["dark"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("./resources/application/ui.plugin"),
  ],
};
