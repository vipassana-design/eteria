import { flota } from '@/content/plantillas/flota'

/** El timeline de eventos del día, con scroll propio.
 *
 *  No lleva `'use client'`: no tiene estado ni GSAP. Es una lista.
 *
 *  El color del punto sale del estado del vehículo —`ruta`, `demorado`,
 *  `incidencia`— más un cuarto caso, `entrega`, que no es un estado de
 *  unidad sino un hecho. Reusar la tabla de colores de la lista hace que
 *  un evento amarillo acá y un vehículo amarillo en el mapa signifiquen
 *  lo mismo, que es la mitad de lo que hace legible un panel.
 *
 *  Cada evento nombra la patente: es lo que permite cruzarlo con la
 *  lista de al lado sin que el panel tenga que resolverlo por vos.
 */
export default function Eventos() {
  const { timeline, lista } = flota

  const color = (tipo: string) =>
    tipo === 'entrega'
      ? timeline.colorEntrega
      : lista.estados[tipo as keyof typeof lista.estados].color

  return (
    <section
      style={{ background: 'var(--superficie)', borderColor: 'var(--borde)' }}
      className="flex min-h-0 flex-col overflow-hidden rounded-xl border lg:flex-1"
    >
      <div
        style={{ borderBottomColor: 'var(--borde)' }}
        className="shrink-0 border-b px-3 py-2.5"
      >
        <h2 className="text-[13px] font-semibold">{timeline.titulo}</h2>
      </div>

      <div
        data-lenis-prevent
        className="min-h-[160px] flex-1 overflow-y-auto overscroll-contain px-3 py-3"
      >
        <ul className="flex flex-col">
          {timeline.eventos.map((e, i) => {
            const ultimo = i === timeline.eventos.length - 1
            const c = color(e.tipo)

            return (
              <li key={`${e.hora}-${e.patente}`} className="relative flex gap-2.5 pb-3.5">
                {/* La línea que une los eventos, salvo en el último. */}
                {ultimo ? null : (
                  <span
                    style={{ background: 'var(--borde)' }}
                    className="absolute left-[4.5px] top-4 h-[calc(100%-16px)] w-px"
                  />
                )}

                <span
                  style={{
                    background: c,
                    filter: `drop-shadow(0 0 4px ${c}aa)`,
                  }}
                  className="relative z-10 mt-1 size-2.5 shrink-0 rounded-full"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[11.5px] font-medium leading-snug">
                      {e.titulo}
                    </p>
                    <span
                      style={{
                        color: 'var(--texto-tenue)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                      className="shrink-0 text-[10px]"
                    >
                      {e.hora}
                    </span>
                  </div>

                  <p
                    style={{ color: 'var(--texto-medio)' }}
                    className="mt-0.5 text-[10.5px] leading-snug"
                  >
                    {e.detalle}
                  </p>

                  <span
                    style={{
                      background: 'var(--superficie-alta)',
                      color: 'var(--texto-medio)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                    className="mt-1 inline-block rounded px-1.5 py-px text-[9.5px]"
                  >
                    {e.patente}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
