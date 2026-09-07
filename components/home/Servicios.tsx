'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import TituloSeccion from '@/components/ui/TituloSeccion'
import Boton from '@/components/ui/Boton'
import { seccionServicios, servicios } from '@/content/servicios'
import { PANTALLAS } from './PantallasMockup'

/** Sección "Servicios" — cards apiladas (PLAN.md §4.4).
 *
 *  Cada card queda pineada con `position: sticky` y la siguiente sube
 *  por encima; las de atrás escalan levemente y pierden opacidad.
 *
 *  Se usa sticky nativo y no `pin` de ScrollTrigger: el pin reescribe el
 *  layout con wrappers y pelea con Lenis. Sticky funciona dentro de
 *  #capa-sitio, que usa overflow-x:clip justamente para no romperlo
 *  (§11). ScrollTrigger solo maneja la escala y la opacidad.
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
          sticky de los hijos. En desktop el gap grande es lo que da el
          recorrido de scroll para que una card alcance a la siguiente. */}
      <div className="contenedor mt-16 flex flex-col gap-8 lg:mt-20 lg:gap-[60vh]">
        {servicios.map((s, i) => {
          const Pantalla = PANTALLAS[s.pantalla]

          return (
            <article
              key={s.id}
              data-card
              // El offset creciente deja ver el borde superior de las
              // cards de atrás cuando quedan apiladas.
              className="lg:sticky"
              style={{ zIndex: i + 1, top: `calc(7rem + ${i * 1.25}rem)` }}
            >
              {/* bg-elevated (opaco) y no bg-surface: al apilarse, con
                  una superficie translúcida se leería el texto de la
                  card de atrás. */}
              <div className="relative grid overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated lg:grid-cols-2">
                {/* Velo de apagado: lo anima ScrollTrigger cuando la
                    card siguiente la cubre. */}
                <div
                  data-velo
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 bg-base opacity-0"
                />
                {/* Texto */}
                <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
                  <p className="text-label text-low">{s.titulo}</p>
                  <h3 className="text-h3 font-medium">{s.gancho}</h3>
                  <p className="text-cuerpo medida text-mid">{s.descripcion}</p>
                  <div className="mt-2">
                    <Boton href={s.href} variante="enlace">
                      {s.textoEnlace} <span data-flecha>&rarr;</span>
                    </Boton>
                  </div>
                </div>

                {/* Mockup */}
                <div
                  role="img"
                  aria-label={s.pantallaAlt}
                  className="relative min-h-56 overflow-hidden border-t border-hairline bg-[#211C3D] lg:min-h-0 lg:border-l lg:border-t-0"
                >
                  <div className="absolute inset-0 top-8 left-8 overflow-hidden rounded-tl-(--radius-card) border-l border-t border-white/10 shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.5)]">
                    <Pantalla />
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
