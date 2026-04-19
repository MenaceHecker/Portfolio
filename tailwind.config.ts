import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        bg: {
          primary: "#050A16",
          secondary: "#0d1226",
          card: "rgba(255,255,255,0.04)",
        },
        blue: {
          DEFAULT: "#3B82F6",
          dim: "rgba(59,130,246,0.16)",
          border: "rgba(59,130,246,0.28)",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          default: "rgba(255,255,255,0.08)",
          hover: "rgba(59,130,246,0.28)",
        },
        text: {
          primary: "#f0f2f8",
          secondary: "#e8eaf0",
          muted: "rgba(232,234,240,0.55)",
          dim: "rgba(232,234,240,0.35)",
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease forwards",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
