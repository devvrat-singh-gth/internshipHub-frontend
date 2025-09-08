/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables dark mode via "class" strategy
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // scan all source files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0d9488", // teal-600
          dark: "#0f766e", // teal-700
        },
        secondary: {
          DEFAULT: "#2563eb", // blue-600
          dark: "#1d4ed8", // blue-700
        },
        background: {
          light: "#ffffff",
          dark: "#111827",
        },
        surface: {
          light: "#f9fafb",
          dark: "#1f2937",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
