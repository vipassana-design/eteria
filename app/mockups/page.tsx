import type { Metadata } from 'next'
import Link from 'next/link'
import { mockupsNuevos, mockupsUi } from '@/content/mockupsNuevos'

export const metadata: Metadata = {
  title: 'Mockups del hero',
  robots: { index: false, follow: false },
}

/** Índice de los mockups nuevos.
 *  Cada uno se compara con el actual en su propia ruta. */
export default function IndiceMockups() {
  return (
    <div className="contenedor flex min-h-svh flex-col justify-center py-24">
      <p className="text-label text-low">{mockupsUi.aviso}</p>
      <h1 className="text-h2 mt-4 font-semibold">
        Mockups <span className="texto-degrade inline-block">del hero</span>
      </h1>
      <p className="text-cuerpo-lg medida mt-4 text-mid">{mockupsUi.bajada}</p>

      <p className="mt-8">
        <Link
          href="/mockups/hero"
          className="text-cuerpo font-medium text-violet-300 transition-colors duration-300 hover:text-hi"
        >
          {mockupsUi.verEnHero} &rarr;
        </Link>
      </p>

      <ul className="mt-14 flex flex-col">
        {mockupsNuevos.map((m) => (
          <li key={m.id}>
            <Link
              href={`/mockups/${m.id}`}
              className="group flex items-baseline gap-6 border-t border-hairline py-7 transition-colors duration-300 hover:border-hairline-hover lg:gap-10"
            >
              <span className="font-display texto-degrade text-h3 font-semibold leading-none">
                {m.numero}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-h3 block font-medium text-hi">{m.nombre}</span>
                <span className="text-cuerpo medida mt-2 block text-mid">{m.linea}</span>
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

      <p className="text-cuerpo medida mt-10 text-low">{mockupsUi.origenFotos}</p>

      <p className="mt-8">
        <Link
          href="/"
          className="text-cuerpo text-low transition-colors duration-300 hover:text-hi"
        >
          &larr; {mockupsUi.volverAlSitio}
        </Link>
      </p>
    </div>
  )
}
