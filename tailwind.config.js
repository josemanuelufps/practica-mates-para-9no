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
        sans: ['"Outfit"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Deep Slate Navy (#2B2D42 is the anchor)
        navy: {
          50: '#F4F5F7',
          100: '#E4E6EB',
          200: '#C7CAD4',
          300: '#9DA2B3',
          400: '#646B84',
          500: '#3D415C',
          600: '#2B2D42', // User Anchor 1
          700: '#232537',
          800: '#1C1D2C',
          900: '#151622',
          950: '#0E0F17',
        },
        // Cool Slate Grey (#8D99AE is the anchor)
        slate: {
          50: '#F8F9FA',
          100: '#F0F2F5',
          200: '#E2E6EA',
          300: '#C5CDD7',
          400: '#A4AFBF',
          500: '#8D99AE', // User Anchor 2
          600: '#6C778B',
          700: '#4F5868',
          800: '#363C47',
          900: '#20242B',
        },
        // Ice Canvas (#EDF2F4 is the anchor)
        ice: {
          50: '#FFFFFF',
          100: '#FBFDFD',
          200: '#F4F7F8',
          300: '#EDF2F4', // User Anchor 3 (Canvas)
          400: '#DFE5E8',
          500: '#CFD7DB',
        },
        // Crimson / Red (#EF233C and #D90429 are anchors)
        crimson: {
          50: '#FDF2F4',
          100: '#FCE4E7',
          200: '#F9CCD2',
          300: '#F49DA7',
          400: '#EF5E6F',
          500: '#EF233C', // User Anchor 4 (Vivid Crimson)
          600: '#D90429', // User Anchor 5 (Deep Crimson)
          700: '#B50322',
          800: '#8C021A',
          900: '#660213',
          950: '#3D000B',
        },
        // Success Green for verified correct quiz answers
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
      },
      boxShadow: {
        'subtle': '0 2px 8px -1px rgba(43, 45, 66, 0.06), 0 1px 3px -1px rgba(43, 45, 66, 0.03)',
        'subtle-dark': '0 2px 10px -1px rgba(0, 0, 0, 0.45), 0 1px 4px -1px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '70%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'snap-in': {
          '0%': { transform: 'scale(0.94)' },
          '60%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-fade': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shake-soft': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'snap-in': 'snap-in 180ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-fade': 'slide-fade 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shake-soft': 'shake-soft 300ms ease-in-out',
      },
    },
  },
  plugins: [],
}
