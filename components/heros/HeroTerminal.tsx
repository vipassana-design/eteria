'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { sesionTerminal } from '@/content/heros'
import Glow from '@/components/bg/Glow'
import TextoHero from './TextoHero'

/** Propuesta 5 — Terminal.
 *
 *  Una sesión de trabajo: los comandos se escriben solos y devuelven su
 *  salida, levantando un proyecto de punta a punta. Loop continuo.
 *
 *  El tipeo se hace revelando caracteres con `clip-path` en vez de
 *  reescribir textContent: escribir en el DOM en cada frame fuerza
 *  layout, y el clip corre en composición.
 */

/** Verde de terminal. Entra solo en las líneas de éxito: es acento
 *  funcional, no decoración. La paleta del sitio no cambia. */
const VERDE = '#4EC9A0'

export default function HeroTerminal() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: la sesión se muestra completa y quieta.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-linea-term]', { opacity: 1, display: 'flex' })
        gsap.set('[data-texto-term]', { clipPath: 'inset(0 0% 0 0)' })
        gsap.set('[data-cursor]', { opacity: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lineas = gsap.utils.toArray<HTMLElement>('[data-linea-term]', raiz.current)
        const cursor = raiz.current?.querySelector<HTMLElement>('[data-cursor]')
        if (lineas.length === 0) return

        // Cursor parpadeando, independiente del ciclo.
        const parpadeo = cursor
          ? gsap.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' })
          : null

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4 })

        gsap.set(lineas, { opacity: 0, display: 'none' })
        for (const l of lineas) {
          const texto = l.querySelector('[data-texto-term]')
          if (texto) gsap.set(texto, { clipPath: 'inset(0 100% 0 0)' })
        }

        for (const linea of lineas) {
          const texto = linea.querySelector<HTMLElement>('[data-texto-term]')
          const esComando = linea.dataset.tipo === 'comando'
          const largo = (texto?.textContent ?? '').length

          tl.set(linea, { opacity: 1, display: 'flex' })

          if (esComando && texto) {
            // Tipeo: el clip se abre a velocidad de tecleo, con
            // `steps` para que se vea carácter por carácter.
            tl.to(texto, {
              clipPath: 'inset(0 0% 0 0)',
              duration: largo * 0.028,
              ease: `steps(${Math.max(largo, 1)})`,
            })
            // El cursor acompaña al comando que se está escribiendo.
            if (cursor) tl.set(cursor, { x: 0 }, '<')
          } else if (texto) {
            // La salida no se tipea: aparece de golpe, como en una
            // terminal real, tras una pausa de "procesamiento".
            tl.to(texto, { clipPath: 'inset(0 0% 0 0)', duration: 0.01 }, '+=0.42')
          }
        }

        // La sesión se limpia y arranca de nuevo.
        tl.to(lineas, { opacity: 0, duration: 0.4, stagger: 0.03, ease: 'power2.in' }, '+=2')
          .set(lineas, { display: 'none' })

        return () => {
          tl.kill()
          parpadeo?.kill()
        }
      })
    },
    { scope: raiz },
  )

  return (
    <section
      ref={raiz}
      className="relative flex min-h-svh items-center overflow-hidden pb-32 pt-32 lg:pt-40"
    >
      <Glow className="-right-40 -top-16" tamano={780} />

      <div className="contenedor grid w-full items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <TextoHero compacto />

        {/* Panel de terminal */}
        <div className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-[#0A0814] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#15112B] px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="size-2 rounded-full bg-[#4A4370]" />
              <span className="size-2 rounded-full bg-[#4A4370]" />
              <span className="size-2 rounded-full bg-[#4A4370]" />
            </span>
            <span className="text-[11px] leading-none text-low">eteria — bash</span>
          </div>

          <div className="min-h-[22rem] p-5 font-mono text-[12.5px] leading-[1.85] lg:min-h-[26rem] lg:p-6 lg:text-[13.5px]">
            {sesionTerminal.map((l, i) => (
              <p
                key={`${l.texto}-${i}`}
                data-linea-term
                data-tipo={l.tipo}
                className="flex gap-2 whitespace-nowrap"
                // display:none hasta entrar: asi las lineas no reservan
                // alto y el cursor queda pegado al ultimo comando.
                style={{ opacity: 0, display: 'none' }}
              >
                {l.tipo === 'comando' ? (
                  <span aria-hidden="true" className="shrink-0 text-violet-300">
                    $
                  </span>
                ) : (
                  <span aria-hidden="true" className="shrink-0 opacity-0">
                    $
                  </span>
                )}
                <span
                  data-texto-term
                  className="block will-change-[clip-path]"
                  style={{
                    clipPath: 'inset(0 100% 0 0)',
                    color:
                      l.tipo === 'ok' ? VERDE : l.tipo === 'comando' ? '#F4F2FF' : '#8B85AD',
                  }}
                >
                  {l.texto}
                </span>
              </p>
            ))}

            {/* Cursor */}
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
        </div>
      </div>
    </section>
  )
}
