import { legajos } from '@/content/plantillas/legajos'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** El calendario de licencias del mes: una fila por persona, una barra
 *  por licencia.
 *
 *  **Es un diagrama de Gantt, no un calendario de casilleros.** Un mes
 *  en grilla de 7×5 no puede mostrar que la licencia de una persona
 *  arranca el 4 y termina el 11: habría que pintar ocho casilleros
 *  sueltos y el tramo se pierde. Con una fila por persona y los 30 días
 *  como columnas, el tramo se ve como lo que es —un rango— y se pueden
 *  comparar dos licencias de un vistazo, que es justamente para lo que
 *  RR. HH. mira esta vista: saber cuántos faltan la misma semana.
 *
 *  Está armado con CSS grid de 30 columnas y `grid-column: desde /
 *  hasta+1`. No hace falta aritmética de píxeles: el grid resuelve el
 *  ancho de cada día solo, y a cualquier ancho de contenedor.
 *
 *  **El nombre y las fechas van escritos en la barra**, no en un
 *  tooltip: con `prefers-reduced-motion` el `!important` de
 *  `globals.css` anula las transiciones, y en touch no hay hover
 *  (restricción de la Etapa 0). En mobile, donde la barra es angosta,
 *  el nombre queda a la izquierda en su columna fija y el rango pasa
 *  abajo.
 *
 *  El día de hoy lleva una línea vertical y el número marcado: en un
 *  calendario de gestión, ubicar el hoy es lo primero que se busca.
 */
export default function Calendario() {
  const { calendario } = legajos
  const dias = Array.from({ length: calendario.dias }, (_, i) => i + 1)

  // Qué día de la semana cae cada número, para marcar los fines de
  // semana. `primerDia` es 0 para lunes.
  const finDeSemana = (d: number) => {
    const idx = (calendario.primerDia + d - 1) % 7
    return idx === 5 || idx === 6
  }

  return (
    <Aparecer>
      <section
        style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
        className="overflow-hidden rounded-xl border"
      >
        <div
          style={{ borderBottomColor: 'var(--linea)' }}
          className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b px-3.5 py-3 lg:px-4"
        >
          <div className="min-w-0">
            <h2 className="text-[14px] font-semibold">{calendario.titulo}</h2>
            <p
              style={{ color: 'var(--texto-medio)' }}
              className="mt-0.5 text-[11.5px]"
            >
              {calendario.bajada}
            </p>
          </div>

          {/* La referencia de tipos de licencia. */}
          <ul className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1">
            {Object.entries(calendario.tipos).map(([t, c]) => (
              <li
                key={t}
                style={{ color: 'var(--texto-medio)' }}
                className="flex items-center gap-1.5 text-[10.5px]"
              >
                <span
                  style={{ background: c }}
                  className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* El calendario. Scrollea horizontal en mobile: 30 columnas no
            se leen a 390px, y comprimirlas dejaría barras de 3px. */}
        <div data-lenis-prevent className="overflow-x-auto">
          <div className="min-w-[720px] px-3.5 py-3 lg:px-4">
            {/* La fila de encabezado: número de día y letra de la
                semana. */}
            <div className="flex items-end gap-2">
              <span className="w-[132px] shrink-0" aria-hidden="true" />
              <div
                className="grid flex-1 gap-px"
                style={{ gridTemplateColumns: `repeat(${calendario.dias}, minmax(0, 1fr))` }}
              >
                {dias.map((d) => {
                  const hoy = d === calendario.hoy
                  const fds = finDeSemana(d)
                  return (
                    <div key={d} className="text-center">
                      <span
                        style={{ color: 'var(--texto-tenue)' }}
                        className="block text-[8px] leading-none"
                      >
                        {calendario.semana[(calendario.primerDia + d - 1) % 7]}
                      </span>
                      <span
                        style={{
                          background: hoy ? 'var(--acento)' : 'transparent',
                          color: hoy
                            ? '#FFFFFF'
                            : fds
                              ? 'var(--texto-tenue)'
                              : 'var(--texto-medio)',
                        }}
                        className="mt-0.5 inline-grid size-[17px] place-items-center rounded-full text-[9.5px] font-medium tabular-nums"
                      >
                        {d}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Las filas de licencia. */}
            <ul className="mt-2 flex flex-col gap-1.5">
              {calendario.tramos.map((t) => (
                <li key={`${t.quien}-${t.desde}`} className="flex items-center gap-2">
                  {/* La columna fija con la persona. */}
                  <div className="flex w-[132px] shrink-0 items-center gap-1.5">
                    <span
                      style={{ background: t.color }}
                      className="grid size-[22px] shrink-0 place-items-center rounded-full text-[8.5px] font-semibold text-white"
                      aria-hidden="true"
                    >
                      {t.iniciales}
                    </span>
                    <span
                      style={{ color: 'var(--texto-medio)' }}
                      className="min-w-0 truncate text-[10.5px]"
                    >
                      {t.quien}
                    </span>
                  </div>

                  {/* La pista de 30 días con la barra encima. */}
                  <div
                    className="relative grid flex-1 gap-px"
                    style={{
                      gridTemplateColumns: `repeat(${calendario.dias}, minmax(0, 1fr))`,
                    }}
                  >
                    {/* Los casilleros de fondo, para que la pista se lea
                        como calendario y no como una barra suelta. */}
                    {dias.map((d) => (
                      <span
                        key={d}
                        style={{
                          background: finDeSemana(d)
                            ? 'var(--linea-suave)'
                            : 'var(--fondo)',
                          // Fila 1 explícita: los casilleros, la línea
                          // de hoy y la barra comparten la única fila,
                          // si no el grid apila tres filas.
                          gridRow: 1,
                        }}
                        className="h-6 rounded-[2px]"
                      />
                    ))}

                    {/* La línea del día de hoy. Va como ítem del grid en
                        la fila 1 —no `absolute`—: `gridColumn` sobre un
                        elemento posicionado no ubica nada, porque sale
                        del flujo del grid. */}
                    <span
                      style={{
                        background: 'var(--acento)',
                        gridColumn: `${calendario.hoy} / ${calendario.hoy + 1}`,
                        gridRow: 1,
                        opacity: 0.45,
                      }}
                      className="pointer-events-none h-6 w-px justify-self-center"
                      aria-hidden="true"
                    />

                    {/* La barra de la licencia. */}
                    <span
                      style={{
                        background: calendario.tipos[t.tipo],
                        gridColumn: `${t.desde} / ${t.hasta + 1}`,
                        gridRow: 1,
                      }}
                      className="z-10 flex h-6 items-center overflow-hidden rounded-[4px] px-1.5"
                    >
                      <span className="truncate text-[9.5px] font-medium tabular-nums text-white">
                        {t.tipo} · {t.desde} al {t.hasta}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Aparecer>
  )
}
