import type { Metadata } from 'next'
import LandingLayout from '@/components/landing/LandingLayout'
import { landings } from '@/content/landings'

const landing = landings['software-a-medida']

export const metadata: Metadata = {
  title: landing.meta.title,
  description: landing.meta.description,
  alternates: { canonical: '/software-a-medida' },
  openGraph: {
    title: landing.meta.title,
    description: landing.meta.description,
    url: '/software-a-medida',
  },
}

export default function Pagina() {
  return <LandingLayout landing={landing} />
}
