import { vertice } from '@/content/plantillas/vertice'

/** El pie de Vértice.
 *
 *  Cierra con la aclaración de que los precios son en pesos y con IVA
 *  incluido: en una tienda argentina es un dato que se busca, y su
 *  ausencia es una de las cosas que hacen dudar de un ecommerce.
 */
export default function Pie() {
  const { pie, marca } = vertice

  return (
    <footer style={{ background: 'var(--tinta)' }}>
      <div className="mx-auto max-w-[1280px] px-5 py-11 lg:px-8 lg:py-14">
        <div className="grid gap-9 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <span className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 26 26" aria-hidden="true">
                <path d="M13 2 24 22H2L13 2Z" fill="#60A5FA" />
                <path d="M13 9l5.5 10h-11L13 9Z" fill="var(--tinta)" />
              </svg>
              <span className="text-[16px] font-bold text-white">{marca.nombre}</span>
            </span>
            <p className="mt-3 max-w-[34ch] text-[12.5px] leading-relaxed text-white/55">
              Tres sucursales en el AMBA y envíos a todo el país.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {pie.columnas.map((c) => (
              <div key={c.t}>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                  {c.t}
                </h3>
                <ul className="mt-3 space-y-2">
                  {c.items.map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-[13px] text-white/75 transition-colors duration-200 hover:text-white"
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

        <p className="mt-10 border-t border-white/12 pt-5 text-[11.5px] text-white/40">
          {pie.legal}
        </p>
      </div>
    </footer>
  )
}
