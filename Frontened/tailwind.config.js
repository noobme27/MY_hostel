import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This covers all relevant files inside the src directory

    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use daisyui as an ES6 module
};
