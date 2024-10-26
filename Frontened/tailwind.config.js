import daisyui from "daisyui";
const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}", // This covers all relevant files inside the src directory

    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use daisyui as an ES6 module
});
