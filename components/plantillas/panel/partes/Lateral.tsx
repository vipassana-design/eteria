'use client'

import { useState } from 'react'
import { panel } from '@/content/plantillas/panel'

/** La sidebar del panel: 240px fijos en desktop, iconos en mobile.
 *
 *  **Cómo colapsa en mobile.** A 390px una sidebar de 240px se come el
 *  62% del ancho, así que abajo de `lg` se reduce a una columna de
 *  iconos de 56px pegada a la izquierda. Se descartó la barra inferior
 *  —la otra opción— porque el panel ya tiene dos zonas de scroll
 *  interno y una barra abajo competiría con el pulgar justo donde está
 *  el scroll de la tabla.
 *
 *  Con la sidebar en iconos el label no puede depender del hover: en
 *  touch no hay hover, y con `prefers-reduced-motion` la transición
 *  está anulada. Cada ítem lleva `aria-label` y `title`, y el contador
 *  de pendientes va como número visible sobre el icono, no en un
 *  tooltip.
 *
 *  Los iconos son paths inline y no una librería: son siete, y sumar
 *  una dependencia de iconos por plantilla es exactamente lo que
 *  `plan.md` §15 evita.
 */

/** Los siete iconos del nav, en un mapa. Trazo de 1.5 sobre una grilla
 *  de 20, que es la escala que usa el resto del panel. */
const ICONOS: Record<string, string> = {
  resumen: 'M3 10.5 10 4l7 6.5M5 9.5V16h10V9.5',
  pedidos: 'M4 6h12l-1 10H5L4 6Zm3 0V4.5A3 3 0 0 1 13 4.5V6',
  clientes:
    'M10 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4.5 16.5c0-2.5 2.5-4.2 5.5-4.2s5.5 1.7 5.5 4.2',
  productos: 'M10 3.5 16.5 7v6L10 16.5 3.5 13V7L10 3.5Zm0 0v13M3.5 7l6.5 3.5 6.5-3.5',
  facturacion: 'M5 3.5h10v13l-2.5-1.8-2.5 1.8-2.5-1.8L5 16.5v-13Zm2.5 4h5m-5 3.5h5',
  informes: 'M4 16.5V8m4 8.5V4.5m4 12V10m4 6.5V6.5',
  config:
    'M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM10 2.8v1.6m0 11.2v1.6M4.9 4.9l1.2 1.2m7.8 7.8 1.2 1.2M2.8 10h1.6m11.2 0h1.6M4.9 15.1l1.2-1.2m7.8-7.8 1.2-1.2',
}

export default function Lateral() {
  const { nav, producto, usuario } = panel

  // Qué ítem está seleccionado. Es un panel de demostración, pero el
  // nav responde: un menú donde el click no hace nada se nota.
  const [activo, setActivo] = useState(
    nav.items.findIndex((i) => 'activo' in i && i.activo),
  )

  return (
    <aside
      style={{ background: 'var(--lateral)' }}
      className="flex w-14 shrink-0 flex-col lg:w-[240px]"
    >
      {/* El logo. En mobile queda solo el cuadrado de acento. */}
      <div
        style={{ borderBottomColor: 'rgba(255,255,255,0.08)' }}
        className="flex h-14 items-center gap-2.5 border-b px-3 lg:h-[57px] lg:px-4"
      >
        <span
          style={{ background: 'var(--acento)' }}
          className="grid size-8 shrink-0 place-items-center rounded-lg text-[15px] font-semibold text-white"
        >
          {producto.sigla}
        </span>
        <span className="hidden min-w-0 flex-col lg:flex">
          <span className="truncate text-[13px] font-semibold leading-tight text-white">
            {producto.nombre}
          </span>
          <span
            style={{ color: 'var(--lateral-texto)' }}
            className="truncate text-[10.5px] leading-tight"
          >
            {producto.modulo}
          </span>
        </span>
      </div>

      <nav className="flex-1 py-3">
        <p
          style={{ color: '#6B7280', letterSpacing: '0.08em' }}
          className="mb-1.5 hidden px-4 text-[9.5px] font-semibold uppercase lg:block"
        >
          {nav.titulo}
        </p>

        <ul className="flex flex-col gap-0.5 px-2">
          {nav.items.map((item, i) => {
            const esActivo = i === activo
            const pendientes = 'pendientes' in item ? item.pendientes : undefined

            return (
              <li key={item.t}>
                <button
                  type="button"
                  onClick={() => setActivo(i)}
                  aria-current={esActivo ? 'page' : undefined}
                  // En mobile el nav es solo iconos: el label tiene que
                  // llegar por accesibilidad, no por hover.
                  aria-label={item.t}
                  title={item.t}
                  style={{
                    background: esActivo ? 'rgba(37,99,235,0.16)' : 'transparent',
                    color: esActivo ? '#93C5FD' : 'var(--lateral-texto)',
                  }}
                  className="relative flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg px-0 py-2.5 text-left text-[12.5px] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white lg:justify-start lg:px-3 lg:py-2"
                >
                  {/* La barra del ítem activo. En mobile es lo único que
                      distingue al seleccionado, así que no puede faltar. */}
                  {esActivo ? (
                    <span
                      style={{ background: 'var(--acento)' }}
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full"
                    />
                  ) : null}

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      d={ICONOS[item.icono]}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="hidden flex-1 truncate lg:block">{item.t}</span>

                  {/* El contador de pendientes. En desktop es un chip a
                      la derecha; en mobile, un punto con el número
                      sobre el icono. */}
                  {pendientes ? (
                    <>
                      <span
                        style={{ background: 'var(--acento)' }}
                        className="hidden shrink-0 rounded-full px-1.5 py-px text-[10px] font-semibold tabular-nums text-white lg:block"
                      >
                        {pendientes}
                      </span>
                      <span
                        style={{ background: 'var(--acento)' }}
                        className="absolute right-1.5 top-1.5 grid min-w-[15px] place-items-center rounded-full px-1 text-[8.5px] font-semibold leading-[15px] tabular-nums text-white lg:hidden"
                      >
                        {pendientes}
                      </span>
                    </>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* La cuenta, al pie. En mobile queda solo el círculo. */}
      <div
        style={{ borderTopColor: 'rgba(255,255,255,0.08)' }}
        className="flex items-center gap-2.5 border-t p-3 lg:px-4"
      >
        <span
          style={{ background: 'var(--acento)' }}
          className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
        >
          {usuario.iniciales}
        </span>
        <span className="hidden min-w-0 flex-col lg:flex">
          <span className="truncate text-[12px] leading-tight text-white">
            {usuario.nombre}
          </span>
          <span
            style={{ color: 'var(--lateral-texto)' }}
            className="truncate text-[10.5px] leading-tight"
          >
            {usuario.rol}
          </span>
        </span>
      </div>
    </aside>
  )
}
