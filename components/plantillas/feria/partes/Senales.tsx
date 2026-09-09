import { feria } from '@/content/plantillas/feria'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las tres señales de confianza.
 *
 *  En un marketplace son lo que reemplaza a la marca propia: quien
 *  compra no conoce al vendedor, así que la garantía tiene que venir de
 *  la plataforma. Por eso van arriba, antes de los productos, y no
 *  escondidas en el pie como en una tienda tradicional.
 */
export default function Senales() {
  return (
    <section style={{ background: 'var(--blanco)', borderBottomColor: 'var(--linea)' }} className="border-b">
      <Aparecer
        escalonado={0.08}
        className="mx-auto grid max-w-[1280px] gap-6 px-5 py-8 sm:grid-cols-3 lg:px-8 lg:py-10"
      >
        {feria.señales.map((s) => (
          <div key={s.t} className="flex gap-3">
            {/* El tilde en un círculo: es el gesto de "verificado" que
                estos sitios usan, dibujado y no de librería. */}
            <span
              style={{ background: 'var(--naranja-claro)' }}
              className="grid size-8 shrink-0 place-items-center rounded-full"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7.5l3 3 6-6.5" stroke="var(--naranja)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <h3 style={{ color: 'var(--tinta)' }} className="text-[13.5px] font-bold">
                {s.t}
              </h3>
              <p
                style={{ color: 'var(--tinta-media)' }}
                className="mt-1 max-w-[40ch] text-[12.5px] leading-relaxed"
              >
                {s.d}
              </p>
            </div>
          </div>
        ))}
      </Aparecer>
    </section>
  )
}
