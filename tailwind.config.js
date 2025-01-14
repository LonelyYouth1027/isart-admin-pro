/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          'DEFAULT': 'rgb(var(--arcoblue-6))',
          'dark-link-1': 'rgb(var(--arcoblue-1))',
          'dark-link-2': 'rgb(var(--arcoblue-2))',
          'dark-link-3': 'rgb(var(--arcoblue-3))',
          'dark-link-4': 'rgb(var(--arcoblue-4))',
          'dark-link-5': 'rgb(var(--arcoblue-5))',
          'dark-link-7': 'rgb(var(--arcoblue-7))',
        },
        fill: {
          DEFAULT: 'var(--color-neutral-3)',
        },
      },
      flexBasis: {
        '1/7': '14.2857143%',
        '1/8': '12.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
