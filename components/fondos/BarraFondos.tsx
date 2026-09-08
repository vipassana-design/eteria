'use client'

import Link from 'next/link'
import { fondosUi, fondos, type FondoId } from '@/content/fondos'

/** Barra fija de comparación entre fondos.
 *
 *  Es andamiaje de la ruta temporal, no parte del hero: va abajo y con
 *  fondo propio para no interferir con lo que se está evaluando.
 */
export default function BarraFondos({ actual }: { actual: FondoId }) {
  const indice = fondos.findIndex((p) => p.id === actual)
  const propuesta = fondos[indice]
  const anterior = fondos[(indice - 1 + fondos.length) % fondos.length]
  const siguiente = fondos[(indice + 1) % fondos.length]

  if (!propuesta || !anterior || !siguiente) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-80 border-t border-hairline bg-base/90 backdrop-blur-md">
      <div className="contenedor flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0">
          <p className="text-label text-low">
            {propuesta.numero} de {fondos.length} · {fondosUi.aviso}
          </p>
          <p className="text-cuerpo mt-0.5 text-hi">
            <span className="font-medium">{propuesta.nombre}</span>{' '}
            <span className="text-mid">— {propuesta.linea}</span>
          </p>
        </div>

        <nav className="flex shrink-0 items-center gap-2">
          <Link
            href={`/fondos/${anterior.id}`}
            className="text-label rounded-(--radius-control) border border-hairline px-4 py-2 text-mid transition-colors duration-300 hover:border-hairline-hover hover:text-hi"
          >
            {fondosUi.anterior}
          </Link>
          <Link
            href="/fondos"
            className="text-label rounded-(--radius-control) border border-hairline px-4 py-2 text-mid transition-colors duration-300 hover:border-hairline-hover hover:text-hi"
          >
            {fondosUi.volver}
          </Link>
          <Link
            href={`/fondos/${siguiente.id}`}
            className="text-label rounded-(--radius-control) border border-hairline px-4 py-2 text-hi transition-colors duration-300 hover:border-hairline-hover"
          >
            {fondosUi.siguiente}
          </Link>
        </nav>
      </div>
    </div>
  )
}
