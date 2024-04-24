/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2613F',
        secondary: '#481E14',
        tertiary: '#9B3922',
      },
      boxShadow: {
        wrapper: '0 25px 50px -12px rgba(242,97,63, 0.25)',
      },
      fontFamily: {
        zen: ['zen tokyo zoo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
