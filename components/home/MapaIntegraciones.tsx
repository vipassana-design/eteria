'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { integraciones, mapaUi } from '@/content/integraciones'

/** Mapa de capacidades, a la derecha de "Sobre nosotros".
 *
 *  Es la única pieza del sitio que **no es una pantalla**: los nueve
 *  mockups son capturas de producto, esto es el mapa de lo que el
 *  equipo abarca. Dice el argumento de la sección sin texto, y llega
 *  hasta soporte y mantenimiento, que es lo que sostiene el párrafo
 *  que tiene al lado: quien construyó es quien mantiene.
 *
 *  Se anima al entrar en viewport y una sola vez, no con el scroll: la
 *  sección de Proceso ya tiene una línea scroll-driven, y dos seguidas
 *  con el mismo recurso se leen como un truco repetido. Después queda
 *  el pulso en loop lento, que es lo que lo mantiene vivo.
 *
 *  **Dos disposiciones.** En desktop los seis nodos van en círculo
 *  alrededor del centro. En mobile eso no funciona: la caja se comprime
 *  al ancho de la columna y las etiquetas caerían a 9-10px, abajo del
 *  mínimo legible. Ahí el centro va arriba y los nodos en dos columnas
 *  de tres debajo, así cada etiqueta tiene media columna de ancho en
 *  lugar de un radio comprimido.
 *
 *  Se montan los dos SVG y CSS decide cuál se ve. Alternar con
 *  JavaScript pediría un estado de ancho de ventana que en el primer
 *  render no existe, y eso produce un salto al hidratar.
 */

// ─────────────────────────── Desktop ───────────────────────────

/** Caja cuadrada: los nodos van en círculo. */
const CAJA = 420
const CENTRO = CAJA / 2

/** Radio del círculo.
 *
 *  Se acortó de 148 a 132 al pasar de los sistemas externos a las
 *  capacidades: "Infraestructura" y "Mantenimiento" son bastante más
 *  largas que "Stock" o "CRM", y con el radio anterior las etiquetas de
 *  los costados se salían de la caja. */
const RADIO = 132

// ──────────────────────────── Mobile ────────────────────────────

/** Más alta que ancha: el centro arriba y los nodos debajo. */
const CAJA_M = { ancho: 320, alto: 292 }
const CENTRO_M = { x: CAJA_M.ancho / 2, y: 44 }

/** Radio del bloque central, en cada modo. */
const R_CENTRO = 46
const R_CENTRO_M = 40

interface Punto {
  x: number
  y: number
  /** De qué lado de su nodo va la etiqueta. */
  alDerecha: boolean
}

/** Posición sobre el círculo (desktop).
 *
 *  El primero arranca arriba (-90°) y el resto se reparte, así queda
 *  simétrico respecto del eje vertical: es lo que lo hace leer como un
 *  sistema y no como una constelación al azar. */
function posicion(i: number, total: number): Punto {
  const angulo = (-90 + (360 / total) * i) * (Math.PI / 180)
  return {
    x: CENTRO + Math.cos(angulo) * RADIO,
    y: CENTRO + Math.sin(angulo) * RADIO,
    // Del lado izquierdo la etiqueta va a la derecha del nodo y
    // viceversa: si no, se sale de la caja.
    alDerecha: Math.cos(angulo) >= -0.1,
  }
}

/** Posición en mobile: dos columnas de tres debajo del centro.
 *
 *  Los nodos van sobre el borde exterior de cada columna y la etiqueta
 *  hacia adentro, así las dos columnas se leen espejadas y ninguna
 *  etiqueta cruza el eje. */
function posicionMobile(i: number): Punto {
  const col = i % 2
  return {
    x: col === 0 ? 30 : CAJA_M.ancho - 30,
    y: 116 + Math.floor(i / 2) * 58,
    alDerecha: col === 0,
  }
}

/** Un SVG del mapa.
 *
 *  Los dos modos comparten el markup y solo cambia la geometría, así
 *  que la animación sirve igual para los dos. */
