'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { registrarLenis } from '@/lib/lenis'
import { BP_DESKTOP } from '@/lib/motion'

/** Scroll suavizado con Lenis (PLAN.md §8.1).
 *
 *  Se elige Lenis sobre ScrollSmoother porque no necesita wrappers
 *  y se lleva mejor con position:sticky, que es lo que usan las
 *  cards apiladas de servicios.
 *
 *  Se desactiva en mobile y con reduced-motion: el scroll táctil
 *  nativo es mejor que cualquier suavizado.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        esDesktop: `(min-width: ${BP_DESKTOP}px)`,
        movimientoOk: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { esDesktop, movimientoOk } = context.conditions as Record<string, boolean>
        if (!esDesktop || !movimientoOk) return

        const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
        registrarLenis(lenis)

        // Lenis avanza con el ticker de GSAP en vez de su propio rAF,
        // así ScrollTrigger y el scroll leen la misma posición en el
        // mismo frame y no aparece jitter.
        lenis.on('scroll', ScrollTrigger.update)

        const avanzar = (tiempo: number) => lenis.raf(tiempo * 1000)
        gsap.ticker.add(avanzar)
        gsap.ticker.lagSmoothing(0)

        return () => {
          gsap.ticker.remove(avanzar)
          gsap.ticker.lagSmoothing(500, 33)
          registrarLenis(null)
          lenis.destroy()
        }
      },
    )

    return () => mm.revert()
  }, [])

  return null
}
