import type { Metadata } from 'next'
import HeroTerminal from '@/components/heros/HeroTerminal'
import BarraHeros from '@/components/heros/BarraHeros'
import { propuestas } from '@/content/heros'

const propuesta = propuestas.find((p) => p.id === 'terminal')!

/** Ruta temporal de comparación: no indexable, igual que /design-system. */
export const metadata: Metadata = {
  title: `Hero ${propuesta.numero} — ${propuesta.nombre}`,
  robots: { index: false, follow: false },
}

export default function Pagina() {
  return (
    <>
      <HeroTerminal />
      <BarraHeros actual="terminal" />
    </>
  )
}
