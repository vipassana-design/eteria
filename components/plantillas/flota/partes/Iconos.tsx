'use client'

import { useState } from 'react'
import { flota } from '@/content/plantillas/flota'

/** La sidebar de iconos: 56px, sin texto, en desktop y en mobile.
 *
 *  **Por qué esta no colapsa.** La sidebar del panel comercial tiene
 *  240px con labels y se reduce a iconos abajo de `lg`; esta arranca en
 *  iconos y se queda igual. Es la convención de los paneles de
 *  monitoreo —el mapa se lleva todo el ancho que haya— y de paso hace
 *  que las dos plantillas de panel no se lean como la misma app con
 *  otra paleta.
 *
 *  Sin labels visibles, el nombre de cada ítem tiene que llegar por
 *  `aria-label` y `title`, nunca por un tooltip propio al hover: en
 *  touch no hay hover y con `prefers-reduced-motion` la transición está
 *  anulada (restricción de la Etapa 0).
 *
 *  Los iconos son paths inline: son seis, y una librería acá se pagaría
 *  nueve veces (`plan.md` §15).
 */

const ICONOS: Record<string, string> = {
  mapa: 'M10 17.5s5.5-5 5.5-9a5.5 5.5 0 0 0-11 0c0 4 5.5 9 5.5 9Zm0-7.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  rutas:
    'M5 15.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm10-7.4a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM5 11.9V9.3a3 3 0 0 1 3-3h4M15 8.1v2.6a3 3 0 0 1-3 3H8',
  camion:
    'M2.5 6.5h8v7h-8v-7Zm8 2.5h3l2 2.5v2h-5V9ZM6 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  chofer:
    'M10 9.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM4.8 16.5c0-2.4 2.3-4 5.2-4s5.2 1.6 5.2 4',
  alerta: 'M10 3.5 17 16H3l7-12.5Zm0 4.2v3.6m0 2.4v.1',
  informe: 'M4.5 3.5h11v13h-11v-13Zm2.5 4h6m-6 3h6m-6 3h3.5',
}

export default function Iconos() {
  const { nav, producto, usuario } = flota
  const [activo, setActivo] = useState(
    nav.findIndex((n) => 'activo' in n && n.activo),
  )

  return (
    <aside
      style={{ background: 'var(--superficie)', borderRightColor: 'var(--borde)' }}
      className="flex w-14 shrink-0 flex-col items-center border-r py-3"
    >
      {/* El logo: el cuadrado de acento con el glow que le da el
          registro premium al oscuro. */}
      <span
        style={{
          background: 'var(--acento)',
          filter: 'drop-shadow(0 0 10px rgba(124,107,245,0.5))',
        }}
        className="grid size-9 shrink-0 place-items-center rounded-[10px] text-[16px] font-semibold text-white"
        aria-label={`${producto.nombre} · ${producto.modulo}`}
        title={`${producto.nombre} · ${producto.modulo}`}
      >
        {producto.sigla}
      </span>

      <nav className="mt-4 flex flex-1 flex-col items-center gap-1">
        {nav.map((n, i) => {
          const esActivo = i === activo
          const avisos = 'avisos' in n ? n.avisos : undefined

          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setActivo(i)}
              aria-current={esActivo ? 'page' : undefined}
              // Sin label visible, el nombre va por acá. No por tooltip
              // de hover.
              aria-label={n.t}
              title={n.t}
              style={{
                background: esActivo ? 'var(--acento-suave)' : 'transparent',
                color: esActivo ? '#B5AAFF' : 'var(--texto-tenue)',
              }}
              className="relative grid size-10 cursor-pointer place-items-center rounded-[10px] transition-colors duration-200 hover:bg-white/[0.05] hover:text-[var(--texto)]"
            >
              {esActivo ? (
                <span
                  style={{ background: 'var(--acento)' }}
                  className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full"
                />
              ) : null}

              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d={ICONOS[n.icono]}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* El contador de incidencias: número visible, no un punto
                  de color a secas. */}
              {avisos ? (
                <span
                  style={{ background: 'var(--incidencia)' }}
                  className="absolute right-0.5 top-0.5 grid min-w-[15px] place-items-center rounded-full px-1 text-[8.5px] font-bold leading-[15px] tabular-nums text-[#3B0B0B]"
                >
                  {avisos}
                </span>
              ) : null}
            </button>
          )
        })}
      </nav>

      <span
        style={{ background: 'var(--superficie-alta)', color: 'var(--texto)' }}
        className="grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-semibold"
        aria-label={`${usuario.nombre} · ${usuario.rol}`}
        title={`${usuario.nombre} · ${usuario.rol}`}
      >
        {usuario.iniciales}
      </span>
    </aside>
  )
}
