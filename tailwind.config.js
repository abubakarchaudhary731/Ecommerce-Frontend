/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#D23F57",
        secondary: "#2B3445",   
        gray: "#AEB4BE",   
        icon: "#7D879C",      
        backgroundColor: "#D8E0E9",
        link: "#EBEBED",
        whitee: "#FFFFFF",
        blackk: "#0E1530",
      },
    },
  },
  plugins: [],
};
