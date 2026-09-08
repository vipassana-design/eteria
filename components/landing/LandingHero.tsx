'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollearA } from '@/lib/lenis'
import { dur, ease } from '@/lib/motion'
import { landingUi } from '@/content/landings'
import type { Landing } from '@/types'
import Boton from '@/components/ui/Boton'
import Glow from '@/components/bg/Glow'
import VentanaMockup from '@/components/home/VentanaMockup'
import RollingText from '@/components/ui/RollingText'

/** Hero de las landings (PLAN.md §5).
 *  Split: titular con rolling text a la izquierda, mockup del servicio
 *  con más presencia visual a la derecha. */
export default function LandingHero({ landing }: { landing: Landing }) {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('[data-anim]', { opacity: 0, duration: dur.fast, stagger: 0.05, ease: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline()
        tl.from('[data-titulo]', { opacity: 0, y: 24, duration: 0.8, ease: ease.out })
          .from('[data-texto]', { opacity: 0, y: 20, duration: dur.base, stagger: 0.1, ease: ease.out }, 0.25)
          .from('[data-mockup]', { opacity: 0, x: 60, scale: 0.95, duration: 1, ease: ease.out }, 0.15)
        return () => tl.kill()
      })
    },
    { scope: raiz },
  )

  const alClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const ancla = href.slice(href.indexOf('#'))
    if (scrollearA(ancla)) e.preventDefault()
  }

  return (
    <section
      ref={raiz}
      className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40"
    >
      <Glow className="-right-32 -top-20" tamano={820} />

      <div className="contenedor grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
          <h1 data-anim data-titulo className="text-hero font-semibold">
            <span className="block">{landing.titulo.antes}</span>
            <RollingText palabras={landing.titulo.palabras} />
            {landing.titulo.despues ? (
              <span className="block">{landing.titulo.despues}</span>
            ) : null}
          </h1>

          <p data-anim data-texto className="text-cuerpo-lg medida mt-7 text-mid">
            {landing.bajada}
          </p>

          <div data-anim data-texto className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Boton href="#contacto" onClick={(e) => alClick(e, '#contacto')}>
              {landingUi.ctaHero}
            </Boton>
            <Boton href="/#ejemplos" variante="secundario">
              {landingUi.ctaSecundario}
            </Boton>
          </div>
        </div>

        {/* El mockup tiene más presencia que en la home: una sola
            ventana, más grande y con perspectiva más suave (§5). */}
        <div
          data-anim
          data-mockup
          className="lg:w-[124%]"
          style={{ perspective: '1600px' }}
        >
          <div style={{ transform: 'rotateY(-10deg) rotateX(4deg)' }}>
            <VentanaMockup
              mockup={{
                id: landing.mockup.pantalla,
                url: landing.mockup.url,
                alt: landing.mockup.alt,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
