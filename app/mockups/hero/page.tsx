import type { Metadata } from 'next'
import Link from 'next/link'
import HeroConMockups from '@/components/mockups/HeroConMockups'
import { mockupsUi } from '@/content/mockupsNuevos'

/** Ruta temporal de comparación: no indexable, igual que /fondos. */
export const metadata: Metadata = {
  title: 'Mockups nuevos en el hero',
  robots: { index: false, follow: false },
}

/** El hero real con los mockups nuevos en el ciclo.
 *
 *  Es donde se juzgan de verdad: entran por partes, a su tamaño real y
 *  con la terminal antes. Las páginas de comparación los muestran
 *  quietos y grandes; acá se ven corriendo. */
export default function Pagina() {
  return (
    <>
      <HeroConMockups />

      <div className="contenedor flex flex-wrap items-center gap-x-8 gap-y-3 pb-24">
        <p className="text-label text-low">{mockupsUi.aviso}</p>
        <Link
          href="/mockups"
          className="text-cuerpo text-violet-300 transition-colors duration-300 hover:text-hi"
        >
          Ver el detalle de cada uno &rarr;
        </Link>
        <Link
          href="/"
          className="text-cuerpo text-low transition-colors duration-300 hover:text-hi"
        >
          {mockupsUi.volverAlSitio}
        </Link>
      </div>
    </>
  )
}
