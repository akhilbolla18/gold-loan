/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./store/**/*.{js,ts}",
    "./hooks/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "476px", // Add custom breakpoint
        ...defaultTheme.screens, // Keep default breakpoints
      },
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

        labelText: "var(--label-text)",
        inputText: "var(--input-text)",
      },
      fontFamily: {
        primary: ["Work Sans", "sans-serif"],
        secondary: ["DM Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
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
