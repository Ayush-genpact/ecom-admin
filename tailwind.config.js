/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "rgb(87, 13, 72)",
        greyish: "rgb(139, 139, 163)",
        borderish: "rgb(234, 234, 242)",
        tags: "rgb(248,248,255)",
        tagtext: "rgb(97, 97, 115)",
      },
    },
  },
  plugins: [],
};
