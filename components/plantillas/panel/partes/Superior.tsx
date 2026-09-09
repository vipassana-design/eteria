import { panel } from '@/content/plantillas/panel'

/** La topbar: breadcrumb, buscador y cuenta.
 *
 *  No lleva `'use client'`: no tiene estado ni GSAP. El buscador es un
 *  `input` real —se puede tipear— pero no filtra nada, y eso está bien:
 *  lo que la plantilla demuestra es la vista, y un buscador que filtrara
 *  la tabla competiría con el filtro por período, que es la interacción
 *  que sí vale mostrar acá.
 *
 *  El breadcrumb se arma desde `topbar.ruta`, así que agregar un nivel
 *  es tocar el contenido y no el JSX.
 */
export default function Superior() {
  const { topbar, usuario } = panel

  return (
    <header
      style={{
        background: 'var(--superficie)',
        borderBottomColor: 'var(--linea)',
      }}
      className="flex h-14 shrink-0 items-center gap-3 border-b px-3 lg:h-[57px] lg:gap-4 lg:px-5"
    >
      {/* El breadcrumb. En mobile queda solo el último nivel: los
          intermedios no caben y el que importa es dónde estás. */}
      <nav aria-label="Ubicación" className="min-w-0 shrink-0">
        <ol className="flex items-center gap-1.5 text-[12.5px]">
          {topbar.ruta.map((nivel, i) => {
            const ultimo = i === topbar.ruta.length - 1
            return (
              <li
                key={nivel}
                className={`flex items-center gap-1.5 ${ultimo ? '' : 'hidden lg:flex'}`}
              >
                <span
                  style={{
                    color: ultimo ? 'var(--texto)' : 'var(--texto-tenue)',
                    fontWeight: ultimo ? 600 : 400,
                  }}
                  className="truncate"
                >
                  {nivel}
                </span>
                {ultimo ? null : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="m4.5 3 3 3-3 3"
                      stroke="var(--texto-tenue)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* El buscador. En mobile se encoge pero no desaparece: en un
          panel de gestión es el control más usado. */}
      <div className="relative min-w-0 flex-1 lg:max-w-[380px]">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
        >
          <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--texto-tenue)" strokeWidth="1.4" />
          <path
            d="m10 10 3 3"
            stroke="var(--texto-tenue)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          placeholder={topbar.buscador}
          aria-label={topbar.buscador}
          style={{
            background: 'var(--fondo)',
            borderColor: 'var(--linea)',
            color: 'var(--texto)',
          }}
          className="h-9 w-full rounded-lg border pl-8 pr-10 text-[12.5px] outline-none placeholder:text-[var(--texto-tenue)] focus:border-[var(--acento)] focus:ring-2 focus:ring-[var(--acento-suave)]"
        />
        {/* El atajo de teclado, que todo panel muestra en el buscador. */}
        <kbd
          style={{
            background: 'var(--superficie)',
            borderColor: 'var(--linea)',
            color: 'var(--texto-tenue)',
          }}
          className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border px-1.5 py-0.5 font-sans text-[10px] lg:block"
        >
          {topbar.atajo}
        </kbd>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 lg:gap-2">
        {/* Los avisos. El número va visible y no solo en el badge de
            color: el color por sí solo no es información accesible. */}
        <button
          type="button"
          aria-label={`Avisos, ${topbar.avisos} sin leer`}
          style={{ color: 'var(--texto-medio)' }}
          className="relative grid size-9 cursor-pointer place-items-center rounded-lg transition-colors duration-200 hover:bg-[var(--fondo)]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M9 2.5a4.5 4.5 0 0 0-4.5 4.5c0 3-1.2 4-1.2 4h11.4s-1.2-1-1.2-4A4.5 4.5 0 0 0 9 2.5ZM7.3 13.5a1.8 1.8 0 0 0 3.4 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{ background: 'var(--negativo)' }}
            className="absolute right-1 top-1 grid min-w-[15px] place-items-center rounded-full px-1 text-[8.5px] font-semibold leading-[15px] tabular-nums text-white"
          >
            {topbar.avisos}
          </span>
        </button>

        <span
          style={{ background: 'var(--acento)' }}
          className="grid size-8 place-items-center rounded-full text-[11px] font-semibold text-white"
          aria-label={usuario.nombre}
          title={usuario.nombre}
        >
          {usuario.iniciales}
        </span>
      </div>
    </header>
  )
}
