'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Flip, gsap, useGSAP } from '@/lib/gsap'
import { bloquearScroll } from '@/lib/lenis'
import TituloSeccion from '@/components/ui/TituloSeccion'
import Glow from '@/components/bg/Glow'
import MockupModal from '@/components/home/MockupModal'
import { plantillas } from '@/content/plantillas'
import { PLANTILLAS } from '@/components/plantillas/registro'
import { LINEA_DE_LANDING, seccionEjemplos } from '@/content/ejemplosLanding'
import type { LandingSlug } from '@/types'

/** Las tres plantillas de la línea, en la landing de servicio (§16).
 *
 *  **Tres cards fijas, no un carrusel.** El carrusel es el recurso de
 *  la home, donde hay nueve propuestas y el arrastre invita a
 *  descubrirlas. Acá el visitante ya eligió un servicio: lo que
 *  corresponde es ver las tres de esa línea a la vez, sin tener que
 *  arrastrar para saber que existen. Repetir el carrusel también le
 *  quitaría peso al de la home.
 *
 *  Reusa `MockupModal`, que ya sabe abrir una plantilla en un iframe
 *  con el Flip desde la card. Para eso el modal indexa sobre las
 *  plantillas **listas de esta línea**, no sobre las nueve: así las
 *  flechas ←/→ del modal recorren las tres del servicio, que es el
 *  conjunto que el visitante está mirando.
 *
 *  El hover repite el gesto del carrusel de la home —la card sube y
 *  gana brillo— para que los dos módulos se lean como el mismo recurso
 *  en dos escalas.
 */
/** Mismo criterio que el carrusel de la home: a color desde el
 *  reposo, y el hover como realce por brillo. */
const REPOSO = 'brightness(0.94)'
const ACTIVO = 'brightness(1)'

export default function EjemplosLanding({ slug }: { slug: LandingSlug }) {
  const raiz = useRef<HTMLElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])
  const estadoOrigen = useRef<Flip.FlipState | null>(null)
  const [abierto, setAbierto] = useState<number | null>(null)

  const linea = LINEA_DE_LANDING[slug]
  const listas = plantillas.filter((p) => PLANTILLAS[p.slug] && p.linea === linea)

  // El hover: mismo gesto que el carrusel de la home. Va con GSAP y no
  // con transición CSS porque el filtro y el transform se animan juntos
  // y con `prefers-reduced-motion` hay que poder desactivarlos.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-ventana]', { filter: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const limpiar: (() => void)[] = []

        for (const card of gsap.utils.toArray<HTMLElement>('[data-card]', raiz.current)) {
          const ventana = card.querySelector('[data-ventana]')

          const entrar = () => {
            gsap.to(card, { y: -8, duration: 0.4, ease: 'power3.out' })
            gsap.to(ventana, { filter: ACTIVO, duration: 0.5, ease: 'power2.out' })
          }
          const salir = () => {
            gsap.to(card, { y: 0, duration: 0.4, ease: 'power3.out' })
            gsap.to(ventana, { filter: REPOSO, duration: 0.5, ease: 'power2.out' })
          }

          card.addEventListener('mouseenter', entrar)
          card.addEventListener('mouseleave', salir)
          limpiar.push(() => {
            card.removeEventListener('mouseenter', entrar)
            card.removeEventListener('mouseleave', salir)
          })
        }

        return () => {
          for (const f of limpiar) f()
        }
      })
    },
    { scope: raiz },
  )

  /** El orden importa y es el mismo que en la home: Lenis detenido y la
   *  medición de la card **antes** del re-render. El modal no está en el
   *  DOM hasta el commit siguiente, así que no puede medir su origen.
   *
   *  Sin `useCallback`: no se pasa a ningún hijo memoizado, solo al
   *  `onClick` de un botón, y envolverla hacía que el compilador de
   *  React avisara que no puede preservar la memoización. */
  const abrirModal = (indice: number, elemento: HTMLElement | null) => {
    bloquearScroll(true)
    estadoOrigen.current = elemento ? Flip.getState(elemento) : null
    setAbierto(indice)
  }

  if (listas.length === 0) return null

  return (
    <>
      <section
        ref={raiz}
        id="ejemplos"
        className="seccion relative scroll-mt-24 overflow-hidden"
      >
        <Glow className="-left-56 top-16" tamano={600} intensidad={0.5} soloDesktop />

        <div className="contenedor">
          <TituloSeccion bajada={seccionEjemplos.bajada}>
            {seccionEjemplos.titulo[slug]}
          </TituloSeccion>

          {/* Tres columnas en desktop, una en mobile. El aire vertical
              deja lugar al hover, que sube la card 8px. */}
          <div className="mt-10 grid gap-6 py-2 lg:mt-12 lg:grid-cols-3 lg:gap-7">
            {listas.map((p, i) => (
              <article
                key={p.slug}
                data-card
                ref={(el) => {
                  cards.current[i] = el
                }}
                className="will-change-[transform]"
              >
                <button
                  type="button"
                  onClick={() => abrirModal(i, cards.current[i] ?? null)}
                  aria-label={`${p.titulo}. ${seccionEjemplos.abrir}`}
                  className="group block w-full text-left"
                >
                  <div
                    data-ventana
                    className="overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated transition-colors duration-500 ease-(--ease-suave) group-hover:border-hairline-hover"
                    style={{ filter: REPOSO }}
                  >
                    {/* El marco de navegador, igual que en la home. La
                        barra de direcciones va vacía a propósito: las
                        URLs de ejemplo pueden ser sitios de terceros. */}
                    <div className="flex items-center gap-2 border-b border-white/[0.07] bg-[#211C3D] px-3 py-2">
                      <span className="flex gap-1">
                        <span className="size-1.5 rounded-full bg-[#4A4370]" />
                        <span className="size-1.5 rounded-full bg-[#4A4370]" />
                        <span className="size-1.5 rounded-full bg-[#4A4370]" />
                      </span>
                      <span className="min-h-[1.125rem] flex-1 rounded-(--radius-pill) bg-black/25" />
                    </div>

                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={`/plantillas/${p.slug}/preview.webp`}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-cuerpo-lg text-hi">{p.titulo}</p>
                    <p className="text-label mt-1 flex items-center gap-2 text-low">
                      {seccionEjemplos.abrir}
                      <span className="transition-transform duration-300 ease-(--ease-suave) group-hover:translate-x-1">
                        →
                      </span>
                    </p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* El modal indexa sobre las tres de esta línea: así las flechas
          recorren el conjunto que el visitante está mirando y no las
          nueve de la home. */}
      <MockupModal
        indice={abierto}
        onCerrar={() => setAbierto(null)}
        onCambiar={setAbierto}
        estadoOrigen={estadoOrigen}
        lista={listas}
      />
    </>
  )
}
