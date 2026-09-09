import { vertice } from '@/content/plantillas/vertice'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** La franja de garantía, cambios y asesoramiento.
 *
 *  En tecnología es lo que decide la compra: el precio se compara en
 *  cinco tiendas, la garantía y el servicio en el país no. Va antes del
 *  pie porque es información de decisión, no de trámite.
 */
export default function Garantia() {
  return (
    <section
      style={{ borderTopColor: 'var(--linea)' }}
      className="border-t"
    >
      <Aparecer
        escalonado={0.08}
        className="mx-auto grid max-w-[1280px] gap-6 px-5 py-10 sm:grid-cols-3 lg:px-8 lg:py-12"
      >
        {vertice.garantia.items.map((g) => (
          <div key={g.t}>
            <h3
              style={{ color: 'var(--tinta)' }}
              className="text-[14px] font-bold"
            >
              {g.t}
            </h3>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-1.5 max-w-[38ch] text-[13px] leading-relaxed"
            >
              {g.d}
            </p>
          </div>
        ))}
      </Aparecer>
    </section>
  )
}
