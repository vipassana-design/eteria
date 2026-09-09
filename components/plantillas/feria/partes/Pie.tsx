import { feria } from '@/content/plantillas/feria'

/** El pie de Feria.
 *
 *  La aclaración legal es propia del rubro: en un marketplace los
 *  precios varían según el vendedor, y decirlo es lo que diferencia el
 *  pie de una plaza del de una tienda.
 */
export default function Pie() {
  const { pie, marca } = feria

  return (
    <footer style={{ background: 'var(--blanco)', borderTopColor: 'var(--linea)' }} className="border-t">
      <div className="mx-auto max-w-[1280px] px-5 py-11 lg:px-8 lg:py-12">
        <div className="grid gap-9 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <span className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 26 26" aria-hidden="true">
                <path d="M3 10h20v13H3V10Z" fill="var(--naranja-claro)" />
                <path d="M3 10 6 3h14l3 7H3Z" fill="var(--naranja)" />
                <path d="M10 10v13M16 10v13" stroke="var(--naranja)" strokeWidth="1.3" />
              </svg>
              <span style={{ color: 'var(--tinta)' }} className="text-[16px] font-bold">
                {marca.nombre}
              </span>
            </span>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-3 max-w-[34ch] text-[12.5px] leading-relaxed"
            >
              1.240 tiendas vendiendo en todo el país.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {pie.columnas.map((c) => (
              <div key={c.t}>
                <h3
                  style={{ color: 'var(--tinta)' }}
                  className="text-[11px] font-semibold uppercase tracking-wider"
                >
                  {c.t}
                </h3>
                <ul className="mt-3 space-y-2">
                  {c.items.map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        style={{ color: 'var(--tinta-media)' }}
                        className="text-[12.5px] transition-colors duration-200 hover:text-[var(--naranja)]"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p
          style={{ borderTopColor: 'var(--linea)', color: 'var(--tinta-tenue)' }}
          className="mt-9 border-t pt-5 text-[11.5px]"
        >
          {pie.legal}
        </p>
      </div>
    </footer>
  )
}
