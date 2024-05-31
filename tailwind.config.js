/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
      },
      // backgroundImage: {
      //   'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark']
  }
}

