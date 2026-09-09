'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { dur, ease } from '@/lib/motion'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { proceso, seccionProceso } from '@/content/proceso'
import { ILUSTRACIONES } from './IlustracionesProceso'

/** Sección "Proceso" (PLAN.md §4.5).
 *
 *  Cuatro etapas con una línea conectora que cruza por detrás. La
 *  línea avanza **con el scroll** —no de una vez al entrar en
 *  viewport— y cada etapa se enciende cuando la línea la alcanza: el
 *  proceso se explica solo mientras se lee.
 *
 *  El encendido está atado al **progreso de la línea**, no a un
 *  ScrollTrigger por etapa: en desktop las cuatro están a la misma
 *  altura, así que sus triggers se disparaban casi juntos y las cuatro
 *  se prendían de una vez. Leyendo el progreso, la etapa i se enciende
 *  cuando la línea pasó su posición —que es literalmente lo que se ve.
 *
 *  En mobile la línea pasa a vertical del lado izquierdo.
 */
export default function Proceso() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: todo visible y la línea completa.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-etapa]', { opacity: 1, y: 0 })
        gsap.set('[data-punto]', { scale: 1 })
        gsap.set('[data-linea]', { strokeDashoffset: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const etapas = gsap.utils.toArray<HTMLElement>('[data-etapa]', raiz.current)
        const lineas = gsap.utils.toArray<SVGPathElement>('[data-linea]', raiz.current)
        const tweens: gsap.core.Tween[] = []

        // ── Estado apagado ──
        gsap.set(etapas, { opacity: 0.22, y: 26 })
        gsap.set('[data-punto]', { scale: 0.4 })

        // Cada etapa tiene su tween de encendido, en pausa. Se dispara
        // desde el progreso de la línea, así el orden es el del trazo.
        const encendidos = etapas.map((etapa) => {
          const punto = etapa.querySelector('[data-punto]')
          const tl = gsap.timeline({ paused: true })
          tl.to(etapa, { opacity: 1, y: 0, duration: dur.base, ease: ease.out })
          if (punto) {
            tl.to(punto, { scale: 1, duration: 0.42, ease: 'back.out(2.6)' }, 0.04)
          }
          return tl
        })

        // ── La línea avanza con el scroll y va prendiendo etapas ──
        //
        // El rango termina en `bottom 85%` y no en `bottom top`: la
        // línea tiene que completarse cuando la cuarta etapa está a la
        // vista, no cuando la sección ya salió por arriba.
        for (const linea of lineas) {
          const largo = linea.getTotalLength()
          gsap.set(linea, { strokeDasharray: largo, strokeDashoffset: largo })

          tweens.push(
            gsap.to(linea, {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: raiz.current,
                start: 'top 62%',
                end: 'bottom 85%',
                // `scrub: 0.4` en vez de `true`: el 0.4 le da una
                // inercia corta, así el trazo no salta con la rueda.
                scrub: 0.4,
                onUpdate: (self) => {
                  // La etapa i se enciende cuando el trazo pasó su
                  // posición. El umbral arranca antes de la fracción
                  // exacta para que el punto se prenda justo cuando la
                  // línea lo toca, no después.
                  encendidos.forEach((tl, i) => {
                    const umbral = i / encendidos.length + 0.04
                    if (self.progress >= umbral) {
                      if (!tl.isActive() && tl.progress() === 0) tl.play()
                    }
                  })
                },
              },
            }),
          )
        }

        return () => {
          for (const tl of encendidos) tl.kill()
          for (const t of tweens) {
            t.scrollTrigger?.kill()
            t.kill()
          }
        }
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
                  {/* Punto sobre la línea. Crece al encenderse, y el
                      anillo del color del fondo lo separa de la línea
                      que pasa por detrás. */}
                  <span
                    data-punto
                    className="absolute left-0 top-2.5 size-[7px] rounded-full bg-violet-500 shadow-[0_0_0_4px_var(--color-base)] lg:left-0 lg:top-0"
                  />

                  <div className="lg:pt-10">
                    <Ilustracion />

                    <p className="font-display texto-degrade-2 mt-6 text-h3 font-semibold leading-none">
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