function Svg({ mobile }: { mobile: boolean }) {
  const caja = mobile ? CAJA_M : { ancho: CAJA, alto: CAJA }
  const centro = mobile ? CENTRO_M : { x: CENTRO, y: CENTRO }
  const rCentro = mobile ? R_CENTRO_M : R_CENTRO
  const pos = (i: number) => (mobile ? posicionMobile(i) : posicion(i, integraciones.length))
  // Los ids del degradé no pueden repetirse entre los dos SVG.
  const suf = mobile ? 'm' : 'd'

  return (
    <svg
      viewBox={`0 0 ${caja.ancho} ${caja.alto}`}
      className="size-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        {/* Los radios se apagan hacia afuera: la lectura va del centro
            a las capacidades y no al revés. */}
        <radialGradient id={`radioMapa-${suf}`}>
          <stop offset="0%" stopColor="var(--color-violet-500)" stopOpacity={0.55} />
          <stop offset="100%" stopColor="var(--color-violet-500)" stopOpacity={0.12} />
        </radialGradient>
      </defs>

      {/* El círculo de referencia da la sensación de sistema cerrado sin
          competir con los radios. En mobile no hay círculo que trazar. */}
      {!mobile ? (
        <circle
          cx={centro.x}
          cy={centro.y}
          r={RADIO}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={1}
        />
      ) : null}

      {integraciones.map((n, i) => {
        const { x, y, alDerecha } = pos(i)
        return (
          <g key={n.nombre}>
            <line
              data-radio
              x1={centro.x}
              y1={centro.y}
              x2={x}
              y2={y}
              stroke={`url(#radioMapa-${suf})`}
              strokeWidth={1.5}
            />

            <g data-nodo>
              {/* El relleno es el color del fondo, para tapar el radio
                  que pasa por debajo. */}
              <circle cx={x} cy={y} r={7} fill="var(--color-base)" />
              <circle
                cx={x}
                cy={y}
                r={7}
                fill="none"
                stroke="var(--color-violet-500)"
                strokeWidth={1.6}
              />
              <text
                x={alDerecha ? x + 14 : x - 14}
                y={y + 4}
                textAnchor={alDerecha ? 'start' : 'end'}
                fontSize={12.5}
                fill="var(--color-mid)"
              >
                {n.nombre}
              </text>
            </g>
          </g>
        )
      })}

      {/* Los pulsos van después de los radios y antes del centro: sobre
          la línea que recorren, debajo del bloque del que salen. */}
      {integraciones.map((n) => (
        <circle
          key={`pulso-${n.nombre}`}
          data-pulso
          r={3}
          fill="var(--color-violet-300)"
          opacity={0}
        />
      ))}

      <g data-centro>
        <circle
          cx={centro.x}
          cy={centro.y}
          r={rCentro}
          fill="var(--color-elevated)"
          stroke="var(--color-violet-500)"
          strokeWidth={1.6}
        />
        {/* Las dos líneas al mismo tamaño y peso: "a medida" es parte
            del nombre, no una nota al pie. */}
        {mapaUi.centro.map((linea, i) => (
          <text
            key={linea}
            x={centro.x}
            y={centro.y + (i === 0 ? -3 : 14)}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="var(--color-hi)"
          >
            {linea}
          </text>
        ))}
      </g>
    </svg>
  )
}

export default function MapaIntegraciones() {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: el diagrama completo y quieto.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-radio]', { strokeDashoffset: 0 })
        gsap.set('[data-nodo]', { opacity: 1, scale: 1 })
        gsap.set('[data-pulso]', { opacity: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Solo el SVG visible: el otro está en `display: none`, sus
        // medidas son 0 y el pulso terminaría apuntando al origen.
        const visible = gsap.utils
          .toArray<HTMLElement>('[data-modo]', raiz.current)
          .find((el) => el.offsetParent !== null)
        if (!visible) return

        const radios = gsap.utils.toArray<SVGLineElement>('[data-radio]', visible)
        const pulsos = gsap.utils.toArray<SVGCircleElement>('[data-pulso]', visible)
        const esMobile = visible.dataset.modo === 'mobile'
        const centro = esMobile ? CENTRO_M : { x: CENTRO, y: CENTRO }
        const pos = (i: number) =>
          esMobile ? posicionMobile(i) : posicion(i, integraciones.length)

        const tl = gsap.timeline({
          scrollTrigger: { trigger: raiz.current, start: 'top 78%', once: true },
        })

        // El centro primero: es de donde sale todo lo demás.
        tl.from(visible.querySelectorAll('[data-centro]'), {
          opacity: 0,
          scale: 0.7,
          duration: 0.5,
          ease: 'back.out(1.8)',
        })

        for (const r of radios) {
          const largo = r.getTotalLength?.() ?? RADIO
          gsap.set(r, { strokeDasharray: largo, strokeDashoffset: largo })
        }
        tl.to(radios, { strokeDashoffset: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, 0.2)

        // Cada nodo aparece cuando su radio lo alcanza.
        tl.from(
          visible.querySelectorAll('[data-nodo]'),
          { opacity: 0, scale: 0.5, duration: 0.42, stagger: 0.07, ease: 'back.out(2.2)' },
          0.55,
        )

        // El pulso: un punto que viaja del centro a cada nodo, en loop
        // lento y desfasado. Es lo que mantiene el diagrama vivo
        // después de la entrada, sin pedir atención.
        const loops = pulsos.map((punto, i) => {
          const { x, y } = pos(i)
          return gsap.fromTo(
            punto,
            { attr: { cx: centro.x, cy: centro.y }, opacity: 0 },
            {
              attr: { cx: x, cy: y },
              opacity: 1,
              duration: 1.6,
              ease: 'power1.inOut',
              repeat: -1,
              repeatDelay: 2.4,
              delay: 1.4 + i * 0.5,
              // Se apaga al llegar: si desapareciera de golpe se vería
              // el salto de vuelta al centro.
              onRepeat: () => gsap.set(punto, { opacity: 0 }),
            },
          )
        })

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
          for (const l of loops) l.kill()
        }
      })
    },
    { scope: raiz },
  )

  return (
    <div ref={raiz}>
      <div data-modo="mobile" className="mx-auto max-w-[320px] lg:hidden">
        <Svg mobile />
      </div>
      <div data-modo="desktop" className="hidden lg:block">
        <Svg mobile={false} />
      </div>
    </div>
  )
}
