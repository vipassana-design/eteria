'use client'

import { useState } from 'react'
import { legajos } from '@/content/plantillas/legajos'

/** La barra superior: logo, nav, buscador y cuenta.
 *
 *  A diferencia de los dos paneles, esta plantilla no tiene sidebar: el
 *  nav es horizontal, arriba. Es lo que hace un sistema de gestión que
 *  se recorre scrolleando —una sidebar fija con una página que scrollea
 *  deja una columna vacía de 240px al costado— y de paso separa esta
 *  plantilla de las otras dos de software a medida.
 *
 *  Va `sticky`: en una página que scrollea, el buscador y el nav tienen
 *  que seguir a mano. Es `position: sticky` y no GSAP porque el alto de
 *  la barra no cambia al scrollear: no hay nada que animar.
 *
 *  En mobile el nav pasa a una fila con scroll horizontal propio. Es la
 *  única excepción al "sin desborde horizontal": desborda **el nav**,
 *  que tiene su `overflow-x-auto`, no el documento. Cinco pestañas no
 *  entran en 390px y un hamburguesa acá sería peor: en un sistema
 *  interno las secciones se cambian todo el tiempo.
 */
export default function Superior() {
  const { producto, usuario, topbar, nav } = legajos
  const [activo, setActivo] = useState(nav.findIndex((n) => 'activo' in n && n.activo))

  return (
    <header
      style={{
        background: 'var(--superficie)',
        borderBottomColor: 'var(--linea)',
      }}
      className="sticky top-0 z-40 border-b"
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-4 py-2.5 lg:gap-4 lg:px-6">
        {/* El logo. */}
        <div className="flex shrink-0 items-center gap-2.5">
          <span
            style={{ background: 'var(--acento)' }}
            className="grid size-8 place-items-center rounded-lg text-[14px] font-semibold text-white"
          >
            {producto.sigla}
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-[13px] font-semibold leading-tight">
              {producto.nombre}
            </span>
            <span
              style={{ color: 'var(--texto-tenue)' }}
              className="text-[10px] leading-tight"
            >
              {producto.modulo}
            </span>
          </span>
        </div>

        {/* El buscador. */}
        <div className="relative min-w-0 flex-1 lg:max-w-[340px]">
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
            className="h-9 w-full rounded-lg border pl-8 pr-3 text-[12.5px] outline-none placeholder:text-[var(--texto-tenue)] focus:border-[var(--acento)] focus:ring-2 focus:ring-[var(--acento-suave)]"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {/* El período que se está mirando. */}
          <span
            style={{
              background: 'var(--fondo)',
              borderColor: 'var(--linea)',
              color: 'var(--texto-medio)',
            }}
            className="hidden rounded-lg border px-2.5 py-1.5 text-[11.5px] tabular-nums lg:block"
          >
            {topbar.periodo}
          </span>

          {/* Las acciones. La principal se esconde en mobile —el botón
              de alta abre un formulario largo, que no es lo que se hace
              desde el teléfono— y las demás quedan. */}
          {topbar.acciones.map((a) => (
            <div key={a.t} className={'principal' in a && a.principal ? '' : 'hidden lg:block'}>
              <button
                type="button"
                style={
                  'principal' in a && a.principal
                    ? { background: 'var(--acento)', color: '#FFFFFF', borderColor: 'transparent' }
                    : {
                        background: 'var(--superficie)',
                        color: 'var(--texto-medio)',
                        borderColor: 'var(--linea)',
                      }
                }
                className="cursor-pointer whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[11.5px] font-medium transition-all duration-200 hover:brightness-[0.97]"
              >
                {a.t}
              </button>
            </div>
          ))}

          <span
            style={{ background: 'var(--acento)' }}
            className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
            aria-label={`${usuario.nombre} · ${usuario.rol}`}
            title={`${usuario.nombre} · ${usuario.rol}`}
          >
            {usuario.iniciales}
          </span>
        </div>
      </div>

      {/* El nav. En mobile scrollea horizontalmente dentro de su propia
          fila: el documento no desborda. */}
      <nav
        data-lenis-prevent
        style={{ borderTopColor: 'var(--linea-suave)' }}
        className="overflow-x-auto border-t"
      >
        <ul className="mx-auto flex w-max min-w-full max-w-[1180px] items-center gap-1 px-4 lg:px-6">
          {nav.map((n, i) => {
            const esActivo = i === activo
            return (
              <li key={n.t}>
                <button
                  type="button"
                  onClick={() => setActivo(i)}
                  aria-current={esActivo ? 'page' : undefined}
                  style={{
                    color: esActivo ? 'var(--acento)' : 'var(--texto-medio)',
                    borderBottomColor: esActivo ? 'var(--acento)' : 'transparent',
                  }}
                  className="cursor-pointer whitespace-nowrap border-b-2 px-2.5 py-2 text-[12.5px] font-medium transition-colors duration-200 hover:text-[var(--texto)]"
                >
                  {n.t}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
