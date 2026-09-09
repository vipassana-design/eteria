'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { panel } from '@/content/plantillas/panel'
import type { PuntoFacturacion } from '@/content/plantillas/panel'

/** El gráfico de facturación: dos series, barras y línea.
 *
 *  **Por qué dos formas y no dos líneas.** La serie del período va en
 *  barras y la de comparación en línea. Con dos líneas del mismo grosor
 *  hay que ir a la leyenda para saber cuál es cuál; con barra contra
 *  línea la lectura es inmediata y la comparación se ve como lo que es:
 *  una referencia sobre el dato principal.
 *
 *  Está dibujado en SVG con un `viewBox` y coordenadas calculadas a
 *  mano. No hay librería de charts y no la va a haber: son 40 líneas de
 *  aritmética, y una dependencia acá se pagaría nueve veces (`plan.md`
 *  §15).
 *
 *  **La escala se recalcula por período.** El máximo sale de las dos
 *  series juntas, no de una constante: con 7 días los valores son
 *  cientos de miles y con 90 días son decenas de millones. Una escala
 *  fija dejaría las barras de 7d pegadas al piso.
 *
 *  Las barras entran con un `scaleY` desde la base cada vez que cambia
 *  el período —`dependencies` del `useGSAP`—, así el cambio de datos se
 *  ve en lugar de aparecer de golpe. Con `prefers-reduced-motion`
 *  quedan puestas, sin animación.
 */
interface Props {
  serie: PuntoFacturacion[]
  comparado: string
}

/** El viewBox del gráfico. Las medidas son del sistema del SVG, no
 *  píxeles: el `preserveAspectRatio` lo estira al contenedor. */
const A = 720
const AL = 200
const PAD = { arriba: 12, abajo: 26, izq: 44, der: 8 }

export default function Facturacion({ serie, comparado }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const { grafico } = panel

  // La escala: el máximo de las dos series, redondeado hacia arriba
  // para que la grilla caiga en números limpios.
  const crudo = Math.max(...serie.flatMap((p) => [p.facturado, p.anterior]))
  const paso = Math.pow(10, Math.floor(Math.log10(crudo))) / 2
  const techo = Math.ceil(crudo / paso) * paso

  const anchoUtil = A - PAD.izq - PAD.der
  const altoUtil = AL - PAD.arriba - PAD.abajo
  const paso_x = anchoUtil / serie.length
  const y = (v: number) => PAD.arriba + altoUtil - (v / techo) * altoUtil
  const cx = (i: number) => PAD.izq + paso_x * i + paso_x / 2

  // El ancho de la barra: más angosta cuando hay más puntos, para que
  // 7 días y 3 meses se lean igual de bien.
  const anchoBarra = Math.min(38, paso_x * 0.44)

  // La línea de comparación, como path.
  const linea = serie
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${cx(i).toFixed(1)} ${y(p.anterior).toFixed(1)}`)
    .join(' ')

  // Cuatro líneas de grilla, con su etiqueta en millones.
  const grilla = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    v: techo * f,
    y: y(techo * f),
  }))

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: todo puesto en su lugar. Va como rama explícita
      // porque `gsap.from` deja el estado inicial escrito si el tween
      // no llega a correr.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-barra]', { scaleY: 1, opacity: 1 })
        gsap.set('[data-linea], [data-punto]', { opacity: 1 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline()

        tl.from('[data-barra]', {
          scaleY: 0,
          // El origen en la base: una barra que crece desde el centro
          // no se lee como barra.
          transformOrigin: 'center bottom',
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.04,
        }).from(
          '[data-linea], [data-punto]',
          { opacity: 0, duration: 0.4, ease: 'power1.out' },
          0.15,
        )

        return () => tl.kill()
      })
    },
    // Cambiar de período redibuja: el tween tiene que volver a correr.
    { scope: raiz, dependencies: [serie] },
  )

  return (
    <section
      ref={raiz}
      style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
      className="flex shrink-0 flex-col rounded-xl border p-3 lg:p-4"
    >
      <div className="mb-2 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <h2 className="text-[13px] font-semibold leading-tight">
            {grafico.titulo}
          </h2>
          <p
            style={{ color: 'var(--texto-tenue)' }}
            className="mt-0.5 text-[10.5px] tabular-nums"
          >
            {comparado}
          </p>
        </div>

        {/* La leyenda. Cada serie con la forma que tiene en el gráfico
            —cuadrado la barra, línea la comparación—, no dos cuadrados
            de distinto color. */}
        <ul className="flex shrink-0 items-center gap-3">
          {grafico.series.map((s) => (
            <li
              key={s.id}
              style={{ color: 'var(--texto-medio)' }}
              className="flex items-center gap-1.5 text-[10.5px]"
            >
              {s.id === 'facturado' ? (
                <span
                  style={{ background: 'var(--acento)' }}
                  className="h-2.5 w-2.5 rounded-[2px]"
                />
              ) : (
                <span
                  style={{ background: 'var(--texto-tenue)' }}
                  className="h-[2px] w-3.5 rounded-full"
                />
              )}
              {s.t}
            </li>
          ))}
        </ul>
      </div>

      {/* El gráfico. `h-[132px]` en mobile y `h-full` en desktop: en el
          one page la card estira y el SVG la acompaña. */}
      <div className="min-h-0 flex-1">
        <svg
          viewBox={`0 0 ${A} ${AL}`}
          preserveAspectRatio="none"
          className="h-[132px] w-full lg:h-[150px]"
          role="img"
          aria-label={`${grafico.titulo} por período, con la comparación del período anterior`}
        >
          {/* La grilla y las etiquetas del eje Y. */}
          {grilla.map((g) => (
            <g key={g.v}>
              <line
                x1={PAD.izq}
                y1={g.y}
                x2={A - PAD.der}
                y2={g.y}
                stroke="var(--linea-suave)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={PAD.izq - 8}
                y={g.y + 3}
                textAnchor="end"
                fill="var(--texto-tenue)"
                style={{ fontSize: '9px', fontVariantNumeric: 'tabular-nums' }}
              >
                {g.v === 0
                  ? '0'
                  : `${(g.v / 1_000_000).toLocaleString('es-AR', {
                      maximumFractionDigits: 1,
                    })}${grafico.sufijoEje}`}
              </text>
            </g>
          ))}

          {/* Las barras del período. */}
          {serie.map((p, i) => (
            <rect
              key={p.x}
              data-barra
              x={cx(i) - anchoBarra / 2}
              y={y(p.facturado)}
              width={anchoBarra}
              height={Math.max(1, AL - PAD.abajo - y(p.facturado))}
              rx="3"
              fill="var(--acento)"
            />
          ))}

          {/* La línea del período anterior, arriba de las barras. */}
          <path
            data-linea
            d={linea}
            fill="none"
            stroke="var(--texto-tenue)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 3"
            vectorEffect="non-scaling-stroke"
          />
          {serie.map((p, i) => (
            <circle
              key={`${p.x}-pt`}
              data-punto
              cx={cx(i)}
              cy={y(p.anterior)}
              r="2.5"
              fill="var(--superficie)"
              stroke="var(--texto-tenue)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* El eje X. */}
          {serie.map((p, i) => (
            <text
              key={`${p.x}-lb`}
              x={cx(i)}
              y={AL - 8}
              textAnchor="middle"
              fill="var(--texto-tenue)"
              style={{ fontSize: '9.5px' }}
            >
              {p.x}
            </text>
          ))}
        </svg>
      </div>
    </section>
  )
}
