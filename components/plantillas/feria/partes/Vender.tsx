import { feria } from '@/content/plantillas/feria'
import Aparecer from '@/components/plantillas/comun/Aparecer'
import Cifra from '@/components/plantillas/comun/Cifra'

/** El bloque para vendedores: la segunda audiencia del marketplace.
 *
 *  Es la sección que ni Atelier ni Vértice necesitan, porque venden lo
 *  propio. Acá el sitio tiene dos lados, y mostrar solo el de compra
 *  dejaría afuera la mitad del negocio.
 *
 *  Los tres pasos van numerados y con el detalle concreto de cada uno
 *  —cuándo se acredita el dinero, dónde se deja el paquete—, que es lo
 *  que un vendedor quiere saber antes de registrarse. "Publicá, vendé,
 *  cobrá" sin explicar cómo es relleno.
 */
export default function Vender() {
  const { vender } = feria

  return (
    <section style={{ background: 'var(--tinta)' }}>
      <div className="mx-auto max-w-[1280px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div>
            <p
              style={{ color: '#FDBA74' }}
              className="text-[11.5px] font-semibold uppercase tracking-[0.14em]"
            >
              {vender.volanta}
            </p>
            <h2 className="mt-2.5 text-[26px] font-bold leading-tight text-white lg:text-[32px]">
              {vender.titulo}
            </h2>
            <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-white/65">
              {vender.bajada}
            </p>

            {/* Las cifras del lado vendedor. */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/12 pt-6">
              {vender.cifras.map((c) => (
                <div key={c.t}>
                  <p className="text-[22px] font-bold leading-none text-white lg:text-[26px]">
                    <Cifra hasta={c.n} separador={c.n > 999} />
                    {c.s ?? ''}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-snug text-white/55">{c.t}</p>
                </div>
              ))}
            </div>

            <a
              href="#"
              style={{ background: 'var(--naranja)' }}
              className="mt-8 inline-block rounded-lg px-6 py-3.5 text-[13.5px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              {vender.cta}
            </a>
          </div>

          <Aparecer escalonado={0.1} className="space-y-0">
            {vender.pasos.map((p) => (
              <div
                key={p.n}
                className="flex gap-5 border-t border-white/12 py-5 last:border-b last:border-white/12"
              >
                <span
                  style={{ color: 'var(--naranja)' }}
                  className="text-[15px] font-bold tabular-nums"
                >
                  {p.n}
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{p.t}</h3>
                  <p className="mt-1 max-w-[52ch] text-[13px] leading-relaxed text-white/60">
                    {p.d}
                  </p>
                </div>
              </div>
            ))}
          </Aparecer>
        </div>
      </div>
    </section>
  )
}
