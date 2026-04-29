/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nf-bg': '#050b1a',
        'nf-bg-deep': '#0a1628',
        'nf-surface': '#0c1322',
        'nf-surface-dim': '#070e1d',
        'nf-surface-container': '#191f2f',
        'nf-surface-container-low': '#151b2b',
        'nf-surface-container-high': '#232a3a',
        'nf-surface-container-highest': '#2e3445',
        'nf-on-surface': '#dce2f8',
        'nf-on-surface-variant': '#bbc9cf',
        'nf-primary': '#a8e8ff',
        'nf-primary-container': '#00d4ff',
        'nf-on-primary': '#003642',
        'nf-on-primary-container': '#00586b',
        'nf-secondary': '#b3c5ff',
        'nf-secondary-container': '#0266ff',
        'nf-tertiary': '#36f6ff',
        'nf-tertiary-container': '#00d8e1',
        'nf-outline': '#859398',
        'nf-outline-variant': '#3c494e',
        'nf-error': '#ffb4ab',
        'nf-gold': '#FFD700',
        'nf-gold-dim': '#e7c365',
        'nf-inverse-surface': '#dce2f8',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '600' }],
        'data': ['14px', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
        'price': ['24px', { lineHeight: '1.0', fontWeight: '700' }],
      },
      borderRadius: {
        'glass': '16px',
        'glass-lg': '24px',
      },
      spacing: {
        'gutter': '24px',
        'section': '120px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-cyan': 'pulseCyan 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseCyan: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
