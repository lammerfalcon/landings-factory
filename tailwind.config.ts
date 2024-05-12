import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Balsamiq Sans', ...defaultTheme.fontFamily.sans],
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
        // serif: ['Balsamiq Sans', ...defaultTheme.fontFamily.serif]
        // sans: ['Podkova', ...defaultTheme.fontFamily.sans],
        // serif: ['Podkova', ...defaultTheme.fontFamily.serif]
      },
      colors: {
        'heliotrope': {
          50: '#fbf5fe',
          100: '#f5e9fe',
          200: '#ecd3fb',
          300: '#e1b0f7',
          400: '#d288f2',
          500: '#b850e5',
          600: '#9e31c8',
          700: '#8525a6',
          800: '#6e2088',
          900: '#5e206f',
          950: '#3b0949'
        },
        'lavender-rose': {
          50: '#fef5fd',
          100: '#fdeafb',
          200: '#fbd3f7',
          300: '#f6b1ec',
          400: '#f294e3',
          500: '#e352cc',
          600: '#c732ac',
          700: '#a4278a',
          800: '#872171',
          900: '#6e215b',
          950: '#49093a'
        },
        'fuego': {
          50: '#ffffe5',
          100: '#feffc6',
          200: '#faff94',
          300: '#f1ff56',
          400: '#e2f724',
          500: '#c0d904',
          600: '#9ab200',
          700: '#728704',
          800: '#5b6a0a',
          900: '#4b590e',
          950: '#283201'
        },
        'river-bed': {
          50: '#f6f7f9',
          100: '#edeef1',
          200: '#d7dae0',
          300: '#b3bac6',
          400: '#8a94a6',
          500: '#6b778c',
          600: '#566073',
          700: '#434a59',
          800: '#3d434f',
          900: '#363a44',
          950: '#24262d'
        },
        'shakespeare': {
          50: '#f2f9fd',
          100: '#e5f2f9',
          200: '#c5e4f2',
          300: '#91cee8',
          400: '#52b3d9',
          500: '#309cc7',
          600: '#217da8',
          700: '#1c6588',
          800: '#1b5571',
          900: '#1b485f',
          950: '#122e3f'
        }

      }
    }
  }
}
