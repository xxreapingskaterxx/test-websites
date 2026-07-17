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
        navy: {
          DEFAULT: "#012C6A",
          50: "#EAF0FA",
          100: "#CBDAF0",
          400: "#1A4B94",
          600: "#012C6A",
          900: "#0B1D42",
          950: "#06122B",
        },
        steel: {
          DEFAULT: "#EEEEEE",
          50: "#F7F7F7",
          100: "#EEEEEE",
          200: "#E2E2E2",
        },
        ink: {
          DEFAULT: "#17181C",
          muted: "#6B6B6B",
        },
        ember: {
          DEFAULT: "#EE6C40",
          600: "#D85A30",
          700: "#B23910",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(1, 44, 106, 0.18)",
        "card-hover": "0 20px 40px -12px rgba(1, 44, 106, 0.28)",
      },
      borderRadius: {
        card: "28px",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #012C6A 0%, #06122B 100%)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
