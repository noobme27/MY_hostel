import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "/Users/apoorvnathtripathi/Desktop/MY hostel/Frontened/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use daisyui as an ES6 module
};
