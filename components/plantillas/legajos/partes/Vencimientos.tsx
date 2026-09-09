import { legajos } from '@/content/plantillas/legajos'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** La lista de vencimientos de documentación.
 *
 *  El orden viene del contenido y los vencidos van primero: en un
 *  sistema de RR. HH. la lista de vencimientos se mira para actuar, así
 *  que lo que ya venció tiene que estar arriba y no ordenado por fecha
 *  a secas.
 *
 *  Cada fila lleva la barra de color del estado a la izquierda, el
 *  estado escrito en un chip y los días en texto ("12 días vencido",
 *  "en 6 días"). Tres capas para el mismo dato, y es a propósito: el
 *  color solo no es accesible, y la fecha sola obliga a hacer la cuenta
 *  mentalmente.
 *
 *  No lleva `'use client'`: es una lista sin estado ni GSAP propio. El
 *  `Aparecer` de afuera sí es un componente de cliente, pero eso no
 *  obliga a este a serlo.
 */
export default function Vencimientos() {
  const { vencimientos } = legajos

  return (
    <Aparecer>
      <section
        style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
        className="overflow-hidden rounded-xl border"
      >
        <div
          style={{ borderBottomColor: 'var(--linea)' }}
          className="border-b px-3.5 py-3 lg:px-4"
        >
          <h2 className="text-[14px] font-semibold">{vencimientos.titulo}</h2>
          <p
            style={{ color: 'var(--texto-medio)' }}
            className="mt-0.5 text-[11.5px]"
          >
            {vencimientos.bajada}
          </p>
        </div>

        <ul>
          {vencimientos.items.map((v) => {
            const est = vencimientos.estados[v.estado]

            return (
              <li
                key={`${v.quien}-${v.doc}`}
                style={{ borderBottomColor: 'var(--linea-suave)' }}
                className="relative flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-3.5 py-2.5 transition-colors duration-150 last:border-b-0 hover:bg-[var(--fondo)] lg:px-4"
              >
                {/* La barra del estado, pegada al borde izquierdo. */}
                <span
                  style={{ background: est?.barra }}
                  className="absolute left-0 top-0 h-full w-[3px]"
                  aria-hidden="true"
                />

                <span
                  style={{ background: v.color }}
                  className="grid size-8 shrink-0 place-items-center rounded-full text-[10.5px] font-semibold text-white"
                  aria-hidden="true"
                >
                  {v.iniciales}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium leading-tight">
                    {v.doc}
                  </p>
                  <p
                    style={{ color: 'var(--texto-tenue)' }}
                    className="mt-0.5 truncate text-[10.5px] leading-tight"
                  >
                    {v.quien}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  <div className="text-right">
                    <p
                      style={{ color: 'var(--texto-medio)' }}
                      className="whitespace-nowrap text-[11.5px] tabular-nums"
                    >
                      {v.vence}
                    </p>
                    <p
                      style={{ color: est?.texto }}
                      className="mt-0.5 whitespace-nowrap text-[10px] font-medium tabular-nums"
                    >
                      {vencimientos.leyendaDias(v.dias)}
                    </p>
                  </div>

                  <span
                    style={{ background: est?.fondo, color: est?.texto }}
                    className="hidden whitespace-nowrap rounded-full px-2 py-[3px] text-[10px] font-medium sm:block"
                  >
                    {v.estado}
                  </span>

                  <button
                    type="button"
                    style={{ color: 'var(--acento)' }}
                    className="hidden cursor-pointer whitespace-nowrap text-[11px] font-medium transition-opacity duration-200 hover:opacity-70 lg:block"
                  >
                    {vencimientos.accion}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </Aparecer>
  )
}
