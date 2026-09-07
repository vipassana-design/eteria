import type { Metadata } from 'next'
import Boton from '@/components/ui/Boton'
import Glow from '@/components/bg/Glow'
import { noEncontrada as txt } from '@/content/paginas'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
}

export default function NoEncontrada() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-32">
      <Glow className="-left-40 top-1/4" tamano={700} intensidad={0.7} />

      <div className="contenedor">
        <p className="font-display texto-degrade text-hero font-semibold leading-none">
          {txt.codigo}
        </p>
        <h1 className="text-h2 mt-6 font-semibold">
          {txt.titulo} <span className="texto-degrade inline-block">{txt.tituloDegrade}</span>
        </h1>
        <p className="text-cuerpo-lg medida mt-5 text-mid">{txt.texto}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <Boton href="/">{txt.volver}</Boton>
          <Boton href="/#servicios" variante="secundario">
            {txt.verServicios}
          </Boton>
        </div>
      </div>
    </section>
  )
}
