'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { videoPlaceholder } from '@/content/heros'
import { prefiereMenosMovimiento } from '@/lib/motion'
import TextoHero from './TextoHero'

/** Propuesta 4 — Video.
 *
 *  Loop abstracto oscuro a pantalla completa, sin sonido, con velo y
 *  degradé que lo funde hacia abajo. El texto encima, alineado a la
 *  izquierda.
 *
 *  Con reduced-motion el video queda pausado en el primer frame: se
 *  carga igual, para que el fondo no quede vacío, pero no se reproduce.
 */
export default function HeroVideo() {
  const raiz = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useGSAP(
    () => {
      const v = video.current
      if (!v) return

      if (prefiereMenosMovimiento()) {
        // Primer frame y quieto. `pause` después de `load` porque en
        // algunos navegadores el autoplay arranca antes del efecto.
        v.pause()
        v.currentTime = 0
        return
      }

      // Fade in del video una vez que tiene datos: sin esto se ve el
      // salto de negro a primer frame.
      gsap.set(v, { opacity: 0 })
      const mostrar = () => gsap.to(v, { opacity: 1, duration: 1.2, ease: 'power2.out' })

      if (v.readyState >= 2) mostrar()
      else v.addEventListener('loadeddata', mostrar, { once: true })

      return () => v.removeEventListener('loadeddata', mostrar)
    },
    { scope: raiz },
  )

  return (
    <section ref={raiz} className="relative flex min-h-svh items-center overflow-hidden">
      {/* El video va detrás de todo, cubriendo el viewport. */}
      <video
        ref={video}
        src={videoPlaceholder.archivo}
        autoPlay
        muted
        loop
        playsInline
        // Sin controles ni foco: es decoración, no contenido.
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      {/* Velo plano: baja el video para que el texto se lea. */}
      <div aria-hidden="true" className="absolute inset-0 bg-base/68" />

      {/* Degradé que lo funde hacia abajo, para empalmar con la sección
          siguiente sin un corte duro. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(12,10,24,0.55) 0%, rgba(12,10,24,0.2) 35%, rgba(12,10,24,0.85) 82%, #0C0A18 100%)',
        }}
      />

      {/* Y un refuerzo lateral, que es donde va el texto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(12,10,24,0.8) 0%, rgba(12,10,24,0.35) 45%, transparent 75%)',
        }}
      />

      <div className="contenedor relative pb-32 pt-32 lg:pt-40">
        <TextoHero />
      </div>
    </section>
  )
}
