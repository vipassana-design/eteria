import type { Metadata } from 'next'
import HeroVentana from '@/components/heros/HeroVentana'
import BarraHeros from '@/components/heros/BarraHeros'
import { propuestas } from '@/content/heros'

const propuesta = propuestas.find((p) => p.id === 'ventana')!

/** Ruta temporal de comparación: no indexable, igual que /design-system. */
export const metadata: Metadata = {
  title: `Hero ${propuesta.numero} — ${propuesta.nombre}`,
  robots: { index: false, follow: false },
}

export default function Pagina() {
  return (
    <>
      <HeroVentana />
      <BarraHeros actual="ventana" />
    </>
  )
}
