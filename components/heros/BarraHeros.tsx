'use client'

import Link from 'next/link'
import { herosUi, propuestas, type HeroId } from '@/content/heros'

/** Barra fija de comparación entre propuestas.
 *
 *  Es andamiaje de la ruta temporal, no parte del hero: va abajo y con
 *  fondo propio para no interferir con lo que se está evaluando.
 */
export default function BarraHeros({ actual }: { actual: HeroId }) {
  const indice = propuestas.findIndex((p) => p.id === actual)
  const propuesta = propuestas[indice]
  const anterior = propuestas[(indice - 1 + propuestas.length) % propuestas.length]
  const siguiente = propuestas[(indice + 1) % propuestas.length]

  if (!propuesta || !anterior || !siguiente) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-80 border-t border-hairline bg-base/90 backdrop-blur-md">
      <div className="contenedor flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0">
          <p className="text-label text-low">
            {propuesta.numero} de {propuestas.length} · {herosUi.aviso}
          </p>
          <p className="text-cuerpo mt-0.5 text-hi">
            <span className="font-medium">{propuesta.nombre}</span>{' '}
            <span className="text-mid">— {propuesta.linea}</span>
          </p>
        </div>

        <nav className="flex shrink-0 items-center gap-2">
          <Link
            href={`/heros/${anterior.id}`}
            className="text-label rounded-(--radius-control) border border-hairline px-4 py-2 text-mid transition-colors duration-300 hover:border-hairline-hover hover:text-hi"
          >
            {herosUi.anterior}
          </Link>
          <Link
            href="/heros"
            className="text-label rounded-(--radius-control) border border-hairline px-4 py-2 text-mid transition-colors duration-300 hover:border-hairline-hover hover:text-hi"
          >
            {herosUi.volver}
          </Link>
          <Link
            href={`/heros/${siguiente.id}`}
            className="text-label rounded-(--radius-control) border border-hairline px-4 py-2 text-hi transition-colors duration-300 hover:border-hairline-hover"
          >
            {herosUi.siguiente}
          </Link>
        </nav>
      </div>
    </div>
  )
}
