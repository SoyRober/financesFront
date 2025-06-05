// tailwind.config.js
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // 👈 esto permite detectar clases usadas en React
  theme: {
    extend: {
      colors: {
        primary: "#7f5af0",
        primaryDark: "#5a3bc4",
        background: "#16161a",
        textMain: "#fffffe",
        textSecondary: "#94a1b2",
        placeholder: "#72757e",
      },
    },
  },
  plugins: [],
};
