'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollearA } from '@/lib/lenis'
import { dur, ease } from '@/lib/motion'
import { landingUi } from '@/content/landings'
import type { Landing } from '@/types'
import Boton from '@/components/ui/Boton'
import Glow from '@/components/bg/Glow'
import RollingText from '@/components/ui/RollingText'
import { PANTALLAS_LANDING } from './PantallasLanding'

/** Hero de las landings (PLAN.md §5).
 *
 *  Split: titular con rolling text a la izquierda, y a la derecha una
 *  ventana donde la interfaz del servicio se arma sola por partes, se
 *  desarma y vuelve a armarse.
 *
 *  Es la misma mecánica del hero de la home, sin la etapa de terminal:
 *  esa es de la home. Acá la pantalla es una sola y más detallada (seis
 *  partes contra cuatro), así que el ciclo dura más.
 *
 *  La ventana va alineada, sin perspectiva: el mockup es el
 *  protagonista del hero y rotarlo le quitaba legibilidad.
 */
export default function LandingHero({ landing }: { landing: Landing }) {
  const raiz = useRef<HTMLElement>(null)
  /** Se incrementa al terminar cada ciclo, para rearmar la animación. */
  const [ciclo, setCiclo] = useState(0)

  const Pantalla = PANTALLAS_LANDING[landing.slug]

  // --- Entrada: corre una sola vez, al montar ---
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('[data-anim]', { opacity: 0, duration: dur.fast, stagger: 0.05, ease: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline()
        tl.from('[data-titulo]', { opacity: 0, y: 24, duration: 0.8, ease: ease.out })
          .from(
            '[data-texto]',
            { opacity: 0, y: 20, duration: dur.base, stagger: 0.1, ease: ease.out },
            0.25,
          )
          .from(
            '[data-ventana]',
            { opacity: 0, x: 60, scale: 0.96, duration: 1, ease: ease.out },
            0.15,
          )
        return () => tl.kill()
      })
    },
    { scope: raiz },
  )

  // --- Ciclo de armado de la pantalla ---
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: la pantalla se muestra armada y no se rearma.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-parte]', { opacity: 1, y: 0 })
        gsap.set('[data-item]', { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const partes = gsap.utils.toArray<SVGGElement>('[data-parte]', raiz.current)
        if (partes.length === 0) return

        const tl = gsap.timeline({ onComplete: () => setCiclo((c) => c + 1) })
        gsap.set(partes, { opacity: 0, y: 18 })

        partes.forEach((parte, i) => {
          const items = parte.querySelectorAll('[data-item]')

          tl.to(parte, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, i * 0.4)

          // Las partes con varios elementos los dejan caer con stagger:
          // es lo que da la sensación de que el contenido se puebla.
          if (items.length > 1) {
            tl.from(
              items,
              { opacity: 0, y: 14, duration: 0.32, stagger: 0.06, ease: 'power2.out' },
              i * 0.4 + 0.1,
            )
          }

          const trazo = parte.querySelector<SVGPathElement>('[data-trazo]')
          if (trazo) {
            const largo = trazo.getTotalLength()
            tl.fromTo(
              trazo,
              { strokeDasharray: largo, strokeDashoffset: largo },
              { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
              i * 0.4 + 0.15,
            )
          }
        })

        // Se queda armada un rato largo —es el protagonista del hero— y
        // recién después se desarma.
        tl.to(
          [...partes].reverse(),
          { opacity: 0, y: -14, duration: 0.28, stagger: 0.07, ease: 'power2.in' },
          '+=3.4',
        )

        return () => tl.kill()
      })
    },
    { scope: raiz, dependencies: [ciclo] },
  )

  const alClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const ancla = href.slice(href.indexOf('#'))
    if (scrollearA(ancla)) e.preventDefault()
  }

  return (
    <section ref={raiz} className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <Glow className="-right-32 -top-20" tamano={820} />

      {/* Mismo grid y mismo w-full que el hero de la home, para que la
          ventana mida igual en las cuatro páginas. Sin w-full el grid se
          encoge al contenido y la ventana queda de otro tamaño. */}
      <div className="contenedor grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
        {/*  declara el contenedor de consulta: el tamaño
            del H1 se mide contra esta columna, no contra el viewport. */}
        <div className="titulo-hero">
          <h1 data-anim data-titulo className="titulo-hero-texto font-display font-semibold">
            <span className="block">{landing.titulo.antes}</span>
            <RollingText palabras={landing.titulo.palabras} className="block" />
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

        {/* Ventana alineada, del mismo tamaño que la del hero de la home:
            se desborda hacia la derecha y #capa-sitio recorta lo que
            asoma, sin generar scroll horizontal. */}
        <div data-anim data-ventana className="lg:w-[118%]">
          <div className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
              </span>
              <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
                {landing.mockup.url}
              </span>
            </div>

            <div role="img" aria-label={landing.mockup.alt} className="aspect-16/10">
              <Pantalla />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
