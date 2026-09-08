'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Glow de sección (PLAN.md §2.5).
 *
 *  Se posiciona detrás de una sección clave y se desplaza a distinta
 *  velocidad que el scroll. En mobile y con reduced-motion queda
 *  estático con la misma intensidad (§7).
 */
interface Props {
  /** Posición dentro del contenedor padre, que debe ser relative. */
  className?: string
  /** Diámetro del glow. */
  tamano?: number
  /** Desplazamiento vertical total del parallax, en px. */
  desplazamiento?: number
  /** Intensidad relativa, 1 = la del token. */
  intensidad?: number
}

export default function Glow({
  className = '',
  tamano = 620,
  desplazamiento = 140,
  intensidad = 1,
}: Props) {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = raiz.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.fromTo(
            el,
            { yPercent: -desplazamiento / 10 },
            {
              yPercent: desplazamiento / 10,
              ease: 'none',
              scrollTrigger: {
                // El trigger es la sección contenedora, no el glow.
                trigger: el.parentElement ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        },
      )
    },
    { scope: raiz, dependencies: [desplazamiento] },
  )

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 aspect-square rounded-full blur-3xl ${className}`}
      style={{
        // El tope en vw evita que en mobile el glow sea desproporcionado
        // respecto de la pantalla. La capa #capa-sitio del layout se
        // encarga de recortar lo que asome.
        width: `min(${tamano}px, 130vw)`,
        backgroundImage: 'var(--glow-violet)',
        // El multiplicador del laboratorio (§15) no existe en
        // producción: el fallback 1 deja la intensidad del token.
        opacity: `calc(${intensidad} * var(--lab-glow, 1))`,
      }}
    />
  )
}
