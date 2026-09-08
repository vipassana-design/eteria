import type { Metadata } from 'next'
import Link from 'next/link'
import { fondosUi, fondos } from '@/content/fondos'

export const metadata: Metadata = {
  title: 'Fondos para el hero',
  robots: { index: false, follow: false },
}

/** Índice de los fondos.
 *  Cada una se ve a pantalla completa en su propia ruta; acá solo está
 *  la lista para elegir. */
export default function IndiceFondos() {
  return (
    <div className="contenedor flex min-h-svh flex-col justify-center py-24">
      <p className="text-label text-low">{fondosUi.aviso}</p>
      <h1 className="text-h2 mt-4 font-semibold">
        {fondosUi.titulo.split(' ')[0]}{' '}
        <span className="texto-degrade inline-block">
          {fondosUi.titulo.split(' ').slice(1).join(' ')}
        </span>
      </h1>
      <p className="text-cuerpo-lg medida mt-4 text-mid">{fondosUi.bajada}</p>

      <ul className="mt-14 flex flex-col">
        {fondos.map((p) => (
          <li key={p.id}>
            <Link
              href={`/fondos/${p.id}`}
              className="group flex items-baseline gap-6 border-t border-hairline py-7 transition-colors duration-300 hover:border-hairline-hover lg:gap-10"
            >
              <span className="font-display texto-degrade text-h3 font-semibold leading-none">
                {p.numero}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-h3 block font-medium text-hi">{p.nombre}</span>
                <span className="text-cuerpo medida mt-2 block text-mid">{p.linea}</span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-violet-300 transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
        <li className="border-t border-hairline" />
      </ul>

      <p className="mt-10">
        <Link
          href="/"
          className="text-cuerpo text-low transition-colors duration-300 hover:text-hi"
        >
          &larr; Volver al sitio
        </Link>
      </p>
    </div>
  )
}
