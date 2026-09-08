'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { mockups } from '@/content/mockups'
import { PANTALLAS } from '@/components/home/PantallasMockup'
import Glow from '@/components/bg/Glow'
import TextoHero from './TextoHero'

/** Propuesta 1 — Franja.
 *
 *  Los mockups desfilan en loop en el tercio inferior, cortados por los
 *  dos bordes. El mouse sobre una tarjeta frena la marcha y le devuelve
 *  el color; al salir, retoma.
 *
 *  El loop se anima con `x` y las tarjetas con `scale`/`filter`: las
 *  tres son propiedades de composición, no disparan layout.
 */
export default function HeroFranja() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const pista = raiz.current?.querySelector<HTMLElement>('[data-pista]')
        if (!pista) return

        // La pista lleva las tarjetas duplicadas: cuando el primer set
        // termina de salir, el segundo ya está en su lugar y el salto a
        // x:0 es invisible.
        const mitad = pista.scrollWidth / 2

        const loop = gsap.to(pista, {
          x: -mitad,
          duration: mitad / 55, // velocidad constante, no por tamaño
          ease: 'none',
          repeat: -1,
        })

        // El freno y la vuelta usan timeScale: no reinicia el loop ni
        // recalcula posiciones.
        const frenar = () => gsap.to(loop, { timeScale: 0, duration: 0.5, ease: 'power2.out' })
        const retomar = () => gsap.to(loop, { timeScale: 1, duration: 0.7, ease: 'power2.out' })

        const tarjetas = gsap.utils.toArray<HTMLElement>('[data-tarjeta]', raiz.current)
        const limpiar: (() => void)[] = []

        for (const t of tarjetas) {
          const entra = () => {
            frenar()
            gsap.to(t, {
              scale: 1.06,
              y: -14,
              filter: 'grayscale(0) brightness(1)',
              duration: 0.45,
              ease: 'power3.out',
            })
          }
          const sale = () => {
            retomar()
            gsap.to(t, {
              scale: 1,
              y: 0,
              filter: 'grayscale(0.85) brightness(0.55)',
              duration: 0.5,
              ease: 'power3.out',
            })
          }

          t.addEventListener('mouseenter', entra)
          t.addEventListener('mouseleave', sale)
          limpiar.push(() => {
            t.removeEventListener('mouseenter', entra)
            t.removeEventListener('mouseleave', sale)
          })
        }

        return () => {
          loop.kill()
          for (const fn of limpiar) fn()
        }
      })
    },
    { scope: raiz },
  )

  // Duplicadas para que el loop no muestre el corte.
  const fila = [...mockups, ...mockups]

  return (
    <section
      ref={raiz}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pb-44 pt-28 lg:pt-32"
    >
      <Glow className="-right-40 -top-24" tamano={800} />

      <div className="contenedor">
        <TextoHero compacto />
      </div>

      {/* Franja. w-max deja que la pista exceda el viewport; el corte lo
          hace el overflow de la sección. */}
      <div className="relative mt-10">
        <div data-pista className="flex w-max gap-6 will-change-transform">
          {fila.map((m, i) => {
            const Pantalla = PANTALLAS[m.pantalla]

            return (
              <article
                key={`${m.id}-${i}`}
                data-tarjeta
                aria-hidden={i >= mockups.length}
                className="w-[22rem] shrink-0 will-change-transform"
                style={{
                  filter: 'grayscale(0.85) brightness(0.55)',
                  transformOrigin: 'center bottom',
                }}
              >
                <div className="overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated">
                  <div className="flex items-center gap-2 border-b border-white/[0.07] bg-[#211C3D] px-3 py-2">
                    <span className="flex gap-1.5">
                      <span className="size-1.5 rounded-full bg-[#4A4370]" />
                      <span className="size-1.5 rounded-full bg-[#4A4370]" />
                      <span className="size-1.5 rounded-full bg-[#4A4370]" />
                    </span>
                    <span className="truncate text-[10px] leading-none text-low">{m.url}</span>
                  </div>
                  <div
                    role="img"
                    aria-label={i < mockups.length ? m.alt : undefined}
                    className="aspect-16/10 overflow-hidden"
                  >
                    <Pantalla />
                  </div>
                </div>
                <p className="text-label mt-3 text-low">{m.titulo}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
