
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        void: '#030712',
        surface: '#0c1222',
        'surface-alt': '#111827',
        blue: '#3b82f6',
        'blue-bright': '#60a5fa',
        'blue-deep': '#1d4ed8',
        cyan: '#06b6d4',
        purple: '#a855f7',
        'purple-bright': '#c084fc',
        emerald: '#10b981',
        'emerald-bright': '#34d399',
      },
      fontFamily: {
        heading: ['"Sora"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
