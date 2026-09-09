import { atelier } from '@/content/plantillas/atelier'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** La franja de envíos, cambios y cuotas.
 *
 *  Tres columnas separadas por hairlines verticales, sin cards ni
 *  iconos. Los iconos de camioncito y escudito son de plantilla
 *  genérica; en un sitio editorial la tipografía sola alcanza.
 *
 *  Es información que el comprador busca, así que va antes del pie y no
 *  escondida ahí adentro.
 */
export default function Servicios() {
  return (
    <section
      style={{ borderBottomColor: 'var(--linea)' }}
      className="border-b"
    >
      <Aparecer
        escalonado={0.1}
        className="mx-auto grid max-w-[1240px] grid-cols-1 px-5 sm:grid-cols-3 lg:px-10"
      >
        {atelier.servicios.map((s, i) => (
          <div
            key={s.t}
            style={{
              borderColor: 'var(--linea)',
              // El hairline va entre columnas, no alrededor: bordes
              // cerrados en cada celda serían tres cards.
              borderLeftWidth: i === 0 ? 0 : undefined,
            }}
            className="border-t py-8 sm:border-l sm:border-t-0 sm:px-8 sm:first:pl-0 lg:py-10"
          >
            <h3
              style={{ color: 'var(--tinta)', letterSpacing: '0.14em' }}
              className="text-[10px] uppercase"
            >
              {s.t}
            </h3>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-2 max-w-[34ch] text-[13px] leading-relaxed"
            >
              {s.d}
            </p>
          </div>
        ))}
      </Aparecer>
    </section>
  )
}
