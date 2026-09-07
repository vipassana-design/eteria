'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { dur, ease } from '@/lib/motion'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { proceso, seccionProceso } from '@/content/proceso'
import { ILUSTRACIONES } from './IlustracionesProceso'

/** Sección "Proceso" (PLAN.md §4.5).
 *
 *  Cuatro cards con una línea conectora que cruza por detrás. La línea
 *  se dibuja de izquierda a derecha con strokeDashoffset al entrar en
 *  viewport, y las cards entran desde abajo siguiéndola: la línea es la
 *  guía, no un fade genérico.
 *
 *  En mobile la línea pasa a vertical del lado izquierdo.
 */
export default function Proceso() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('[data-etapa]', {
          opacity: 0,
          duration: dur.fast,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: raiz.current, start: 'top 80%', once: true },
        })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lineas = gsap.utils.toArray<SVGPathElement>('[data-linea]', raiz.current)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: raiz.current, start: 'top 75%', once: true },
        })

        // La línea se dibuja primero y las cards la siguen.
        for (const linea of lineas) {
          const largo = linea.getTotalLength()
          gsap.set(linea, { strokeDasharray: largo, strokeDashoffset: largo })
          tl.to(linea, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0)
        }

        tl.from(
          '[data-etapa]',
          { opacity: 0, y: 32, duration: dur.base, stagger: 0.14, ease: ease.out },
          0.25,
        ).from(
          '[data-punto]',
          { scale: 0, duration: 0.4, stagger: 0.14, ease: 'back.out(2.5)' },
          0.3,
        )
      })
    },
    { scope: raiz },
  )

  return (
    <section ref={raiz} id="proceso" className="seccion relative scroll-mt-24">
      <div className="contenedor">
        <TituloSeccion degrade={seccionProceso.tituloDegrade} bajada={seccionProceso.bajada}>
          {seccionProceso.titulo}
        </TituloSeccion>

        <div className="relative mt-16 lg:mt-20">
          {/* Línea conectora horizontal (desktop). Pasa por detrás de
              las cards, a la altura de los puntos.

              El ancho se recorta 3/4 de columna a la derecha para que
              termine en el cuarto punto y no siga de largo hasta el
              borde: los puntos están al inicio de cada columna. */}
          <svg
            className="pointer-events-none absolute left-0 top-0 hidden h-px w-[75.5%] overflow-visible lg:block"
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 1000 1"
          >
            <path
              data-linea
              d="M0 0.5 H1000"
              stroke="var(--color-hairline-hover)"
              strokeWidth={1}
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Línea vertical (mobile), del lado izquierdo. El alto lo da
              el contenedor (inset-y), no el viewBox: si no, quedaba
              fija en 1000px y no seguía al contenido. */}
          <svg
            className="pointer-events-none absolute bottom-8 left-[3px] top-3 w-px overflow-visible lg:hidden"
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 1 1000"
          >
            <path
              data-linea
              d="M0.5 0 V1000"
              stroke="var(--color-hairline-hover)"
              strokeWidth={1}
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {proceso.map((etapa) => {
              const Ilustracion = ILUSTRACIONES[etapa.ilustracion]

              return (
                <li
                  key={etapa.numero}
                  data-etapa
                  className="group relative pl-9 lg:pl-0 lg:pt-0"
                >
                  {/* Punto sobre la línea */}
                  <span
                    data-punto
                    className="absolute left-0 top-2.5 size-[7px] rounded-full bg-violet-500 shadow-[0_0_0_4px_var(--color-base)] lg:left-0 lg:top-0"
                  />

                  <div className="lg:pt-10">
                    <Ilustracion />

                    <p className="font-display texto-degrade mt-6 text-h3 font-semibold leading-none">
                      {etapa.numero}
                    </p>
                    <h3 className="text-h3 mt-3 font-medium">{etapa.titulo}</h3>
                    <p className="text-cuerpo mt-3 text-mid">{etapa.descripcion}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
