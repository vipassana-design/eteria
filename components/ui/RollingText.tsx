'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Palabra que rota dentro de un titular (PLAN.md §4.2 y §5).
 *
 *  Lo usan el hero de la home y el de las tres landings.
 *
 *  Las palabras se apilan en una tira vertical y la tira se desplaza de
 *  a un renglón: la que sale y la que entra se mueven como un solo
 *  bloque, así no hay dos animaciones que cruzarse ni forma de que se
 *  superpongan. La máscara del contenedor deja ver un renglón por vez.
 *
 *  La primera palabra está duplicada al final de la tira: cuando la tira
 *  llega a ese duplicado, vuelve al inicio sin transición y el salto es
 *  invisible porque el contenido es idéntico.
 *
 *  Con reduced-motion se queda en la primera y no se monta el loop.
 */

/** Cuánto se queda quieta cada palabra, en segundos (PLAN.md §5). */
const ESPERA = 2.2

/** Cuánto tarda el desplazamiento de un renglón al siguiente. */
const DESPLAZAMIENTO = 0.55

/** Alto de cada renglón de la tira, y por lo tanto de la ventana.
 *
 *  Tiene que contener el descendente de la "g" o "y": sin la utilidad
 *  `texto-degrade` no hay padding que lo proteja, y con
 *  `background-clip: text` Chrome recorta lo que sale de la caja. A
 *  1.22em el descendente entra completo, y como la ventana mide lo
 *  mismo, al subir un renglón no queda tinta visible. */
const ALTO_RENGLON = '1.22em'

export default function RollingText({
  palabras,
  className = 'inline-block',
}: {
  palabras: string[]
  /** Incluir la clase de display: el componente no la fija. */
  className?: string
}) {
  const raiz = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const tira = raiz.current?.querySelector<HTMLElement>('[data-tira]')
      if (!tira || palabras.length < 2) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ repeat: -1 })

        // Un paso por palabra: la tira sube un renglón cada vez. El
        // último paso llega al duplicado de la primera.
        //
        // yPercent es relativo al alto de la TIRA, que tiene un renglón
        // más que palabras por el duplicado: el divisor es la cantidad
        // de renglones, no de palabras.
        const renglones = palabras.length + 1

        palabras.forEach((_, i) => {
          tl.to(
            tira,
            {
              yPercent: (-100 * (i + 1)) / renglones,
              duration: DESPLAZAMIENTO,
              ease: 'power2.inOut',
            },
            `+=${ESPERA}`,
          )
        })

        // Vuelta al inicio sin animar: la tira está mostrando el
        // duplicado de la primera palabra, así que el reset no se ve.
        tl.set(tira, { yPercent: 0 })

        return () => {
          tl.kill()
          gsap.set(tira, { yPercent: 0 })
        }
      })
    },
    { scope: raiz, dependencies: [palabras] },
  )

  const [primera] = palabras
  // La primera se repite al final para cerrar el loop.
  const renglones = [...palabras, primera]

  return (
    // La ventana deja ver un renglón por vez.
    //
    // Los renglones NO usan la utilidad `texto-degrade`: esa utilidad
    // agrega `padding-block-end: 0.08em` con margen negativo para que
    // Chrome no recorte los descendentes, y ese padding pinta tinta más
    // abajo de lo que el renglón ocupa en el layout. Al subir un renglón
    // exacto, el descendente de la "g" de "catálogo" quedaba dentro de
    // la ventana.
    //
    // El degradé se declara en cada renglón, y la caja del renglón es
    // más alta que su line-height para que el descendente entre completo
    // sin necesidad de padding.
    <span
      ref={raiz}
      // El display lo define el consumidor: en el hero de la home el
      // tramo rotante ocupa su propia línea (block) y en las landings va
      // en el flujo del titular (inline-block, el default).
      className={`relative overflow-hidden align-bottom ${className}`}
      style={{
        height: ALTO_RENGLON,
        // La ventana es más alta que la línea del título para contener
        // el descendente; el margen negativo devuelve esa diferencia al
        // flujo, así el titular no gana alto de más.
        marginBottom: '-0.17em',
      }}
      // Marca para que la secuencia de entrada del hero lo excluya de
      // su animación por máscara: este wrapper ya recorta y su tira ya
      // usa yPercent.
      data-rotante
      // El texto accesible es la primera palabra: el resto son estados
      // del mismo titular, no contenido nuevo.
      aria-label={primera}
    >
      <span data-tira className="block will-change-transform">
        {renglones.map((p, i) => (
          <span
            key={`${p}-${i}`}
            aria-hidden={i > 0}
            className="block whitespace-nowrap"
            style={{
              height: ALTO_RENGLON,
              // El line-height sigue al de los títulos (1.05) y no al
              // alto de la caja: la caja es más alta solo para contener
              // el descendente, no para separar los renglones.
              lineHeight: '1.05em',
              // El degradé va por renglón y no en la tira: en la tira se
              // desplazaría con ella y cada palabra tomaría un tramo
              // distinto de la rampa. Se declara acá en vez de usar la
              // utilidad `texto-degrade` para no arrastrar su padding.
              backgroundImage: 'var(--grad-brand)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {p}
          </span>
        ))}
      </span>
    </span>
  )
}
