/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Your Exact HTML Palette
        primary: {
          DEFAULT: "#d4af37", // Gold
          hover: "#f1c40f",   // Gold lighter
        },
        dark: {
          DEFAULT: "#020617", // Midnight
          lighter: "#0f172a", // Card/Sidebar BG
          slate: "#1e293b",   // Input BG
        },
        border: "rgba(212, 175, 55, 0.1)", // Gold-tinted borders
      },
      animation: {
        morph: "morph 8s ease-in-out infinite alternate",
        scroll: "scroll 20s linear infinite",
      },
      keyframes: {
        morph: {
          "0%": { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" },
          "100%": { borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
}