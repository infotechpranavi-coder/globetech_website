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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'navy-blue': '#0f172a',
        'brand-primary': '#0f172a', // Main Navy Blue
        'brand-secondary': '#C5A028', // Gold (Logo Match)
        'brand-primary-light': '#1e293b', // Lighter Navy
        'brand-primary-dark': '#020617', // Darker Navy
        'brand-secondary-light': '#D4AF37', // Lighter Gold
        'brand-secondary-dark': '#B8860B', // Darker Gold
        'toshi-yellow': '#ffcc00',
        'toshi-black': '#000000',
        'toshi-red': '#ed1c24',
        'globe-red': '#ee2a24',
        'globe-black': '#000000',
        'globe-silver': '#939598',
      },
      animation: {
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'slide-out-right': 'slideOutRight 1s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

