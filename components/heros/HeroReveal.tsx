'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { mockups } from '@/content/mockups'
import { PANTALLAS } from '@/components/home/PantallasMockup'
import TextoHero from './TextoHero'

/** Propuesta 2 — Reveal.
 *
 *  Grilla de mockups a pantalla completa detrás del texto, todos
 *  desaturados y oscurecidos. El cursor funciona como foco: lo que queda
 *  cerca recupera color, escala y nitidez, y se apaga al alejarse.
 *
 *  En mobile no hay cursor: queda encendida la zona central.
 *
 *  Cada celda se anima con `scale`, `opacity` y `filter`, todas de
 *  composición. La distancia se calcula sobre un rect medido una vez y
 *  recalculado en resize, no en cada movimiento del mouse.
 */

/** Radio del foco en px: más allá de esto la celda queda apagada. */
const RADIO = 320

export default function HeroReveal() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Mobile o reduced-motion: se enciende la zona central y listo.
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        const celdas = gsap.utils.toArray<HTMLElement>('[data-celda]', raiz.current)
        const contenedor = raiz.current?.querySelector<HTMLElement>('[data-grilla]')
        if (!contenedor) return

        const caja = contenedor.getBoundingClientRect()
        const cx = caja.width / 2
        const cy = caja.height / 2

        for (const celda of celdas) {
          const c = celda.getBoundingClientRect()
          const dx = c.left - caja.left + c.width / 2 - cx
          const dy = c.top - caja.top + c.height / 2 - cy
          const dist = Math.hypot(dx, dy)
          const fuerza = gsap.utils.clamp(0, 1, 1 - dist / (RADIO * 1.4))

          gsap.set(celda, {
            opacity: 0.32 + fuerza * 0.6,
            filter: `grayscale(${1 - fuerza}) brightness(${0.55 + fuerza * 0.45})`,
            scale: 1 + fuerza * 0.04,
          })
        }
      })

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const contenedor = raiz.current?.querySelector<HTMLElement>('[data-grilla]')
        const celdas = gsap.utils.toArray<HTMLElement>('[data-celda]', raiz.current)
        if (!contenedor || celdas.length === 0) return

        // quickTo evita crear un tween nuevo por cada mousemove.
        const setters = celdas.map((celda) => ({
          celda,
          opacidad: gsap.quickTo(celda, 'opacity', { duration: 0.5, ease: 'power2.out' }),
          escala: gsap.quickTo(celda, 'scale', { duration: 0.6, ease: 'power3.out' }),
          centro: { x: 0, y: 0 },
        }))

        // Los centros se miden una vez, no en cada frame.
        const medir = () => {
          const caja = contenedor.getBoundingClientRect()
          for (const s of setters) {
            const c = s.celda.getBoundingClientRect()
            s.centro = {
              x: c.left - caja.left + c.width / 2,
              y: c.top - caja.top + c.height / 2,
            }
          }
        }
        medir()

        const observador = new ResizeObserver(medir)
        observador.observe(contenedor)

        let raton = { x: -9999, y: -9999 }
        let pendiente = false

        const aplicar = () => {
          pendiente = false
          const caja = contenedor.getBoundingClientRect()
          const mx = raton.x - caja.left
          const my = raton.y - caja.top

          for (const s of setters) {
            const dist = Math.hypot(s.centro.x - mx, s.centro.y - my)
            const fuerza = gsap.utils.clamp(0, 1, 1 - dist / RADIO)

            s.opacidad(0.3 + fuerza * 0.62)
            s.escala(1 + fuerza * 0.07)
            // filter no tiene quickTo: se setea directo, sigue siendo
            // una propiedad de composición.
            s.celda.style.filter = `grayscale(${(1 - fuerza).toFixed(2)}) brightness(${(
              0.55 + fuerza * 0.45
            ).toFixed(2)})`
          }
        }

        // El cálculo se agenda en el ticker: un solo pase por frame,
        // por más eventos de mouse que lleguen.
        const alMover = (e: MouseEvent) => {
          raton = { x: e.clientX, y: e.clientY }
          if (!pendiente) {
            pendiente = true
            gsap.ticker.add(aplicar, true, true)
          }
        }

        const alSalir = () => {
          raton = { x: -9999, y: -9999 }
          aplicar()
        }

        window.addEventListener('mousemove', alMover)
        window.addEventListener('mouseleave', alSalir)

        return () => {
          window.removeEventListener('mousemove', alMover)
          window.removeEventListener('mouseleave', alSalir)
          gsap.ticker.remove(aplicar)
          observador.disconnect()
        }
      })
    },
    { scope: raiz },
  )

  // La grilla repite los seis mockups hasta llenar la pantalla.
  const celdas = Array.from({ length: 24 }, (_, i) => {
    const m = mockups[i % mockups.length]!
    return { ...m, clave: `${m.id}-${i}` }
  })

  return (
    <section ref={raiz} className="relative flex min-h-svh items-center overflow-hidden">
      {/* Grilla de fondo */}
      <div
        data-grilla
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid grid-cols-3 gap-3 p-3 lg:grid-cols-6 lg:gap-4 lg:p-4"
      >
        {celdas.map((m) => {
          const Pantalla = PANTALLAS[m.pantalla]
          return (
            <div
              key={m.clave}
              data-celda
              className="overflow-hidden rounded-xl border border-hairline bg-elevated will-change-[transform,opacity,filter]"
              style={{ opacity: 0.3, filter: 'grayscale(1) brightness(0.55)' }}
            >
              <div className="aspect-16/10 overflow-hidden">
                <Pantalla />
              </div>
            </div>
          )
        })}
      </div>

      {/* Velo: sin esto el texto no se lee sobre la grilla. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-base/55"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 62% 58% at 26% 50%, rgba(12,10,24,0.92) 0%, rgba(12,10,24,0.4) 62%, rgba(12,10,24,0.08) 100%)',
        }}
      />

      <div className="contenedor relative pb-32 pt-32 lg:pt-40">
        <TextoHero />
      </div>
    </section>
  )
}
