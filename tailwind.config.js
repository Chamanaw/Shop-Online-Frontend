/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    extend: {},
    screens:{
      'sm': '600px',
      'md': '900px',
      'lg': '1200px',
      'xl': '1536px',
    }
  },
  important: true,
  plugins: [],
}

