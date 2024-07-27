/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/components/*.{js,vue,ts}',
    './lib/**/*.vue',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        misc: '#A41F35',
      },
      fontFamily: {
        base: 'Roboto, sans-serif',
      },
    },
  },
  plugins: [],
}

