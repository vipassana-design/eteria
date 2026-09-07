import type { Metadata } from 'next'
import LandingLayout from '@/components/landing/LandingLayout'
import { landings } from '@/content/landings'

const landing = landings['ecommerce']

export const metadata: Metadata = {
  title: landing.meta.title,
  description: landing.meta.description,
  alternates: { canonical: '/ecommerce' },
  openGraph: {
    title: landing.meta.title,
    description: landing.meta.description,
    url: '/ecommerce',
  },
}

export default function Pagina() {
  return <LandingLayout landing={landing} />
}
