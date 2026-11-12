/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090d16',
        panel: '#0c121e',
        raised: '#111a2a',
        line: '#1b2537',
        'line-strong': '#2a3850',
        muted: '#7d8aa3',
        soft: '#b4c0d6',
        accent: '#5aa9ff',
        'accent-dim': '#1d3a5f',
        ok: '#3ddc97',
        warn: '#f5b74e',
        err: '#ff6b6b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite',
        'slide-in': 'slideIn 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fadeIn 200ms ease-out',
      },
    },
  },
  plugins: [],
};
