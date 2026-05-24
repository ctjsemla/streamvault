import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        sv: {
          red: "#E52222",
          "red-hover": "#FF3333",
          "red-tint": "#FFF0F0",
          black: "#0A0A0A",
          gray: "#52525B",
          "gray-mid": "#A1A1AA",
          "off-white": "#F7F7F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ['"Clash Display"', "system-ui", "sans-serif"],
        mono: ["var(--font-mono-accent)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3.5rem,8vw,6.75rem)", { lineHeight: "0.92", letterSpacing: "-0.04em", fontWeight: "700" }],
        "section": ["52px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" }],
        "pull-quote": ["36px", { lineHeight: "1.35", fontWeight: "400" }],
        "display-mega": ["clamp(5rem,12vw,9rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "sv-card-hover": "0 4px 24px rgba(229, 34, 34, 0.10)",
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.6" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
