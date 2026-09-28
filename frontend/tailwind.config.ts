import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            DEFAULT: "#F26B38",
            hover: "#e05926",
            light: "#ff8252",
            subtle: "rgba(242, 107, 56, 0.15)",
          },
          teal: {
            DEFAULT: "#0B8374",
            hover: "#097063",
            light: "#129e8d",
            dark: "#06574d",
            deep: "#032823",
            subtle: "rgba(11, 131, 116, 0.15)",
          },
          gray: {
            DEFAULT: "#CBE5DF",
            light: "#e2f2ef",
            muted: "#8caaa3",
            dark: "#14332e",
            border: "rgba(203, 229, 223, 0.22)",
          },
          dark: {
            bg: "#051715",
            card: "#092421",
            surface: "#0e312d",
          }
        },
      },
      boxShadow: {
        "glow-orange": "0 0 25px rgba(242, 107, 56, 0.35)",
        "glow-teal": "0 0 25px rgba(11, 131, 116, 0.35)",
        "card-glass": "0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(203, 229, 223, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
