import { atelier } from '@/content/plantillas/atelier'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las reseñas.
 *
 *  Lo que las hace creíbles es que **no son todas de cinco estrellas**.
 *  Una tiene cuatro y explica por qué ("tardó 6 días en llegar a
 *  Córdoba"). Tres reseñas perfectas y entusiastas son la señal más
 *  clara de testimonios inventados; una crítica menor con su motivo
 *  concreto vuelve creíbles a las otras dos.
 *
 *  Las fechas van relativas ("hace 3 días") porque es como las muestra
 *  una tienda real, y de paso no envejecen.
 */
export default function Resenas() {
  const { resenas } = atelier

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-14 lg:px-10 lg:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2
          style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
          className="text-[26px] leading-tight lg:text-[32px]"
        >
          {resenas.titulo}
        </h2>

        {/* El promedio y el total: sin eso, tres reseñas suenan a que
            son las únicas tres. */}
        <p style={{ color: 'var(--tinta-tenue)' }} className="text-[12px]">
          <span className="tabular-nums">4,8</span> de 5 ·{' '}
          <span className="tabular-nums">212</span> opiniones
        </p>
      </div>

      <Aparecer
        escalonado={0.1}
        className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3"
      >
        {resenas.items.map((r) => (
          <figure
            key={r.quien}
            style={{ borderTopColor: 'var(--linea)' }}
            className="border-t pt-5"
          >
            <div className="flex gap-0.5" aria-label={`${r.estrellas} de 5 estrellas`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
                  <path
                    d="M5.5 0l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8L0 4l3.8-.6L5.5 0Z"
                    fill={i < r.estrellas ? 'var(--terracota)' : 'var(--linea)'}
                  />
                </svg>
              ))}
            </div>

            <blockquote
              style={{ color: 'var(--tinta-media)' }}
              className="mt-3.5 text-[13.5px] leading-relaxed"
            >
              {r.texto}
            </blockquote>

            <figcaption
              style={{ color: 'var(--tinta-tenue)' }}
              className="mt-3 text-[11px]"
            >
              {r.quien} · {r.cuando}
            </figcaption>
          </figure>
        ))}
      </Aparecer>
    </section>
  )
}
