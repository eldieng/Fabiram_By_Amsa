import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6B8E23",
          light: "#8DB600",
          dark: "#556B2F",
          50: "#f4f7ec",
        },
        secondary: {
          DEFAULT: "#8B5E3C",
          light: "#A67B5B",
          dark: "#6B4226",
        },
        accent: {
          DEFAULT: "#E8A838",
          light: "#F0C060",
          dark: "#C88C20",
        },
        olive: {
          DEFAULT: "#4A6741",
          light: "#5C8A50",
          dark: "#3A5232",
        },
        cream: {
          DEFAULT: "#FBF7F0",
          dark: "#F0E8D8",
        },
        sand: "#F5EDE0",
        bark: "#3E2723",
        leaf: "#7CB342",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        body: ["var(--font-geist-sans)", "Arial", "sans-serif"],
      },
      borderRadius: {
        organic: "63% 37% 54% 46% / 55% 48% 52% 45%",
      },
    },
  },
  plugins: [],
};
export default config;
