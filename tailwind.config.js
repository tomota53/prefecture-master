/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',   // 緑の最も明るい色
          100: '#dcfce7',  // 緑の明るい色
          500: '#22c55e',  // 緑の中間色
          600: '#16a34a',  // メインの緑（bg-blue-600の代替）
          700: '#15803d',  // 緑の濃い色（hover用）
        }
      }
    },
  },
  plugins: [],
}
