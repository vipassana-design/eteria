import type { Metadata } from 'next'
import TituloSeccion from '@/components/ui/TituloSeccion'
import Reveal from '@/components/ui/Reveal'
import Glow from '@/components/bg/Glow'
import { privacidad as txt } from '@/content/paginas'

export const metadata: Metadata = {
  title: txt.meta.title,
  description: txt.meta.description,
  // Sin esto hereda el canonical del layout, que apunta a la home.
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
}

export default function Privacidad() {
  return (
    <article className="relative overflow-hidden pb-24 pt-32 lg:pt-40">
      <Glow className="-right-40 -top-10" tamano={640} intensidad={0.55} />

      <div className="contenedor">
        <TituloSeccion as="h1" degrade={txt.tituloDegrade}>
          {txt.titulo}
        </TituloSeccion>
        <p className="text-label mt-5 text-low">{txt.actualizada}</p>

        <div className="mt-14 flex flex-col gap-12 lg:mt-16">
          {txt.secciones.map((s) => (
            <Reveal key={s.titulo} className="border-t border-hairline pt-8">
              <h2 className="text-h3 font-medium">{s.titulo}</h2>
              <div className="mt-4 flex flex-col gap-4">
                {s.parrafos.map((p) => (
                  <p key={p.slice(0, 28)} className="text-cuerpo medida text-mid">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  )
}
