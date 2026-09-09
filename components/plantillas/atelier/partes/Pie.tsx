'use client'

import { atelier } from '@/content/plantillas/atelier'

/** El pie: boletín arriba y las columnas debajo.
 *
 *  El formulario del boletín tiene un `<input type="email">` real, y
 *  eso importa por una razón técnica: es el caso que verifica que
 *  `color-scheme: light` funciona dentro del iframe. Sin el reset de la
 *  Etapa 0, el campo se renderizaría oscuro sobre el fondo claro de la
 *  plantilla.
 *
 *  El bloque del local con dirección y horario es lo que hace que una
 *  tienda se lea como un negocio y no como un catálogo: un ecommerce
 *  sin domicilio ni horario se parece a una plantilla.
 */
export default function Pie() {
  const { boletin, pie } = atelier

  return (
    <footer style={{ background: 'var(--papel)' }}>
      {/* El boletín, sobre fondo propio para separarlo del catálogo. */}
      <div style={{ borderTopColor: 'var(--linea)' }} className="border-t">
        <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
          <div className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <h2
                style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
                className="text-[24px] leading-tight lg:text-[30px]"
              >
                {boletin.titulo}
              </h2>
              <p
                style={{ color: 'var(--tinta-media)' }}
                className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed"
              >
                {boletin.bajada}
              </p>
            </div>

            <div>
              <form
                // Sin backend: la plantilla es una demostración.
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2.5 sm:flex-row"
              >
                <label className="flex-1">
                  <span className="sr-only">{boletin.campo}</span>
                  <input
                    type="email"
                    placeholder={boletin.campo}
                    style={{
                      borderColor: 'var(--linea)',
                      background: '#FFFFFF',
                      color: 'var(--tinta)',
                    }}
                    className="w-full border px-4 py-3 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--tinta)]"
                  />
                </label>
                <button
                  type="submit"
                  style={{ background: 'var(--tinta)', color: 'var(--papel)' }}
                  className="px-7 py-3 text-[11px] uppercase tracking-[0.12em] transition-opacity duration-200 hover:opacity-85"
                >
                  {boletin.cta}
                </button>
              </form>
              <p
                style={{ color: 'var(--tinta-tenue)' }}
                className="mt-2.5 text-[11px]"
              >
                {boletin.nota}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Las columnas. */}
      <div style={{ borderTopColor: 'var(--linea)' }} className="border-t">
        <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-14">
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
            {pie.columnas.map((c) => (
              <div key={c.t}>
                <h3
                  style={{ color: 'var(--tinta)', letterSpacing: '0.14em' }}
                  className="text-[10px] uppercase"
                >
                  {c.t}
                </h3>
                <ul className="mt-3.5 space-y-2">
                  {c.items.map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        style={{ color: 'var(--tinta-media)' }}
                        className="text-[12.5px] transition-colors duration-200 hover:text-[var(--terracota)]"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* El local: dirección y horario reales de un negocio. */}
            <div>
              <h3
                style={{ color: 'var(--tinta)', letterSpacing: '0.14em' }}
                className="text-[10px] uppercase"
              >
                {pie.local.t}
              </h3>
              <address
                style={{ color: 'var(--tinta-media)' }}
                className="mt-3.5 space-y-1 text-[12.5px] not-italic leading-relaxed"
              >
                <p>{pie.local.dir}</p>
                <p style={{ color: 'var(--tinta-tenue)' }}>{pie.local.hora}</p>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTopColor: 'var(--linea)' }} className="border-t">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-6 lg:px-10">
          <p style={{ color: 'var(--tinta-tenue)' }} className="text-[11px]">
            {pie.legal}
          </p>
          <div className="flex items-center gap-4">
            {['Instagram', 'Pinterest'].map((r) => (
              <a
                key={r}
                href="#"
                style={{ color: 'var(--tinta-tenue)' }}
                className="text-[11px] transition-colors duration-200 hover:text-[var(--tinta)]"
              >
                {r}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
