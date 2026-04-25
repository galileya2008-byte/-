/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f9f5ef",
        milk: "#fffaf5",
        champagne: "#f4e9da",
        cocoa: "#52362b",
        espresso: "#37231b",
        fuchsiaSoft: "#c45d88",
      },
      boxShadow: {
        premium: "0 18px 40px rgba(55, 35, 27, 0.12)",
      },
      borderRadius: {
        premium: "1.5rem",
      },
    },
  },
  plugins: [],
};
