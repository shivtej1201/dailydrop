/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-200": "#2196F3", // Water drop blue
        "primary-100": "#64B5F6", // Lighter blue for hover/highlights

        "secondary-200": "#4CAF50", // Leaf green for eco/fresh feel
        "secondary-100": "#81C784", // Lighter green for backgrounds

        "accent-orange-200": "#FF9800", // Carrot / highlight orange
        "accent-orange-100": "#FFB74D", // Soft orange hover/background

        "accent-yellow-200": "#FFEB3B", // Banana / bright yellow
        "accent-yellow-100": "#FFF176", // Pale yellow for soft highlights

        "neutral-dark-200": "#333333", // Main dark text
        "neutral-dark-100": "#555555", // Lighter dark for subtext

        "neutral-light-200": "#F5F5F5", // Light gray backgrounds
        "neutral-light-100": "#FAFAFA", // Extra light background
      },
    },
  },
  plugins: [],
};
