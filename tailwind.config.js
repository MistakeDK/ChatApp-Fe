// tailwind.config.js
const { heroui } = require("@heroui/react");
const theme = require("./src/config/theme.ts");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [heroui(theme)],
};
