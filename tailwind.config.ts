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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        iconBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-0.3em)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-0.1em)' },
          '80%': { transform: 'translateY(0)' },
        },
        'hover-wiggle': {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        'crack-shake': {
          '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
          '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
          '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
          '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
          '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
          '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
          '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
          '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
          '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
          '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
          '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
        },
        'debris-fall': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(180deg)', opacity: '0' },
        },
        'fall-away': {
          '0%': { transform: 'translateY(0) rotate(var(--fall-rotate, 10deg))', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(var(--fall-rotate, 90deg))', opacity: '0' },
        },
        'spring-up': {
          '0%': { transform: 'translateY(100%) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'spring-down': {
          '0%': { transform: 'translateY(-100%) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        iconBounce: 'iconBounce 0.8s ease-in-out',
        'hover-wiggle': 'hover-wiggle 0.8s ease-in-out infinite',
        'crack-shake': 'crack-shake 0.5s linear infinite',
        'debris-fall': 'debris-fall 0.8s cubic-bezier(0.55, 0, 1, 0.45) forwards',
        'fall-away': 'fall-away 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards',
        'spring-up': 'spring-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'spring-down': 'spring-down 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      boxShadow: {
        neo: '4px 4px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
};
export default config;
