'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Entrada por scroll para las plantillas de muestra (PLAN.md §16).
 *
 *  Es el equivalente de `components/ui/Reveal.tsx`, pero para el
 *  subárbol de plantillas y con una diferencia deliberada: **no impone
 *  ninguna decisión visual**. Solo mueve opacidad y desplazamiento.
 *
 *  Esa es la regla de `comun/`: si las nueve plantillas compartieran
 *  componentes de presentación —una card, un botón, una sección— las
 *  nueve se verían iguales, que es exactamente lo que hay que evitar.
 *  Acá solo vive lógica que ninguna plantilla querría escribir dos
 *  veces.
 *
 *  Corre dentro del iframe, con su propia instancia de GSAP. El
 *  ScrollTrigger observa el scroll del documento embebido, que es el
 *  que el visitante mueve al recorrer la plantilla.
 */
interface Props {
  children: React.ReactNode
  /** Desplazamiento inicial en px. Negativo sube. */
  y?: number
  /** Segundos entre hijos. 0 anima el bloque completo. */
  escalonado?: number
  /** Punto de disparo, en la sintaxis de ScrollTrigger. */
  desde?: string
  className?: string
}

export default function Aparecer({
  children,
  y = 20,
  escalonado = 0,
  desde = 'top 88%',
  className = '',
}: Props) {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = raiz.current
      if (!el) return

      const mm = gsap.matchMedia()

      // Sin movimiento: el contenido queda visible y quieto. Va como
      // rama explícita y no como early return porque `gsap.from` deja
      // el estado inicial escrito si el tween no llega a correr.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(escalonado > 0 ? el.children : el, { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const objetivos = escalonado > 0 ? el.children : el

        const tw = gsap.from(objetivos, {
          opacity: 0,
          y,
          duration: 0.7,
          ease: 'power3.out',
          stagger: escalonado,
          scrollTrigger: { trigger: el, start: desde, once: true },
        })

        return () => {
          tw.scrollTrigger?.kill()
          tw.kill()
        }
      })
    },
    { scope: raiz, dependencies: [y, escalonado, desde] },
  )

  return (
    <div ref={raiz} className={className}>
      {children}
    </div>
  )
}
