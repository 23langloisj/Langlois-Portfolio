/** @type {import('tailwindcss').Config} */
const withVar = (v) => `rgb(var(${v}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        // ── Semantic tokens (CSS vars → swap in dark mode) ──
        canvas: withVar('--canvas'), //     page background
        surface: withVar('--surface'), //   cards / raised surfaces
        'surface-2': withVar('--surface-2'), // subtle raised
        ink: withVar('--ink'), //           primary text / primary btn
        body: withVar('--body'), //         body copy
        muted: withVar('--muted'), //       labels, meta, dates
        faint: withVar('--faint'), //       very subtle
        hairline: withVar('--hairline'), // subtle 1px borders
        line: withVar('--line'), //         default borders
        link: withVar('--link'), //         links only
        'link-hover': withVar('--link-hover'),
        signal: withVar('--signal'), //     availability / live dot
        poppy: withVar('--poppy'), //       brand accent
        // Inverse pair — the "spotlight" panels (contact, primary buttons)
        inverse: withVar('--inverse-bg'),
        'inverse-fg': withVar('--inverse-fg'),

        // ── Raw scales (accents, heatmap) ──
        coolgray: {
          95: '#F9FAFB', 100: '#F3F6F7', 200: '#EAEDEF', 300: '#C4C9CF',
          400: '#ACB0B4', 500: '#939495', 600: '#797A7B', 625: '#747576',
          650: '#5D5E60', 800: '#4B4D4E', 900: '#37383A', 1000: '#2A2B2D',
          1100: '#1D1E20', 1200: '#141415', 1250: '#070708',
        },
        blue: { 100: '#E0F2FF', 300: '#B9DAFD', 500: '#569BF5', 700: '#155FEA', 900: '#05339E' },
        green: { 100: '#DAFBE4', 300: '#96EDBB', 400: '#44D985', 500: '#2CB56B', 650: '#228654', 700: '#137147', 900: '#063C26' },
      },
      fontFamily: {
        sans: [
          'system-ui', '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'",
          'Roboto', "'Helvetica Neue'", 'Arial', 'sans-serif',
        ],
        mono: [
          "'JetBrains Mono'", 'ui-monospace', 'Menlo', 'Monaco',
          "'Cascadia Mono'", "'Roboto Mono'", "'Source Code Pro'", 'monospace',
        ],
      },
      maxWidth: { content: '660px', wide: '720px' },
      borderRadius: { sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px' },
      letterSpacing: { display: '-0.025em', heading: '-0.02em', label: '0.08em' },
      fontSize: {
        eyebrow: ['12px', { lineHeight: '1', letterSpacing: '0.08em' }],
        meta: ['13px', { lineHeight: '1.4' }],
      },
      boxShadow: {
        card: '0 6px 24px -10px rgb(var(--shadow) / 0.16), 0 2px 6px -2px rgb(var(--shadow) / 0.08)',
        panel: '0 1px 2px rgb(var(--shadow) / 0.06)',
        pop: '0 20px 60px -20px rgb(var(--shadow) / 0.35)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'grid-pan': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '40px 40px' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'pop-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(.98)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'pop-in': 'pop-in 0.22s cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
}
