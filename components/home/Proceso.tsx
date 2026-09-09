'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { dur, ease } from '@/lib/motion'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { proceso, seccionProceso } from '@/content/proceso'
import { ILUSTRACIONES } from './IlustracionesProceso'

/** Colores del encendido. Se leen de los tokens y no se hardcodean:
 *  GSAP no resuelve `var()` al interpolar un color, así que hay que
 *  pasarle el valor ya calculado. */
const leerToken = (t: string) =>
  typeof document === 'undefined'
    ? '#ffffff'
    : getComputedStyle(document.documentElement).getPropertyValue(t).trim()

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
      // Los colores se resuelven acá y no en el módulo: el componente
      // corre en el cliente, así que el documento ya existe y los
      // tokens están calculados.
      const AZUL = leerToken('--color-violet-500')
      const AZUL_CLARO = leerToken('--color-violet-300')
      const GRIS = leerToken('--color-hairline-hover')
      const BASE = leerToken('--color-base')
      const ANILLO_OFF = `0 0 0 4px ${BASE}`
      const ANILLO_ON = `0 0 0 4px ${BASE}, 0 0 14px 0 color-mix(in srgb, ${AZUL} 55%, transparent)`

      const mm = gsap.matchMedia()

      // Sin movimiento: todo visible y la línea completa.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-etapa]', { opacity: 1, y: 0 })
        gsap.set('[data-punto]', { scale: 1, backgroundColor: AZUL, boxShadow: ANILLO_ON })
        gsap.set('[data-icono]', { color: AZUL_CLARO })
        gsap.set('[data-linea]', { strokeDashoffset: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const etapas = gsap.utils.toArray<HTMLElement>('[data-etapa]', raiz.current)
        const lineas = gsap.utils.toArray<SVGPathElement>('[data-linea]', raiz.current)
        const tweens: gsap.core.Tween[] = []

        // ── Estado apagado ──
        //
        // El punto arranca gris y chico, y la ilustración en el gris
        // del hairline: al encenderse los dos pasan al acento. Es el
        // cambio que hace que la etapa se lea como "activada" y no
        // solo como "aparecida".
        gsap.set(etapas, { opacity: 0.22, y: 26 })
        gsap.set('[data-punto]', { scale: 0.45, backgroundColor: GRIS, boxShadow: ANILLO_OFF })
        gsap.set('[data-icono]', { color: GRIS })

        // Cada etapa tiene su tween de encendido, en pausa. Se dispara
        // desde el progreso de la línea, así el orden es el del trazo.
        const encendidos = etapas.map((etapa) => {
          const punto = etapa.querySelector('[data-punto]')
          const icono = etapa.querySelector('[data-icono]')
          // `reversed: true` desde el arranque: así el primer `play()`
          // lo recorre hacia adelante y `reverse()` lo devuelve, en vez
          // de tener que distinguir el primer disparo del resto.
          const tl = gsap.timeline({ paused: true })

          tl.to(etapa, { opacity: 1, y: 0, duration: dur.base, ease: ease.out })

          // El punto prende primero: es el que la línea toca.
          if (punto) {
            tl.to(
              punto,
              {
                scale: 1,
                backgroundColor: AZUL,
                boxShadow: ANILLO_ON,
                duration: 0.42,
                ease: 'back.out(2.6)',
              },
              0,
            )
          }

          // La ilustración lo sigue con un retardo corto, así se lee la
          // secuencia punto → contenido.
          if (icono) {
            tl.to(icono, { color: AZUL_CLARO, duration: 0.5, ease: 'power2.out' }, 0.12)
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
                  // posición, y se apaga cuando el trazo vuelve atrás:
                  // el timeline está en pausa, así que `play` y
                  // `reverse` lo recorren en los dos sentidos y la
                  // animación inversa sale gratis.
                  //
                  // Se comparan las direcciones y no el estado: llamar
                  // `play()` en cada frame reiniciaría el ease.
                  encendidos.forEach((tl, i) => {
                    const umbral = i / encendidos.length + 0.04
                    const debeEstar = self.progress >= umbral
                    const yendo = tl.reversed() === false

                    if (debeEstar && (!yendo || tl.paused())) tl.play()
                    else if (!debeEstar && yendo && tl.progress() > 0) tl.reverse()
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
              strokeWidth={2}
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
              strokeWidth={2}
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
                  className="relative pl-9 lg:pl-0 lg:pt-0"
                >
                  {/* Punto sobre la línea. Crece al encenderse, y el
                      anillo del color del fondo lo separa de la línea
                      que pasa por detrás. */}
                  <span
                    data-punto
                    // Sin color en la clase: GSAP lo pasa de gris al
                    // acento cuando la línea llega. El anillo del color
                    // del fondo lo separa de la línea que pasa detrás.
                    className="absolute left-0 top-2.5 size-[9px] rounded-full lg:left-0 lg:top-0"
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
