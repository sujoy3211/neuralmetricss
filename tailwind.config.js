/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#0a0a0f',
          900: '#0f0f1a',
          800: '#1a1a2e',
          700: '#252540',
          600: '#3a3a5c',
        },
        electric: {
          300: '#33e0ff',
          400: '#00d4ff',
          500: '#00b4d8',
          600: '#0096c7',
        },
        neural: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7c3aed',
          600: '#6d28d9',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 5px #00d4ff' },
          to: { boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff' },
        },
      },
    },
  },
  plugins: [],
};
