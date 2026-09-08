'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Palabra que rota dentro del titular de una landing (PLAN.md §5).
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

export default function RollingText({
  palabras,
  className = '',
}: {
  palabras: string[]
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
    // La máscara deja ver un renglón. El padding compensa el que agrega
    // `texto-degrade` para no recortar descendentes: sin él la palabra
    // asoma por debajo mientras se desplaza.
    <span
      ref={raiz}
      className={`relative inline-block overflow-hidden pb-[0.14em] align-bottom ${className}`}
      style={{ height: '1.08em' }}
      // El texto accesible es la primera palabra: el resto son estados
      // del mismo titular, no contenido nuevo.
      aria-label={primera}
    >
      <span data-tira className="block will-change-transform">
        {renglones.map((p, i) => (
          <span
            key={`${p}-${i}`}
            aria-hidden={i > 0}
            className="texto-degrade block whitespace-nowrap"
            style={{ height: '1.08em', lineHeight: '1.08em' }}
          >
            {p}
          </span>
        ))}
      </span>
    </span>
  )
}
