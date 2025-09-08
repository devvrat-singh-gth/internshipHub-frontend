export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(252,252,249,1)", // --color-cream-50
        surface: "rgba(255,255,253,1)", // --color-cream-100
        primary: "rgba(33,128,141,1)", // --color-teal-500
        "primary-hover": "rgba(29,116,128,1)",
        "primary-active": "rgba(26,104,115,1)",
        secondary: "rgba(94,82,64,0.12)",
        border: "rgba(94,82,64,0.2)",
        error: "rgba(192,21,47,1)",
        success: "rgba(33,128,141,1)",
        warning: "rgba(168,75,47,1)",
        info: "rgba(98,108,113,1)",
      },
      fontFamily: {
        sans: ["FKGroteskNeue", "Inter", "sans-serif"],
        mono: ["Berkeley Mono", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        base: "8px",
        md: "10px",
        lg: "12px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.02)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
};
