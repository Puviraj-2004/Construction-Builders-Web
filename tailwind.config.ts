import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary-black) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal-black) / <alpha-value>)",
        gold: "rgb(var(--color-luxury-gold) / <alpha-value>)",
        cream: "rgb(var(--color-warm-cream) / <alpha-value>)",
        white: "rgb(var(--color-pure-white) / <alpha-value>)",
        grey: "rgb(var(--color-soft-grey) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        light: "rgb(var(--color-light-section) / <alpha-value>)",
        main: "rgb(var(--color-main-text) / <alpha-value>)",
        sub: "rgb(var(--color-sub-text) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgb(var(--color-primary-black) / 0.22)",
        gold: "0 18px 50px rgb(var(--color-luxury-gold) / 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
