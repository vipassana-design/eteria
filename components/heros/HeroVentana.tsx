'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { etapasVentana } from '@/content/heros'
import Glow from '@/components/bg/Glow'
import { POR_PARTES } from './PantallasPorPartes'
import TextoHero from './TextoHero'

/** Propuesta 3 — Ventana que se construye sola.
 *
 *  Una ventana grande a la derecha donde la interfaz se arma por partes,
 *  se desarma, y vuelve a armarse con otro tipo de proyecto: tienda →
 *  panel → institucional. El texto de la izquierda queda quieto.
 *
 *  Las partes entran con `y`, `opacity` y `scale`: composición, sin
 *  layout. El ciclo avanza con estado de React solo para cambiar de
 *  pantalla; el armado dentro de cada una es puro GSAP.
 */
export default function HeroVentana() {
  const raiz = useRef<HTMLElement>(null)
  const [indice, setIndice] = useState(0)
  const etapa = etapasVentana[indice]!
  const Pantalla = POR_PARTES[etapa.pantalla]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: la interfaz se muestra armada y no rota.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-parte]', { opacity: 1, y: 0, scale: 1 })
        gsap.set('[data-item]', { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const partes = gsap.utils.toArray<SVGGElement>('[data-parte]', raiz.current)
        if (partes.length === 0) return

        const tl = gsap.timeline({
          onComplete: () => setIndice((i) => (i + 1) % etapasVentana.length),
        })

        gsap.set(partes, { opacity: 0, y: 18 })

        // Armado: cada parte entra en orden.
        partes.forEach((parte, i) => {
          const items = parte.querySelectorAll('[data-item]')

          tl.to(parte, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, i * 0.42)

          // Las partes con varios elementos (grilla, tabla, barras) los
          // dejan caer con stagger: es lo que da la sensación de que el
          // contenido se está poblando.
          if (items.length > 1) {
            tl.from(
              items,
              { opacity: 0, y: 14, duration: 0.35, stagger: 0.07, ease: 'power2.out' },
              i * 0.42 + 0.1,
            )
          }

          // El trazo del gráfico se dibuja.
          const trazo = parte.querySelector<SVGPathElement>('[data-trazo]')
          if (trazo) {
            const largo = trazo.getTotalLength()
            tl.fromTo(
              trazo,
              { strokeDasharray: largo, strokeDashoffset: largo },
              { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
              i * 0.42 + 0.15,
            )
          }
        })

        // Se queda quieta un momento y se desarma en orden inverso.
        tl.to(
          [...partes].reverse(),
          { opacity: 0, y: -14, duration: 0.3, stagger: 0.08, ease: 'power2.in' },
          '+=2.4',
        )

        return () => tl.kill()
      })
    },
    { scope: raiz, dependencies: [indice] },
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
          <div className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
              </span>
              <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
                {etapa.url}
              </span>
            </div>

            <div className="aspect-16/10">
              <Pantalla />
            </div>
          </div>

          {/* Indicador del tipo de proyecto que se está armando. */}
          <div className="mt-4 flex items-center gap-3">
            <p aria-live="polite" className="text-label text-low">
              {etapa.etiqueta}
            </p>
            <span className="flex gap-1.5" aria-hidden="true">
              {etapasVentana.map((e, i) => (
                <span
                  key={e.pantalla}
                  className={`h-0.5 w-6 rounded-full transition-colors duration-500 ${
                    i === indice ? 'bg-violet-500' : 'bg-hairline'
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
