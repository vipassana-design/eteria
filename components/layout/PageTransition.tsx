'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { irArriba } from '@/lib/lenis'
import { prefiereMenosMovimiento } from '@/lib/motion'

/** Transición entre rutas (PLAN.md §6).
 *
 *  Fade out 0.35s → cambio de ruta → fade in 0.45s. Sin wipes: la
 *  transición tiene que sentirse instantánea, no lucirse.
 *
 *  ── El problema de los ScrollTriggers huérfanos ──
 *  Al cambiar de ruta, React desmonta los componentes de la página
 *  anterior. `useGSAP` con scope mata los tweens de cada componente,
 *  pero los ScrollTrigger quedan registrados globalmente con las
 *  medidas de la página vieja: el síntoma es que al volver a la home
 *  las animaciones no disparan o disparan en el lugar equivocado.
 *
 *  Por eso acá se hace `ScrollTrigger.refresh()` después de cada cambio
 *  de ruta, una vez que el DOM nuevo está pintado y el scroll volvió
 *  arriba. Refrescar recalcula las posiciones de los triggers que
 *  sobrevivieron y descarta los que apuntan a elementos que ya no están.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const overlay = useRef<HTMLDivElement>(null)
  /** Evita animar en la primera carga: ahí manda la secuencia del hero. */
  const primeraCarga = useRef(true)

  // Fade out antes de navegar. Se intercepta el click en vez de envolver
  // cada Link: así funciona para cualquier enlace interno del sitio,
  // incluidos los del header, el footer y las cards de servicios.
  useEffect(() => {
    const alClick = (e: MouseEvent) => {
      // Respeta las formas de abrir en pestaña nueva.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }

      const enlace = (e.target as HTMLElement | null)?.closest('a')
      if (!enlace) return

      const href = enlace.getAttribute('href')
      if (!href || !href.startsWith('/') || enlace.target === '_blank') return

      // Los anclas de la misma página los maneja el scroll suavizado.
      const destino = href.split('#')[0] || '/'
      if (destino === pathname) return

      e.preventDefault()

      const el = overlay.current
      if (!el || prefiereMenosMovimiento()) {
        router.push(href)
        return
      }

      gsap.to(el, {
        autoAlpha: 1,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => router.push(href),
      })
    }

    document.addEventListener('click', alClick)
    return () => document.removeEventListener('click', alClick)
  }, [pathname, router])

  useGSAP(
    () => {
      const el = overlay.current
      if (!el) return

      if (primeraCarga.current) {
        primeraCarga.current = false
        gsap.set(el, { autoAlpha: 0 })
        return
      }

      // Fade in del contenido nuevo. El fade out lo hace el click, que
      // no puede esperar a que React renderice la ruta siguiente.
      gsap.fromTo(
        el,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.45, ease: 'power2.out' },
      )
    },
    { dependencies: [pathname] },
  )

  useEffect(() => {
    if (primeraCarga.current) return

    // El scroll vuelve arriba antes del fade in (§6).
    irArriba()

    // Los ScrollTrigger de la ruta anterior quedaron con medidas viejas.
    // El refresh va en dos tiempos: uno inmediato para los que ya
    // montaron, y otro tras un frame para los que monta React en este
    // mismo commit.
    ScrollTrigger.refresh()
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  return (
    <>
      {/* Overlay del color base. pointer-events-none para no bloquear
          clicks cuando está invisible. */}
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-70 bg-base opacity-0"
      />
      {children}
    </>
  )
}
