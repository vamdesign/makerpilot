
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1A9E8F',
          dark:    '#0F6E56',
          light:   '#E0F5F2',
          mid:     '#9FE1CB',
        },
        warn:     '#C2590A',
        warnLight:'#FDF0E6',
        critical: '#B91C1C',
      },
      fontFamily: {
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        mono:  ['DM Mono', 'monospace'],
      },
      maxWidth: { app: '430px' },
      borderRadius: { '2xl': '1rem', '3xl': '1.5rem' },
    },
  },
  plugins: [],
}
