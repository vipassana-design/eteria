import type { Metadata } from 'next'
import Comparador from '@/components/mockups/Comparador'
import { mockupsNuevos } from '@/content/mockupsNuevos'

const propuesta = mockupsNuevos.find((m) => m.id === 'corporativo')!

/** Ruta temporal de comparación: no indexable, igual que /fondos. */
export const metadata: Metadata = {
  title: `Mockup ${propuesta.numero} — ${propuesta.nombre}`,
  robots: { index: false, follow: false },
}

export default function Pagina() {
  return <Comparador id="corporativo" />
}
