export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        bone: '#f6f4ee',
        paper: '#fbfaf6',
        ink: '#17201d',
        muted: '#5b6560',
        line: '#e2ded3',
        forest: '#0f4c43',
        forestdark: '#0a352f',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
    },
  },
  plugins: [],
}