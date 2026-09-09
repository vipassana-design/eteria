import { clinica } from '@/content/plantillas/clinica'

/** El pie.
 *
 *  Cierra con el nombre y la matrícula de la dirección médica, que es
 *  un requisito real de los sitios de salud en Argentina. Ese dato es
 *  el que hace que el pie se lea como el de una institución y no como
 *  un footer de plantilla.
 */
export default function Pie() {
  const { pie, marca, urgencias } = clinica

  return (
    <footer style={{ background: 'var(--tinta)' }}>
      <div className="mx-auto max-w-[1240px] px-5 py-11 lg:px-10 lg:py-14">
        <div className="grid gap-9 lg:grid-cols-[1.2fr_2fr] lg:gap-14">
          <div>
            <span className="flex items-center gap-2.5">
              <span
                style={{ background: 'var(--verde)' }}
                className="grid size-8 place-items-center rounded-lg"
              >
                <svg width="15" height="15" viewBox="0 0 17 17" aria-hidden="true">
                  <path d="M7 1.5h3v4h4v3h-4v4H7v-4H3v-3h4v-4Z" fill="#fff" />
                </svg>
              </span>
              <span className="text-[15px] font-bold text-white">{marca.nombre}</span>
            </span>

            {/* La guardia se repite acá: es el dato que alguien puede
                estar buscando con urgencia, y no debería tener que
                volver arriba. */}
            <div
              style={{ borderColor: 'rgba(255,255,255,0.14)' }}
              className="mt-5 rounded-xl border p-4"
            >
              <p className="text-[10.5px] uppercase tracking-wider text-white/50">
                {urgencias.etiqueta}
              </p>
              <p className="mt-1 text-[17px] font-bold text-white tabular-nums">
                {urgencias.tel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {pie.columnas.map((c) => (
              <div key={c.t}>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
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
