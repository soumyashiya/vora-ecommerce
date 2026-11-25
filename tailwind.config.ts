import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Extra-small breakpoint for fine control on small phones (≥480px),
        // complementing the default sm=640/md=768/lg=1024/xl=1280/2xl=1536.
        xs: "480px",
      },
      colors: {
        // Warm editorial palette.
        cream: {
          DEFAULT: "#FFFDF5",
          deep: "#FBF6EA",
        },
        espresso: {
          DEFAULT: "#21180E",
          soft: "#3E2F1E",
        },
        clay: "#6B5B49",
        taupe: "#B6B1AA",
        chartreuse: {
          DEFAULT: "#D0E067",
          bright: "#C1DF16",
        },

        // Legacy names kept so existing markup inherits the new palette.
        ivory: "#FFFDF5",
        beige: "#F2E9DB",
        sand: "#E8DCC9",
        navy: {
          DEFAULT: "#21180E",
          muted: "#6B5B49",
        },
        lime: {
          DEFAULT: "#D0E067",
          btn: "#D0E067",
        },
        ink: "#21180E",
        body: "#6B5B49",
      },
      fontFamily: {
        serif: [
          "var(--font-instrument)",
          "Instrument Serif",
          "Georgia",
          "serif",
        ],
        sans: ["var(--font-figtree)", "Figtree", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Tracked uppercase micro-labels appear everywhere in this system.
        micro: ["12px", { lineHeight: "1.1", letterSpacing: "0.07em" }],
        label: ["14px", { lineHeight: "1.1", letterSpacing: "0.07em" }],
      },
      borderRadius: {
        card: "14px",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      maxWidth: {
        container: "1440px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        display: "-0.03em",
        wider2: "0.07em",
      },
      boxShadow: {
        card: "0 18px 50px -40px rgba(33,24,14,0.45)",
        lift: "0 30px 70px -48px rgba(33,24,14,0.55)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        spinslow: {
          to: { transform: "rotate(360deg)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        spinslow: "spinslow 40s linear infinite",
        fadeUp: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
