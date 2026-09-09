'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/gsap'
import TituloSeccion from '@/components/ui/TituloSeccion'
import Boton from '@/components/ui/Boton'
import { seccionServicios, servicios } from '@/content/servicios'
import { CicloPantalla } from './CicloPantalla'
import { PANTALLAS_SERVICIO } from './PantallasServicio'

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

        // --- Hover ---
        //
        // Va con GSAP y no con una transición CSS sobre el hijo: el
        // scrollTrigger de arriba escribe `transform` inline en la card
        // en cada frame del scroll, y eso invalida la interpolación CSS
        // del hijo. El navegador descartaba la transición y el hover
        // saltaba de golpe al valor final.
        const limpiar: (() => void)[] = []

        for (const card of cards) {
          const bloque = card.querySelector<HTMLElement>('[data-bloque]')
          if (!bloque) continue

          // La escala arranca declarada, si no el primer tween parte de
          // 0 y la card desaparece por un frame.
          gsap.set(bloque, { scale: 1 })

          // Un solo tween por transición, con overwrite para que entrar
          // y salir en rápida sucesión no dejen dos animaciones peleando.
          const entra = () => {
            gsap.to(bloque, {
              scale: 1.008,
              borderColor: 'color-mix(in srgb, var(--color-violet-500) 35%, transparent)',
              boxShadow:
                '0 0 0 1px color-mix(in srgb, var(--color-violet-500) 12%, transparent), 0 28px 80px -28px color-mix(in srgb, var(--color-violet-500) 40%, transparent)',
              duration: 0.9,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
          const sale = () => {
            gsap.to(bloque, {
              scale: 1,
              borderColor: 'rgba(255,255,255,0.07)',
              boxShadow: '0 0 0 1px transparent, 0 28px 80px -28px transparent',
              duration: 0.9,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }

          card.addEventListener('mouseenter', entra)
          card.addEventListener('mouseleave', sale)
          limpiar.push(() => {
            card.removeEventListener('mouseenter', entra)
            card.removeEventListener('mouseleave', sale)
          })
        }

        return () => {
          for (const fn of limpiar) fn()
        }
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
          const Pantalla = PANTALLAS_SERVICIO[s.id]

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
              {/* El hover lo maneja GSAP (ver arriba): la escala y el
                  glow no pueden ir por transición CSS porque el
                  scrollTrigger de la card escribe transform inline. */}
              <div
                data-bloque
                className="relative grid overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated will-change-transform lg:min-h-[27rem] lg:grid-cols-2"
              >
                {/* Velo de apagado: lo anima ScrollTrigger cuando la
                    card siguiente la cubre. */}
                <div
                  data-velo
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 bg-base opacity-0"
                />

                {/* Texto. justify-center para que quede centrado en la
                    card y no tirado hacia arriba. */}
                <div className="flex flex-col justify-center gap-3 p-8 lg:p-12">
                  {/* El nombre del servicio es el título y lleva el
                      enlace a la landing. */}
                  <h3 className="text-h3 font-medium">
                    <Link
                      href={s.href}
                      className="transition-colors duration-300 ease-(--ease-suave) hover:text-violet-300"
                    >
                      {s.titulo}
                    </Link>
                  </h3>

                  <p className="text-cuerpo-lg text-mid">{s.gancho}</p>

                  <p className="text-cuerpo medida mt-2 text-low">{s.descripcion}</p>

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
                {/* El mockup ocupa toda la mitad derecha de la card.
                    Antes iba centrado con `p-8` y quedaba flotando con
                    márgenes: el recorte contra el borde es lo que le da
                    el aire de captura. */}
                <Link
                  href={s.href}
                  aria-label={`${s.titulo}. ${s.textoEnlace}`}
                  className="relative block overflow-hidden border-t border-hairline lg:border-l lg:border-t-0"
                >
                  <span
                    role="img"
                    aria-label={s.pantallaAlt}
                    // El fondo cubre la celda entera: el lienzo de las
                    // cards es 720×538, la misma proporción que la
                    // celda, así que no quedan franjas.
                    className="block size-full min-h-56 bg-[#F7F6FB] lg:min-h-0"
                  >
                    {/* El mockup se arma por partes en loop, como la
                        ventana del hero. Arranca al entrar en viewport
                        y se suspende al salir. */}
                    <CicloPantalla>
                      <Pantalla />
                    </CicloPantalla>
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
