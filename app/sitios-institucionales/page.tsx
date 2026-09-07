import type { Metadata } from 'next'
import LandingLayout from '@/components/landing/LandingLayout'
import { landings } from '@/content/landings'

const landing = landings['sitios-institucionales']

export const metadata: Metadata = {
  title: landing.meta.title,
  description: landing.meta.description,
  alternates: { canonical: '/sitios-institucionales' },
  openGraph: {
    title: landing.meta.title,
    description: landing.meta.description,
    url: '/sitios-institucionales',
  },
}

export default function Pagina() {
  return <LandingLayout landing={landing} />
}
