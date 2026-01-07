/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./store/**/*.{js,ts}",
    "./hooks/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        /* Theme tokens mapped to CSS variables */
        primary: "var(--color-primary)",
        primaryText: "var(--color-primary-text)",

        bg: "var(--color-bg)",
        text: "var(--color-text)",

        border: "var(--color-border)",
        placeholder: "var(--color-placeholder)",

        stepBg: "var(--color-step-bg)",
        stepFill: "var(--color-step-fill)",

        headerBg: "var(--header-bg)",
        headerText: "var(--header-text)",
      },
      fontFamily: {
        primary: ["Work Sans", "sans-serif"],
        secondary: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "5px",
        lg: "8px",
      },
      height: {
        input: "48px",
        button: "48px",
      },
    },
  },
  plugins: [],
};
