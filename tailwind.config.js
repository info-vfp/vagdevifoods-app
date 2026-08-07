/** @type {import('tailwindcss').Config} */
export default {
  // Every file that can contain a class name must be listed here, otherwise Tailwind's
  // JIT compiler will strip those styles out of the production CSS.
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#FFFFFF', // Pure White for professional cleanliness
        'brand-bg-alt': '#F8FAFC', // Slate 50 - Cooler than Gray to match Navy
        'brand-primary': '#1F2937', // Charcoal (Professional, High Contrast)
        'brand-secondary': '#D4AF37', // Royal Gold (Luxury, complements packaging)

        // The royal gold above measures 2.0:1 on cream and 8.7:1 on navy. It is legible on the
        // dark sections and nowhere else, so anything gold sitting on a light background uses
        // this darker bronze instead — 4.65:1 on cream, 4.9:1 on white, clearing WCAG AA.
        'brand-gold-ink': '#8A6D1F',

        // WhatsApp green, darkened from #1D9E5A. Every use of it carries white label text, and
        // the original measured 3.45:1 — under AA for the 13px labels on the sticky mobile
        // bar, which is the most-tapped control on the site. This reads 4.61:1.
        'brand-whatsapp': '#0A8742',

        'brand-dark': '#0A1230', // Deep Navy (matches the Claude Design redesign)
        'brand-accent': '#E5E7EB', // Gray 200 for borders
        'brand-line': '#E8E2D4', // Hairline borders between grid cells/cards

        // Legacy mappings kept so older class usages keep resolving
        'brand-espresso': '#1F2937',
        'brand-saffron': '#D4AF37',
        'brand-cream': '#FBF9F4', // Off-white section background (redesign)

        'text-heading': '#111827', // Gray 900 (Sharp black)
        'text-body': '#374151', // Gray 700 (Readable gray)
        'text-muted': '#6B7280', // Gray 500

        'brand-orange': '#D4AF37', // Compatibility alias -> Gold
      },
      fontFamily: {
        // The Noto families are fallbacks for the Hindi / Telugu / Tamil / Kannada translations.
        sans: ['Montserrat', 'Noto Sans Devanagari', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Noto Sans Telugu', 'serif'],
        display: ['Playfair Display', 'Noto Sans Devanagari', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'serif'],
      },
      boxShadow: {
        glass: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'glass-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        premium: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 1))',
      },
    },
  },
  plugins: [],
};
