'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/gsap'
import TituloSeccion from '@/components/ui/TituloSeccion'
import Boton from '@/components/ui/Boton'
import { seccionServicios, servicios } from '@/content/servicios'
import { PANTALLAS } from './PantallasMockup'

/** Sección "Servicios" — cards apiladas (PLAN.md §4.4).
 *
 *  Cada card queda pineada con `position: sticky` y la siguiente sube
 *  por encima; las de atrás escalan levemente y se apagan con un velo.
 *
 *  Se usa sticky nativo y no `pin` de ScrollTrigger: el pin reescribe el
 *  layout con wrappers y pelea con Lenis. Sticky funciona dentro de
 *  #capa-sitio, que usa overflow-x:clip justamente para no romperlo
 *  (§11). ScrollTrigger solo maneja la escala y el velo.
 *
 *  En mobile no hay apilado: quedan tres cards en flujo normal.
 */
export default function Servicios() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-card]', raiz.current)

        // La última no se escala: es la que queda arriba al final.
        cards.slice(0, -1).forEach((card, i) => {
          const siguiente = cards[i + 1]
          if (!siguiente) return

          const velo = card.querySelector('[data-velo]')

          const st = {
            trigger: siguiente,
            // Arranca cuando la siguiente asoma y termina cuando la
            // cubrió: la card de atrás se va apagando en ese tramo.
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          } as const

          gsap.to(card, { scale: 0.94, ease: 'none', scrollTrigger: st })

          // El apagado va con un velo encima y no con opacity sobre la
          // card: opacity la vuelve translúcida entera y se lee el texto
          // de atrás a través de la de adelante.
          if (velo) gsap.to(velo, { opacity: 0.62, ease: 'none', scrollTrigger: st })
        })
      })
    },
    { scope: raiz },
  )

  return (
    <section ref={raiz} id="servicios" className="seccion relative scroll-mt-24">
      <div className="contenedor">
        <TituloSeccion degrade={seccionServicios.tituloDegrade} bajada={seccionServicios.bajada}>
          {seccionServicios.titulo}
        </TituloSeccion>
      </div>

      {/* El contenedor de las cards no lleva overflow: cortaría el
          sticky de los hijos.

          En desktop el gap es lo que da el recorrido de scroll para que
          una card alcance a la siguiente. Se mantiene por debajo del
          alto de la card, si no queda un hueco visible entre una y otra
          antes de que la siguiente empiece a subir. */}
      <div className="contenedor mt-16 flex flex-col gap-8 lg:mt-20 lg:gap-[28vh]">
        {servicios.map((s, i) => {
          const Pantalla = PANTALLAS[s.pantalla]

          return (
            <article
              key={s.id}
              data-card
              // El offset creciente deja ver el borde superior de las
              // cards de atrás cuando quedan apiladas.
              className="group/card lg:sticky"
              style={{ zIndex: i + 1, top: `calc(7rem + ${i * 1.25}rem)` }}
            >
              {/* Todo el bloque escala apenas y toma un glow al pasar el
                  mouse: es un solo movimiento sobre transform y
                  box-shadow, las dos de composición. */}
              {/* El hover escala apenas y toma un glow. La transición es
                  larga y con la curva suave del design system: a 500ms
                  el salto se sentía brusco. */}
              <div className="relative grid overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated transition-[transform,border-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/card:scale-[1.008] group-hover/card:border-violet-500/35 group-hover/card:shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_28px_80px_-28px_rgba(139,92,246,0.4)] lg:min-h-[27rem] lg:grid-cols-2">
                {/* Velo de apagado: lo anima ScrollTrigger cuando la
                    card siguiente la cubre. */}
                <div
                  data-velo
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 bg-base opacity-0"
                />

                {/* Texto. justify-center para que quede centrado en la
                    card y no tirado hacia arriba. */}
                <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
                  <p className="text-label text-low">{s.titulo}</p>

                  {/* El gancho es enlace a la landing. */}
                  <h3 className="text-h3 font-medium">
                    <Link
                      href={s.href}
                      className="transition-colors duration-300 ease-(--ease-suave) hover:text-violet-300"
                    >
                      {s.gancho}
                    </Link>
                  </h3>

                  <p className="text-cuerpo medida text-mid">{s.descripcion}</p>

                  <div className="mt-2">
                    <Boton href={s.href} tamano="chico">
                      {s.textoEnlace}
                    </Boton>
                  </div>
                </div>

                {/* Mockup, también enlazado. El contenedor centra una
                    ventana con la relación 720:460 de las pantallas, así
                    el mockup entra completo: antes se estiraba a la caja
                    y el SVG se recortaba por los costados. */}
                <Link
                  href={s.href}
                  aria-label={`${s.titulo}. ${s.textoEnlace}`}
                  className="relative flex min-h-56 items-center justify-center overflow-hidden border-t border-hairline bg-[#211C3D] p-6 lg:min-h-0 lg:border-l lg:border-t-0 lg:p-8"
                >
                  <span
                    role="img"
                    aria-label={s.pantallaAlt}
                    // El fondo va acá y no solo en el SVG: con
                    // preserveAspectRatio=meet puede sobrar un hilo a
                    // los costados, y sin fondo se vería el violeta.
                    className="block aspect-[720/460] w-full overflow-hidden rounded-xl border border-white/10 bg-[#F7F6FB] shadow-[0_16px_50px_-12px_rgba(0,0,0,0.6)]"
                  >
                    <Pantalla />
                  </span>
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
