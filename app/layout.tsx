import type { Metadata, Viewport } from 'next'
import { clashDisplay, satoshi } from '@/lib/fuentes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Eteria — Desarrollo de software a medida',
    template: '%s | Eteria',
  },
  description:
    'Desarrollamos ecommerce, plataformas y sitios a medida. Construidos desde cero, sin plantillas ni limitaciones.',
}

export const viewport: Viewport = {
  themeColor: '#0C0A18',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
