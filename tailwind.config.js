/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#E4EFE8',
          200: '#C7DFD2',
          300: '#94C3AB',
          400: '#52B788',
          500: '#2D6A4F',
          600: '#1B4332',
          700: '#143527',
          800: '#0E261C',
          900: '#091A13',
        },
        terracotta: {
          50: '#FDF7F4',
          100: '#FAEBE4',
          200: '#F4D3C4',
          300: '#EAB29A',
          400: '#E07A5F',
          500: '#D35F40',
          600: '#C85A32',
          700: '#9E4221',
          800: '#752F15',
        },
        cream: {
          50: '#FBFBFA',
          100: '#F5F4EE',
          200: '#EAE8DE',
          300: '#DDD9CB',
        },
        moss: {
          800: '#232C27',
          850: '#1C231F',
          900: '#171D1A',
          950: '#121614',
        },
      },
      boxShadow: {
        'subtle': '0 2px 8px -1px rgba(27, 67, 50, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.03)',
        'subtle-dark': '0 2px 10px -1px rgba(0, 0, 0, 0.3), 0 1px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
