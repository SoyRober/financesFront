/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        footer: {
          background: '#16161a',
          headline: '#fffffe',
          paragraph: '#94a1b2',
          link: '#7f5af0',
        },
        card: {
          background: '#242629',
          headline: '#fffffe',
          paragraph: '#94a1b2',
          tagBackground: '#7f5af0',
          tagText: '#fffffe',
          highlight: '#fffffe',
        },
        body: {
          background: '#16161a',
          highlight: '#7f5af0',
          tertiary: '#2cb67d',
          secondary: '#72757e',
          main: '#fffffe',
        },
      },
    },
  },
  plugins: [],
}
