import localFont from 'next/font/local'

/** Fuentes variables self-hosted desde Fontshare (PLAN.md §2.2).
 *  Se exponen como variables CSS que consume @theme en globals.css. */

export const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash',
  weight: '200 700',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  weight: '300 900',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})
