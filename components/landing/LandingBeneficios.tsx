import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { landingUi } from '@/content/landings'
import type { Beneficio } from '@/types'
import Glow from '@/components/bg/Glow'

/** Beneficios de una landing (PLAN.md §5).
 *
 *  Layout editorial con números, sin cards: es lo que lo diferencia de
 *  la grilla de tres cajas que tiene cualquier landing. */
export default function LandingBeneficios({ beneficios }: { beneficios: Beneficio[] }) {
  return (
    <section id="incluye" className="seccion relative scroll-mt-24">
      <Glow className="-left-60 top-12" tamano={600} intensidad={0.6} soloDesktop />
      <div className="contenedor">
        <TituloSeccion>{landingUi.tituloBeneficios}</TituloSeccion>

        <div className="mt-14 flex flex-col lg:mt-16">
          {beneficios.map((b, i) => (
            <Reveal
              key={b.numero}
              variante="lateral"
              delay={i * 0.05}
              className="border-t border-hairline py-8 lg:py-10"
            >
              <div className="grid gap-4 lg:grid-cols-[auto_1fr_1.4fr] lg:items-baseline lg:gap-12">
                <p className="font-display texto-degrade-2 text-h3 font-semibold leading-none lg:w-16">
                  {b.numero}
                </p>
                <h3 className="text-h3 font-medium">{b.titulo}</h3>
                <p className="text-cuerpo medida text-mid">{b.descripcion}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-hairline" />
        </div>
      </div>
    </section>
  )
}
