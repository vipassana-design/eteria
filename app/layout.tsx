import type { Metadata, Viewport } from 'next'
import { clashDisplay, satoshi } from '@/lib/fuentes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import PageTransition from '@/components/layout/PageTransition'
import WhatsappFab from '@/components/layout/WhatsappFab'
import Grano from '@/components/bg/Grano'
import Particulas from '@/components/bg/Particulas'
import { SITIO } from '@/content/sitio'
import { marca } from '@/content/marca'
import './globals.css'

export const metadata: Metadata = {
  // metadataBase resuelve las URLs relativas de OG y canonical.
  metadataBase: new URL(SITIO.url),
  title: {
    default: `${SITIO.nombre} — Desarrollo de software a medida`,
    template: `%s | ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITIO.locale,
    siteName: SITIO.nombre,
    title: `${SITIO.nombre} — Desarrollo de software a medida`,
    description: SITIO.descripcion,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITIO.nombre} — Desarrollo de software a medida`,
    description: SITIO.descripcion,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#0C0A18',
  colorScheme: 'dark',
}

/** JSON-LD de Organization (PLAN.md §8.5). */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITIO.nombre,
  url: SITIO.url,
  description: SITIO.descripcion,
  email: marca.email,
  areaServed: SITIO.pais,
  knowsAbout: [
    'Desarrollo de ecommerce',
    'Desarrollo de sitios institucionales',
    'Desarrollo de software a medida',
    'Integración de sistemas',
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desarrollo de ecommerce' } },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Desarrollo de sitios institucionales' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Desarrollo de software y webapps a medida' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // El JSON-LD es un objeto propio, no entrada de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <SmoothScroll />

        {/* Capas de fondo (§2.5). Fijas y detrás de todo: van fuera de
            la capa de recorte para cubrir el viewport completo. */}
        <Particulas />
        <Grano />

        <PageTransition>
          {/* Capa de recorte horizontal: contiene los glows sin usar
              overflow en body, que rompería position:sticky. */}
          <div id="capa-sitio">
            <Header />
            <main id="contenido">{children}</main>
            <Footer />
          </div>
        </PageTransition>

        <WhatsappFab />
      </body>
    </html>
  )
}
