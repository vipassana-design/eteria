'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Fondo 2 — Grilla.
 *
 *  Retícula fina donde algunas celdas se encienden un instante y se
 *  apagan, como actividad de un sistema.
 *
 *  La retícula es un `background-image` repetido: una sola declaración
 *  CSS en vez de miles de divs. Los destellos son un puñado de divs que
 *  GSAP enciende al azar, animando solo `opacity` y `scale`.
 *
 *  En mobile la retícula queda y los destellos bajan a la mitad.
 */

/** Lado de la celda en px. */
const CELDA = 56

/** Cuántos destellos hay a la vez. */
const DESTELLOS = 14
const DESTELLOS_MOBILE = 7

export default function FondoGrilla() {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 1024px)',
          movimientoOk: '(prefers-reduced-motion: no-preference)',
        },
        (contexto) => {
          const { desktop, movimientoOk } = contexto.conditions as Record<string, boolean>
          if (!movimientoOk) return

          const items = gsap.utils.toArray<HTMLElement>('[data-destello]', raiz.current)
          const activos = desktop ? items : items.slice(0, DESTELLOS_MOBILE)
          const caja = raiz.current?.getBoundingClientRect()
          if (!caja) return

          /** Reubica un destello en una celda al azar de la retícula y lo
           *  enciende. Se llama de nuevo al terminar, así cada uno
           *  mantiene su propio ritmo. */
          const encender = (el: HTMLElement) => {
            const columnas = Math.floor(caja.width / CELDA)
            const filas = Math.floor(caja.height / CELDA)

            gsap.set(el, {
              x: Math.floor(gsap.utils.random(0, columnas)) * CELDA,
              y: Math.floor(gsap.utils.random(0, filas)) * CELDA,
              opacity: 0,
              scale: 0.7,
            })

            gsap
              .timeline({ onComplete: () => encender(el) })
              .to(el, { opacity: gsap.utils.random(0.5, 1), scale: 1, duration: 0.5, ease: 'power2.out' })
              .to(el, { opacity: 0, duration: 1.1, ease: 'power2.in' }, '+=0.35')
              .to({}, { duration: gsap.utils.random(0.4, 3.2) })
          }

          for (const el of activos) {
            gsap.delayedCall(gsap.utils.random(0, 3), () => encender(el))
          }

          // Los que no se usan en mobile quedan apagados.
          if (!desktop) gsap.set(items.slice(DESTELLOS_MOBILE), { opacity: 0 })

          return () => {
            gsap.killTweensOf(items)
          }
        },
      )
    },
    { scope: raiz },
  )

  return (
    <div ref={raiz} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Retícula: dos gradientes lineales repetidos. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: `${CELDA}px ${CELDA}px`,
        }}
      />

      {/* Destellos: una celda que se ilumina. */}
      {Array.from({ length: DESTELLOS }, (_, i) => (
        <div
          key={i}
          data-destello
          className="absolute left-0 top-0 opacity-0 will-change-[transform,opacity]"
          style={{ width: CELDA, height: CELDA }}
        >
          <div
            className="size-full"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(139,92,246,0.28) 0%, rgba(59,130,246,0.14) 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.4)',
            }}
          />
        </div>
      ))}

      {/* Desvanecido hacia los bordes: sin esto la retícula corta en seco
          contra el borde del hero. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 30%, #0C0A18 100%)',
        }}
      />
    </div>
  )
}
