import type { Metadata } from 'next'
import HeroConFondo from '@/components/fondos/HeroConFondo'
import BarraFondos from '@/components/fondos/BarraFondos'
import { fondos } from '@/content/fondos'

const propuesta = fondos.find((f) => f.id === 'mesh-flujo')!

/** Ruta temporal de comparación: no indexable, igual que /design-system. */
export const metadata: Metadata = {
  title: `Fondo ${propuesta.numero} — ${propuesta.nombre}`,
  robots: { index: false, follow: false },
}

export default function Pagina() {
  return (
    <>
      <HeroConFondo fondo="mesh-flujo" />
      <BarraFondos actual="mesh-flujo" />
    </>
  )
}
