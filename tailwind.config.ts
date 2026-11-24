import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#123D20',
          dark: '#092D17',
          light: '#1B542E',
        },
        honey: {
          DEFAULT: '#F5B400',
          gold: '#F5B400',
          yellow: '#FFCA28',
          light: '#FED966',
          amber: '#D99800',
        },
        cream: {
          DEFAULT: '#FFF7EA',
          light: '#FFFBF5',
          dark: '#F8EEDD',
        },
        beige: {
          DEFAULT: '#F3E5D0',
          warm: '#F3E5D0',
          light: '#FAF3EA',
          dark: '#E5D2B8',
        },
        leaf: {
          DEFAULT: '#789B40',
          soft: '#789B40',
          light: '#8EAE56',
          dark: '#638233',
        },
        charcoal: {
          DEFAULT: '#29251F',
          dark: '#29251F',
          muted: '#5C5446',
          light: '#7A7264',
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", 'var(--font-playfair)', 'Georgia', 'serif'],
        sans: ["'DM Sans'", 'var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        heading: ["'Playfair Display'", 'var(--font-playfair)', 'Georgia', 'serif'],
        body: ["'DM Sans'", 'var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(41, 37, 31, 0.06)',
        'soft': '0 4px 20px -2px rgba(41, 37, 31, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(41, 37, 31, 0.12)',
        'honey': '0 8px 24px -4px rgba(245, 180, 0, 0.25)',
        'forest': '0 8px 24px -4px rgba(18, 61, 32, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
