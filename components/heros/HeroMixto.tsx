'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { etapasVentana, sesionTerminalCorta } from '@/content/heros'
import Glow from '@/components/bg/Glow'
import { POR_PARTES } from './PantallasPorPartes'
import TextoHero from './TextoHero'

/** Propuesta 6 — Mixto: terminal y ventanas.
 *
 *  El ciclo arranca con la terminal levantando un proyecto en ~5s, y
 *  después la misma ventana pasa a armar los tres tipos de proyecto uno
 *  tras otro, antes de volver a la terminal.
 *
 *  La terminal comparte el marco y la caja de las ventanas: 16:10 con la
 *  misma barra de navegador, así el ciclo no cambia de tamaño al pasar
 *  de una etapa a la otra.
 */

/** Verde de terminal, solo en las líneas de éxito. */
const VERDE = '#4EC9A0'

/** Las etapas del ciclo: la terminal primero y después las tres
 *  pantallas. `null` marca la etapa de terminal. */
const CICLO = [null, ...etapasVentana] as const

export default function HeroMixto() {
  const raiz = useRef<HTMLElement>(null)
  const [paso, setPaso] = useState(0)

  const etapa = CICLO[paso] ?? null
  const esTerminal = etapa === null
  const Pantalla = etapa ? POR_PARTES[etapa.pantalla] : null

  const avanzar = () => setPaso((p) => (p + 1) % CICLO.length)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: se muestra lo que corresponde a la etapa, ya
      // armado, y el ciclo no avanza.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-linea-term]', { opacity: 1, display: 'flex' })
        gsap.set('[data-texto-term]', { clipPath: 'inset(0 0% 0 0)' })
        gsap.set('[data-cursor]', { opacity: 0 })
        gsap.set('[data-parte]', { opacity: 1, y: 0 })
        gsap.set('[data-item]', { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ── Etapa de terminal ──
        if (esTerminal) {
          const lineas = gsap.utils.toArray<HTMLElement>('[data-linea-term]', raiz.current)
          const cursor = raiz.current?.querySelector<HTMLElement>('[data-cursor]')
          if (lineas.length === 0) return

          const parpadeo = cursor
            ? gsap.to(cursor, {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'steps(1)',
              })
            : null

          const tl = gsap.timeline({ onComplete: avanzar })

          gsap.set(lineas, { opacity: 0, display: 'none' })
          for (const l of lineas) {
            const t = l.querySelector('[data-texto-term]')
            if (t) gsap.set(t, { clipPath: 'inset(0 100% 0 0)' })
          }

          for (const linea of lineas) {
            const texto = linea.querySelector<HTMLElement>('[data-texto-term]')
            const esComando = linea.dataset.tipo === 'comando'
            const largo = (texto?.textContent ?? '').length

            tl.set(linea, { opacity: 1, display: 'flex' })

            if (esComando && texto) {
              // Tipeo más rápido que en la propuesta 5 (0,018 s por
              // carácter contra 0,028): la sesión entera tiene que
              // entrar en 5 segundos.
              tl.to(texto, {
                clipPath: 'inset(0 0% 0 0)',
                duration: largo * 0.018,
                ease: `steps(${Math.max(largo, 1)})`,
              })
            } else if (texto) {
              tl.to(texto, { clipPath: 'inset(0 0% 0 0)', duration: 0.01 }, '+=0.22')
            }
          }

          // Se queda un momento con la sesión completa y pasa a las
          // ventanas.
          tl.to(lineas, { opacity: 0, duration: 0.3, stagger: 0.03, ease: 'power2.in' }, '+=0.9')

          return () => {
            tl.kill()
            parpadeo?.kill()
          }
        }

        // ── Etapas de ventana ──
        const partes = gsap.utils.toArray<SVGGElement>('[data-parte]', raiz.current)
        if (partes.length === 0) return

        const tl = gsap.timeline({ onComplete: avanzar })
        gsap.set(partes, { opacity: 0, y: 18 })

        partes.forEach((parte, i) => {
          const items = parte.querySelectorAll('[data-item]')

          tl.to(parte, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, i * 0.38)

          if (items.length > 1) {
            tl.from(
              items,
              { opacity: 0, y: 14, duration: 0.32, stagger: 0.06, ease: 'power2.out' },
              i * 0.38 + 0.1,
            )
          }

          const trazo = parte.querySelector<SVGPathElement>('[data-trazo]')
          if (trazo) {
            const largo = trazo.getTotalLength()
            tl.fromTo(
              trazo,
              { strokeDasharray: largo, strokeDashoffset: largo },
              { strokeDashoffset: 0, duration: 0.75, ease: 'power2.inOut' },
              i * 0.38 + 0.15,
            )
          }
        })

        tl.to(
          [...partes].reverse(),
          { opacity: 0, y: -14, duration: 0.28, stagger: 0.07, ease: 'power2.in' },
          '+=1.9',
        )

        return () => tl.kill()
      })
    },
    { scope: raiz, dependencies: [paso] },
  )

  return (
    <section
      ref={raiz}
      className="relative flex min-h-svh items-center overflow-hidden pb-32 pt-32 lg:pt-40"
    >
      <Glow className="-right-44 -top-20" tamano={860} />

      <div className="contenedor grid w-full items-center gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
        <TextoHero compacto />

        <div className="lg:w-[118%]">
          {/* El marco es el mismo para la terminal y para las ventanas:
              así el ciclo no cambia de tamaño entre etapas. */}
          <div className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
              </span>
              <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
                {esTerminal ? 'eteria — bash' : etapa.url}
              </span>
            </div>

            {/* Misma caja para las dos etapas. */}
            <div className="aspect-16/10">
              {esTerminal ? (
                <div className="size-full bg-[#0A0814] p-5 font-mono text-[12.5px] leading-[1.85] lg:p-7 lg:text-[14px]">
                  {sesionTerminalCorta.map((l, i) => (
                    <p
                      key={`${l.texto}-${i}`}
                      data-linea-term
                      data-tipo={l.tipo}
                      className="flex gap-2 whitespace-nowrap"
                      style={{ opacity: 0, display: 'none' }}
                    >
                      <span
                        aria-hidden="true"
                        className={`shrink-0 text-violet-300 ${
                          l.tipo === 'comando' ? '' : 'opacity-0'
                        }`}
                      >
                        $
                      </span>
                      <span
                        data-texto-term
                        className="block will-change-[clip-path]"
                        style={{
                          clipPath: 'inset(0 100% 0 0)',
                          color:
                            l.tipo === 'ok'
                              ? VERDE
                              : l.tipo === 'comando'
                                ? '#F4F2FF'
                                : '#8B85AD',
                        }}
                      >
                        {l.texto}
                      </span>
                    </p>
                  ))}

                  <p className="flex gap-2">
                    <span aria-hidden="true" className="shrink-0 text-violet-300">
                      $
                    </span>
                    <span
                      data-cursor
                      aria-hidden="true"
                      className="inline-block h-[1.15em] w-[0.55em] translate-y-[0.15em] bg-violet-300"
                    />
                  </p>
                </div>
              ) : (
                Pantalla && <Pantalla />
              )}
            </div>
          </div>

          {/* Indicador de la etapa. */}
          <div className="mt-4 flex items-center gap-3">
            <p aria-live="polite" className="text-label text-low">
              {esTerminal ? 'Desarrollo' : etapa.etiqueta}
            </p>
            <span className="flex gap-1.5" aria-hidden="true">
              {CICLO.map((e, i) => (
                <span
                  key={e?.pantalla ?? 'terminal'}
                  className={`h-0.5 w-6 rounded-full transition-colors duration-500 ${
                    i === paso ? 'bg-violet-500' : 'bg-hairline'
                  }`}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
