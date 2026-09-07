'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Palabra que rota dentro del titular de una landing (PLAN.md §5).
 *
 *  La palabra sale hacia arriba con máscara y entra la siguiente desde
 *  abajo. 2,2s por palabra.
 *
 *  Con reduced-motion se congela en la primera y no se monta el loop.
 */
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
      const items = gsap.utils.toArray<HTMLElement>('[data-palabra]', raiz.current)
      if (items.length === 0) return

      // Estado base, fuera del matchMedia: con reduced-motion tiene que
      // quedar la primera palabra sola, no las cuatro superpuestas.
      gsap.set(items, { yPercent: 100, opacity: 0 })
      gsap.set(items[0]!, { yPercent: 0, opacity: 1 })

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (items.length < 2) return

        // El loop avanza con un índice propio en vez de un timeline
        // encadenado: encadenar los tweens dejaba a la última palabra
        // saliendo mientras la primera ya había sido reposicionada por
        // el repeat, y quedaban frames sin ninguna visible.
        let actual = 0
        let tween: gsap.core.Timeline | null = null

        const avanzar = () => {
          const sale = items[actual]!
          const siguiente = (actual + 1) % items.length
          const entra = items[siguiente]!

          tween = gsap
            .timeline({ onComplete: () => {
              actual = siguiente
              avanzar()
            } })
            .to(sale, { yPercent: -100, opacity: 0, duration: 0.5, ease: 'power3.inOut' }, 2.2)
            .fromTo(
              entra,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
              '<',
            )
        }

        avanzar()

        return () => {
          tween?.kill()
          // Al desmontar (cambio de ruta) el estado vuelve al inicial:
          // si no, la próxima landing hereda la posición del loop viejo.
          gsap.set(items, { yPercent: 100, opacity: 0 })
          gsap.set(items[0]!, { yPercent: 0, opacity: 1 })
        }
      })
    },
    { scope: raiz },
  )

  const [primera] = palabras

  return (
    // La máscara recorta la palabra que entra y la que sale. El ancho lo
    // fija la palabra más larga, así el titular no salta de ancho.
    <span
      ref={raiz}
      className={`relative inline-grid overflow-hidden align-bottom ${className}`}
      // El texto accesible es la primera palabra: el resto son estados
      // del mismo titular, no contenido nuevo.
      aria-label={primera}
    >
      {palabras.map((p, i) => (
        <span
          key={p}
          data-palabra
          aria-hidden={i > 0}
          className="texto-degrade col-start-1 row-start-1 whitespace-nowrap"
        >
          {p}
        </span>
      ))}
    </span>
  )
}
