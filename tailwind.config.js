/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* Paleta extraída do logo da pousada (sol âmbar + script terracota +
         "POUSADA" em ouro). Os valores marcados vêm direto do arquivo. */
      colors: {
        // Espresso: o terracota da marca escurecido até virar superfície
        ink: {
          DEFAULT: '#1C0F07',
          soft: '#2A1A0E',
          mute: '#3B2716',
        },
        cream: {
          DEFAULT: '#FAF4EC',
          warm: '#F6E9DF', // logo
          deep: '#F3DAC4', // logo
        },
        // Neutros quentes para texto secundário e traços
        clay: {
          50: '#FAF3EC',
          100: '#F1E2D2',
          200: '#E5C9AF',
          300: '#DEAF8B',
          400: '#D98C52', // logo
          500: '#C57843',
          600: '#9C5C31',
          700: '#7A4826',
          800: '#54301A',
          900: '#331C0E',
        },
        // Script "Vida Boa" e beija-flor
        terra: {
          300: '#E5B18F', // logo
          400: '#D98C52', // logo
          500: '#CE5C26', // logo
          600: '#AD4A1C',
          700: '#8A3A15',
        },
        // Sol e "POUSADA"
        gold: {
          200: '#F7A51B', // logo — núcleo do sol
          300: '#F6CC42', // logo
          400: '#F1BE4F', // logo
          500: '#E19F3C', // logo
          600: '#C08420',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        display: '-0.035em',
        wider: '0.08em',
        widest: '0.22em',
      },
      maxWidth: {
        shell: '1440px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
        sun: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        // Entra invisível, acende no meio do trajeto e apaga antes de sair.
        // Sem isso o brilho reaparecia de repente ao reiniciar o ciclo.
        shine: {
          '0%': { transform: 'translateX(-160%) skewX(-18deg)', opacity: '0' },
          '14%': { opacity: '1' },
          '46%': { opacity: '1' },
          '60%': { transform: 'translateX(280%) skewX(-18deg)', opacity: '0' },
          '100%': { transform: 'translateX(280%) skewX(-18deg)', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        pulseSoft: 'pulseSoft 5s ease-in-out infinite',
        sun: 'sun 42s linear infinite',
        shine: 'shine 5.5s linear infinite',
      },
    },
  },
  plugins: [],
}
