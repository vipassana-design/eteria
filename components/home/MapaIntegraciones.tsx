'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { integraciones, mapaUi } from '@/content/integraciones'

/** Mapa de integraciones, a la derecha de "Sobre nosotros".
 *
 *  Es la única pieza del sitio que **no es una pantalla**: los nueve
 *  mockups son capturas de producto, esto es el plano de cómo se
 *  conecta lo que se construye. Dice el argumento de la sección sin
 *  texto —entendemos con qué se integra tu operación— que es la
 *  traducción visual del párrafo que está al lado.
 *
 *  Se anima al entrar en viewport y una sola vez, no con el scroll: la
 *  sección de Proceso ya tiene una línea scroll-driven, y dos seguidas
 *  con el mismo recurso se leen como un truco repetido. Después queda
 *  el pulso en loop lento, que es lo que lo mantiene vivo.
 *
 *  En mobile no se monta: son seis nodos alrededor de un centro, y a
 *  340px de ancho el diagrama deja de ser legible.
 */

/** La caja del SVG. Cuadrada: los nodos se distribuyen en un círculo. */
const CAJA = 420
const CENTRO = CAJA / 2
/** Radio del círculo de nodos. Deja lugar para las etiquetas. */
const RADIO = 148

/** Posición de cada nodo sobre el círculo.
 *
 *  El primer nodo arranca arriba (-90°) y el resto se reparte. Así el
 *  diagrama queda simétrico respecto del eje vertical, que es lo que lo
 *  hace leer como un sistema y no como una constelación al azar. */
function posicion(i: number, total: number) {
  const angulo = (-90 + (360 / total) * i) * (Math.PI / 180)
  return {
    x: CENTRO + Math.cos(angulo) * RADIO,
    y: CENTRO + Math.sin(angulo) * RADIO,
    /** Del lado izquierdo la etiqueta va a la derecha del nodo y
     *  viceversa: si no, se sale de la caja. */
    alDerecha: Math.cos(angulo) >= -0.1,
  }
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

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const radios = gsap.utils.toArray<SVGLineElement>('[data-radio]', raiz.current)
        const pulsos = gsap.utils.toArray<SVGCircleElement>('[data-pulso]', raiz.current)

        const tl = gsap.timeline({
          scrollTrigger: { trigger: raiz.current, start: 'top 76%', once: true },
        })

        // El centro primero: es el sistema, y todo lo demás se conecta
        // a él.
        tl.from('[data-centro]', { opacity: 0, scale: 0.7, duration: 0.5, ease: 'back.out(1.8)' })

        // Los radios se dibujan hacia afuera.
        for (const r of radios) {
          const largo = r.getTotalLength?.() ?? RADIO
          gsap.set(r, { strokeDasharray: largo, strokeDashoffset: largo })
        }
        tl.to(radios, { strokeDashoffset: 0, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, 0.2)

        // Y cada nodo aparece cuando su radio lo alcanza.
        tl.from(
          '[data-nodo]',
          { opacity: 0, scale: 0.5, duration: 0.42, stagger: 0.07, ease: 'back.out(2.2)' },
          0.55,
        )

        // El pulso: un punto que viaja del centro a cada nodo, en loop
        // lento y desfasado. Es lo que mantiene el diagrama vivo
        // después de la entrada, sin pedir atención.
        const loops = pulsos.map((punto, i) => {
          const { x, y } = posicion(i, pulsos.length)
          return gsap.fromTo(
            punto,
            { attr: { cx: CENTRO, cy: CENTRO }, opacity: 0 },
            {
              attr: { cx: x, cy: y },
              opacity: 1,
              duration: 1.6,
              ease: 'power1.inOut',
              repeat: -1,
              repeatDelay: 2.4,
              delay: 1.4 + i * 0.5,
              // El punto se apaga al llegar: si desapareciera de golpe
              // se vería el salto de vuelta al centro.
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
    <div ref={raiz} className="hidden lg:block" aria-hidden="true">
      <svg viewBox={`0 0 ${CAJA} ${CAJA}`} className="size-full overflow-visible">
        <defs>
          {/* El degradé de los radios: más presente cerca del centro y
              apagándose hacia afuera, así la lectura va del sistema a
              las integraciones y no al revés. */}
          <radialGradient id="radioMapa">
            <stop
              offset="0%"
              stopColor="var(--color-violet-500)"
              stopOpacity={0.55}
            />
            <stop offset="100%" stopColor="var(--color-violet-500)" stopOpacity={0.12} />
          </radialGradient>
        </defs>

        {/* Círculo de referencia, muy tenue: da la sensación de sistema
            cerrado sin competir con los radios. */}
        <circle
          cx={CENTRO}
          cy={CENTRO}
          r={RADIO}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={1}
        />

        {/* Radios y nodos */}
        {integraciones.map((n, i) => {
          const { x, y, alDerecha } = posicion(i, integraciones.length)
          return (
            <g key={n.nombre}>
              <line
                data-radio
                x1={CENTRO}
                y1={CENTRO}
                x2={x}
                y2={y}
                stroke="url(#radioMapa)"
                strokeWidth={1.5}
              />

              <g data-nodo>
                {/* El nodo: un círculo con el aro del acento. El relleno
                    es el color del fondo para tapar el radio que pasa
                    por debajo. */}
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

        {/* Los pulsos, uno por radio. Van al final para quedar sobre
            los radios pero debajo del centro. */}
        {integraciones.map((n) => (
          <circle
            key={`pulso-${n.nombre}`}
            data-pulso
            r={3}
            fill="var(--color-violet-300)"
            opacity={0}
          />
        ))}

        {/* El centro: el sistema. */}
        <g data-centro>
          <circle
            cx={CENTRO}
            cy={CENTRO}
            r={46}
            fill="var(--color-elevated)"
            stroke="var(--color-violet-500)"
            strokeWidth={1.6}
          />
          <text
            x={CENTRO}
            y={CENTRO - 4}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="var(--color-hi)"
          >
            {mapaUi.centro}
          </text>
          <text
            x={CENTRO}
            y={CENTRO + 13}
            textAnchor="middle"
            fontSize={10.5}
            fill="var(--color-low)"
          >
            {mapaUi.centroNota}
          </text>
        </g>
      </svg>
    </div>
  )
}
