import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue,scss}", // This covers all relevant files inside the src directory
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use daisyui as an ES6 module
};
