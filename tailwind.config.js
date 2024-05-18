/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    colors: {
      primary: '#FF9135',
      gray: {
        400: '#A3A3A3',
      },
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        backgroundFadeIn: {
          '0%': { backgroundColor: 'rgba(0, 0, 0, 0)' },
          '100%': { backgroundColor: 'rgba(255, 165, 0, 0.8)' },
        },
        backgroundFadeOut: {
          '0%': { backgroundColor: 'rgba(255, 165, 0, 0.8)' },
          '100%': { backgroundColor: 'rgba(0, 0, 0, 0)' },
        },
        scale: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        fadeOut: 'fadeOut 2s ease-in-out',
        backgroundFadeIn: 'backgroundFadeIn 2s ease-in-out',
        // backgroundFadeOut: 'backgroundFadeOut 2s ease-in-out',
        scale: 'scale 1s ease-in-out',
        rotate: 'rotate 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
