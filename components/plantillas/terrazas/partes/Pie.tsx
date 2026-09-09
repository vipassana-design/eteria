import { terrazas } from '@/content/plantillas/terrazas'

/** El pie: tres columnas y el legal con la matrícula.
 *
 *  La matrícula de CUCICBA no es decoración: en la Ciudad de Buenos
 *  Aires el corretaje inmobiliario requiere matrícula y publicarla es
 *  obligatorio en los avisos. Un pie inmobiliario sin ese número es la
 *  señal de que el sitio lo hizo alguien que no conoce el rubro.
 *
 *  El fondo es la tinta y no el bronce: el bronce ya aparece en toda la
 *  página como acento, y usarlo en un bloque de este tamaño lo
 *  convertiría en el color dominante.
 */
export default function Pie() {
  const { pie, marca } = terrazas

  return (
    <footer style={{ background: 'var(--tinta)' }}>
      <div className="mx-auto max-w-[1240px] px-5 py-11 lg:px-10 lg:py-14">
        <div className="grid gap-9 lg:grid-cols-[1fr_2fr] lg:gap-14">
          <div>
            <span className="flex items-baseline gap-2">
              <span
                style={{ fontFamily: 'var(--serif)' }}
                className="text-[21px] font-semibold leading-none text-white"
              >
                {marca.nombre}
              </span>
              <span
                style={{ color: 'var(--bronce)' }}
                className="text-[10px] font-semibold uppercase tracking-[0.16em]"
              >
                {marca.bajada}
              </span>
            </span>

            <div className="mt-5">
              <a
                href="#"
                style={{ borderColor: 'var(--bronce)', color: 'var(--bronce)' }}
                className="inline-flex rounded-sm border px-4 py-2.5 text-[12.5px] font-semibold transition-colors duration-200 hover:bg-[var(--bronce)] hover:text-white"
              >
                {terrazas.cta}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {pie.columnas.map((c) => (
              <div key={c.t}>
                <h3 className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  {c.t}
                </h3>
                <ul className="mt-3.5 space-y-2">
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

        <p
          style={{ borderTopColor: 'rgba(255,255,255,0.12)' }}
          className="mt-10 border-t pt-5 text-[11.5px] text-white/45"
        >
          {pie.legal}
        </p>
      </div>
    </footer>
  )
}
