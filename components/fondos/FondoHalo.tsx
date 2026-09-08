'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Fondo 3 — Halo.
 *
 *  Un patrón de puntos apagado en toda la superficie, que solo se revela
 *  donde pasa el cursor. El halo lo sigue con retardo.
 *
 *  El patrón es un `background-image` de un punto repetido, no canvas:
 *  así el revelado se hace con `mask-image`, que corre en el
 *  compositor. Con canvas habría que redibujar el patrón enmascarado en
 *  cada movimiento del mouse.
 *
 *  El halo se mueve con `quickTo` sobre una capa propia: un solo tween
 *  reutilizado, sin crear uno por evento.
 *
 *  En mobile no hay cursor, así que el halo queda fijo en el centro.
 */

/** Radio del halo en px. */
const RADIO = 300

export default function FondoHalo() {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const capa = raiz.current?.querySelector<HTMLElement>('[data-halo]')
      if (!capa) return

      const mm = gsap.matchMedia()

      // Mobile o sin movimiento: el halo queda quieto en el centro, así
      // el patrón se ve igual pero no persigue nada.
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        gsap.set(capa, { xPercent: -50, yPercent: -50, left: '38%', top: '50%' })
      })

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const caja = raiz.current
        if (!caja) return

        gsap.set(capa, { xPercent: -50, yPercent: -50, left: 0, top: 0 })

        // Arranca en el centro, para que el patrón se vea antes de que
        // el mouse entre al hero.
        const rect0 = caja.getBoundingClientRect()
        gsap.set(capa, { x: rect0.width * 0.38, y: rect0.height * 0.5 })

        // quickTo: un tween reutilizado. El retardo lo da la duración.
        const irX = gsap.quickTo(capa, 'x', { duration: 0.9, ease: 'power2.out' })
        const irY = gsap.quickTo(capa, 'y', { duration: 0.9, ease: 'power2.out' })

        const alMover = (e: MouseEvent) => {
          const r = caja.getBoundingClientRect()
          irX(e.clientX - r.left)
          irY(e.clientY - r.top)
        }

        window.addEventListener('mousemove', alMover)
        return () => window.removeEventListener('mousemove', alMover)
      })
    },
    { scope: raiz },
  )

  return (
    <div ref={raiz} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Patrón de base: apagado, apenas visible. Da la textura que el
          halo después revela. */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(196,181,253,0.5) 1.4px, transparent 1.6px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Capa revelada: el mismo patrón, más brillante y más grande, con
          una máscara radial. Lo que la máscara deja pasar es lo que se
          ve encendido. */}
      <div
        data-halo
        className="pointer-events-none absolute will-change-transform"
        style={{ width: RADIO * 2, height: RADIO * 2 }}
      >
        {/* El patrón encendido, enmascarado. La máscara lo desvanece
            hacia el borde del halo, así no queda un canto duro. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(196,181,253,1) 1.7px, transparent 2px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(circle at center, black 0%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 68%)',
          }}
        />

        {/* El resplandor va dentro de la misma capa, así lo sigue sin
            necesitar un segundo seguimiento. */}
        <div
          className="absolute inset-0 blur-2xl"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(139,92,246,0.2) 0%, transparent 62%)',
          }}
        />
      </div>

      {/* Desvanecido hacia los bordes del hero. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 92% 84% at 50% 42%, transparent 34%, #0C0A18 100%)',
        }}
      />
    </div>
  )
}
