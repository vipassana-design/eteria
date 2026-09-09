'use client'

import { panel } from '@/content/plantillas/panel'
import type { Kpi } from '@/content/plantillas/panel'

/** Los cuatro KPIs y el filtro de período.
 *
 *  **El filtro es la interacción principal de la plantilla.** No cambia
 *  un label: cambia los cuatro valores, los cuatro deltas, la serie del
 *  gráfico y el recuento de la tabla. El estado vive en `Panel.tsx`
 *  porque tres partes distintas lo consumen; acá solo llega el juego de
 *  datos ya resuelto.
 *
 *  No se usa `Cifra` para los valores, y es deliberado: `Cifra` cuenta
 *  desde cero al entrar en viewport, con `once: true`. Los KPIs cambian
 *  al tocar el filtro, o sea muchas veces y sin que medie scroll, así
 *  que el conteo no volvería a dispararse y el número quedaría
 *  congelado en el valor del primer período. Lo que sí se toma de
 *  `Cifra` es lo que importa acá: `tabular-nums`, para que el ancho no
 *  baile al cambiar de rango.
 *
 *  El delta lleva flecha **y** signo, no solo color: verde y rojo por sí
 *  solos no son información accesible. En "Entregas demoradas" el color
 *  se invierte —bajar es bueno— y por eso el dato vive en el contenido
 *  y no en una regla del render.
 */
interface Props {
  periodo: '7d' | '30d' | '90d'
  alCambiarPeriodo: (p: '7d' | '30d' | '90d') => void
  datos: { rango: string; comparado: string; kpis: Kpi[] }
}

export default function Indicadores({ periodo, alCambiarPeriodo, datos }: Props) {
  const formatear = (k: Kpi) =>
    `${k.prefijo ?? ''}${k.valor.toLocaleString('es-AR')}${k.sufijo ?? ''}`

  return (
    <section className="shrink-0">
      {/* La cabecera con el filtro. El rango de fechas va escrito al
          lado: el label "7 días" no dice qué siete días. */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[15px] font-semibold leading-tight lg:text-[16px]">
            {panel.vista}
          </h1>
          <p
            style={{ color: 'var(--texto-tenue)' }}
            className="mt-0.5 text-[11.5px] tabular-nums"
          >
            {datos.rango}
          </p>
        </div>

        {/* El segmentado del período. */}
        <div
          role="group"
          aria-label="Período"
          style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
          className="flex shrink-0 items-center gap-0.5 rounded-lg border p-0.5"
        >
          {panel.periodos.map((p) => {
            const activo = p.id === periodo
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => alCambiarPeriodo(p.id)}
                aria-pressed={activo}
                style={{
                  background: activo ? 'var(--acento)' : 'transparent',
                  color: activo ? '#FFFFFF' : 'var(--texto-medio)',
                }}
                className="cursor-pointer rounded-[6px] px-2.5 py-1.5 text-[11.5px] font-medium tabular-nums transition-colors duration-200 hover:not-aria-pressed:bg-[var(--fondo)]"
              >
                {p.t}
              </button>
            )
          })}
        </div>
      </div>

      {/* Los cuatro KPIs. A 390px van 2×2: en una sola columna la fila
          mide 4 cards de alto y se come el viewport, que en un one page
          no sobra. */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
        {datos.kpis.map((k) => {
          // Un delta positivo no siempre es bueno: en entregas
          // demoradas subir es lo malo.
          const bueno = k.bajarEsBueno ? k.delta < 0 : k.delta > 0
          const color = bueno ? 'var(--positivo)' : 'var(--negativo)'
          const sube = k.delta > 0

          return (
            <article
              key={k.etiqueta}
              style={{
                background: 'var(--superficie)',
                borderColor: 'var(--linea)',
              }}
              className="rounded-xl border p-3 lg:p-3.5"
            >
              <p
                style={{ color: 'var(--texto-medio)' }}
                className="truncate text-[11px] font-medium"
              >
                {k.etiqueta}
              </p>

              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                  className="text-[19px] font-semibold leading-none lg:text-[22px]"
                >
                  {formatear(k)}
                </span>

                {/* El delta: flecha, signo y color. Los tres, no uno. */}
                <span
                  style={{ color }}
                  className="flex items-center gap-0.5 text-[11px] font-semibold tabular-nums"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                    style={{ transform: sube ? 'none' : 'rotate(180deg)' }}
                  >
                    <path
                      d="M5 8V2m0 0L2.2 4.8M5 2l2.8 2.8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {sube ? '+' : '−'}
                  {Math.abs(k.delta).toLocaleString('es-AR', {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                  %
                </span>
              </div>

              <p
                style={{ color: 'var(--texto-tenue)' }}
                className="mt-1.5 truncate text-[10.5px] tabular-nums"
              >
                {k.pie}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
