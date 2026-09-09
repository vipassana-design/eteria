import { panel } from '@/content/plantillas/panel'

/** El panel derecho: actividad reciente y pendientes del día.
 *
 *  Tiene su propio scroll, igual que la tabla —`overflow-y-auto` más
 *  `data-lenis-prevent`—, y por eso son los dos únicos lugares donde se
 *  puede scrollear: el documento no se mueve.
 *
 *  El bloque de pendientes va abajo y **fuera del scroll**: es lo que
 *  hay que resolver hoy, y en un panel de gestión eso no se esconde
 *  scrolleando. La lista de actividad, que es histórica, sí.
 *
 *  En mobile la columna se apila al final del contenido y pierde el
 *  scroll propio —lo hereda del contenedor de la zona de trabajo—:
 *  a 390px un panel de 300px al costado no cabe, y anidar un scroll
 *  dentro de otro en touch es la forma más rápida de que la página se
 *  sienta rota.
 */
export default function Costado() {
  const { actividad, pendientes } = panel

  return (
    <aside
      style={{
        background: 'var(--superficie)',
        borderColor: 'var(--linea)',
      }}
      className="flex shrink-0 flex-col border-t lg:min-h-0 lg:w-[290px] lg:border-l lg:border-t-0 xl:w-[320px]"
    >
      <div
        style={{ borderBottomColor: 'var(--linea)' }}
        className="flex shrink-0 items-center justify-between gap-2 border-b px-4 py-2.5 lg:h-[45px]"
      >
        <h2 className="text-[13px] font-semibold">{actividad.titulo}</h2>
        <button
          type="button"
          style={{ color: 'var(--acento)' }}
          className="cursor-pointer text-[11px] font-medium transition-opacity duration-200 hover:opacity-70"
        >
          {actividad.enlace}
        </button>
      </div>

      {/* La lista de actividad, con su scroll. */}
      <div
        data-lenis-prevent
        className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 lg:min-h-0"
      >
        <ul className="flex flex-col">
          {actividad.items.map((a, i) => {
            const ultimo = i === actividad.items.length - 1
            return (
              <li key={`${a.objeto}-${a.cuando}`} className="relative flex gap-3 pb-3.5">
                {/* La línea vertical que une los eventos. No va en el
                    último, si no queda un rabito colgando. */}
                {ultimo ? null : (
                  <span
                    style={{ background: 'var(--linea)' }}
                    className="absolute left-[13px] top-8 h-[calc(100%-24px)] w-px"
                  />
                )}

                <span
                  style={{ background: a.color }}
                  className="relative z-10 grid size-[27px] shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white"
                  aria-hidden="true"
                >
                  {a.iniciales}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] leading-snug">
                    <span className="font-semibold">{a.quien}</span>{' '}
                    <span style={{ color: 'var(--texto-medio)' }}>{a.accion}</span>{' '}
                    <span
                      style={{ color: actividad.tipos[a.tipo] }}
                      className="font-medium tabular-nums"
                    >
                      {a.objeto}
                    </span>
                  </p>
                  <p
                    style={{ color: 'var(--texto-tenue)' }}
                    className="mt-0.5 text-[10px] tabular-nums"
                  >
                    {a.cuando}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Los pendientes: fuera del scroll, siempre a la vista. */}
      <div
        style={{ borderTopColor: 'var(--linea)', background: 'var(--fondo)' }}
        className="shrink-0 border-t px-4 py-3"
      >
        <p
          style={{ color: 'var(--texto-tenue)', letterSpacing: '0.05em' }}
          className="mb-2 text-[9.5px] font-semibold uppercase"
        >
          {pendientes.titulo}
        </p>
        <ul className="flex flex-col gap-1.5">
          {pendientes.items.map((p) => (
            <li key={p.t} className="flex items-center justify-between gap-2">
              <span
                style={{ color: 'var(--texto-medio)' }}
                className="min-w-0 truncate text-[11px]"
              >
                {p.t}
              </span>
              {/* Los urgentes en rojo, el resto en gris. El número está
                  siempre: el color es refuerzo. */}
              <span
                style={{
                  background: p.urgente ? '#FEF2F2' : 'var(--superficie)',
                  color: p.urgente ? 'var(--negativo)' : 'var(--texto-medio)',
                  borderColor: p.urgente ? '#FECACA' : 'var(--linea)',
                }}
                className="shrink-0 rounded-md border px-1.5 py-px text-[10.5px] font-semibold tabular-nums"
              >
                {p.n}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
