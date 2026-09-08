import Reveal from '@/components/ui/Reveal'
import TituloSeccion from '@/components/ui/TituloSeccion'
import Glow from '@/components/bg/Glow'
import { queHacemos } from '@/content/queHacemos'

/** Sección "Qué hacemos" (PLAN.md §4.3).
 *  Sin card: texto grande sobre el fondo, dos columnas asimétricas. */
export default function QueHacemos() {
  return (
    <section id="que-hacemos" className="seccion relative scroll-mt-24">
      <Glow className="-left-64 top-0" tamano={640} intensidad={0.7} />

      <div className="contenedor grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <TituloSeccion degrade={queHacemos.tituloDegrade}>{queHacemos.titulo}</TituloSeccion>

          <div className="mt-8 flex flex-col gap-6">
            {queHacemos.parrafos.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={0.08 * (i + 1)}>
                <p className="text-cuerpo-lg medida text-mid">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Tres datos. Los valores en Clash Display con degradé, el
            label debajo en --text-low. */}
        <Reveal
          variante="lateral"
          stagger={0.12}
          className="flex flex-col gap-10 lg:pt-4"
        >
          {queHacemos.datos.map((d) => (
            <div key={d.etiqueta} className="border-l border-hairline pl-6">
              {/* El tamaño de número grande queda para las cifras: es lo
                  que le da peso al bloque. La enumeración al mismo
                  tamaño ocupaba tres líneas y lo desbalanceaba. */}
              <p
                className={`font-display texto-degrade-2 font-semibold ${
                  d.esTexto ? 'text-h3 leading-snug' : 'text-h2 leading-none'
                }`}
              >
                {d.valor}
              </p>
              <p className="text-label mt-3 text-low">{d.etiqueta}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
