/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#F8FAFC",
        yellow: "#F5D565",
        peach: "#F5E8D5",
        orange: "#E9A23B",
        mint: "#A0ECB1",
        green: "#32D657",
        pink: "#F7D4D3",
        red: "#DD524C",
        lightGray: "#E3E8EF",
        grayBlue: "#97A3B6",
        blue: "#3662E3",
        darkGray: "#00000033",
      },
    },
  },
  plugins: [],
};
