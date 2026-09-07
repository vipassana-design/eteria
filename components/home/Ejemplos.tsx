'use client'

import { useCallback, useRef, useState } from 'react'
import { Draggable, Flip, gsap, useGSAP } from '@/lib/gsap'
import { bloquearScroll } from '@/lib/lenis'
import { ease } from '@/lib/motion'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { mockups, seccionEjemplos } from '@/content/mockups'
import { PANTALLAS } from './PantallasMockup'
import MockupModal from './MockupModal'

/** Sección "Ejemplos" — carrusel de mockups (PLAN.md §4.6).
 *
 *  Carrusel horizontal con flechas y drag con inercia. Se ven ~2.5
 *  cards a la vez para que se entienda que hay más.
 *
 *  En mobile no hay flechas: solo drag con snap por card (§7).
 */
export default function Ejemplos() {
  const raiz = useRef<HTMLElement>(null)
  const pista = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])
  const draggable = useRef<Draggable | null>(null)
  const [abierto, setAbierto] = useState<number | null>(null)

  /** Posición x de cada card, para el snap y las flechas. */
  const posiciones = useRef<number[]>([])
  const [indiceVisible, setIndiceVisible] = useState(0)

  useGSAP(
    () => {
      const contenedor = pista.current
      const padre = contenedor?.parentElement
      if (!contenedor || !padre) return

      const medir = () => {
        const items = cards.current.filter(Boolean) as HTMLElement[]
        if (items.length === 0) return 0

        // Posición de cada card relativa al inicio de la pista.
        const base = items[0]!.offsetLeft
        posiciones.current = items.map((el) => -(el.offsetLeft - base))

        // El límite es cuánto sobra de la pista respecto del contenedor.
        return Math.min(0, padre.clientWidth - contenedor.scrollWidth)
      }

      let minX = medir()

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const d = Draggable.create(contenedor, {
          type: 'x',
          // InertiaPlugin: el arrastre sigue con inercia al soltar.
          inertia: true,
          edgeResistance: 0.92,
          bounds: { minX, maxX: 0 },
          // Snap a la posición de cada card al terminar la inercia.
          snap: { x: (valor) => cercano(valor, posiciones.current, minX) },
          onDrag: actualizarIndice,
          onThrowUpdate: actualizarIndice,
          cursor: 'grab',
          activeCursor: 'grabbing',
        })

        draggable.current = d[0] ?? null

        const alRedimensionar = () => {
          minX = medir()
          draggable.current?.applyBounds({ minX, maxX: 0 })
        }
        window.addEventListener('resize', alRedimensionar)

        return () => {
          window.removeEventListener('resize', alRedimensionar)
          draggable.current?.kill()
          draggable.current = null
        }
      })

      function actualizarIndice() {
        const x = gsap.getProperty(contenedor, 'x') as number
        let mejor = 0
        let dist = Infinity
        posiciones.current.forEach((p, i) => {
          const d = Math.abs(p - x)
          if (d < dist) {
            dist = d
            mejor = i
          }
        })
        setIndiceVisible(mejor)
      }
    },
    { scope: raiz },
  )

  /** Lleva el carrusel a una card por índice. */
  const irA = useCallback((i: number) => {
    const contenedor = pista.current
    const destino = posiciones.current[i]
    if (!contenedor || destino === undefined) return

    const limite = draggable.current?.vars.bounds as { minX: number } | undefined
    const x = limite ? Math.max(limite.minX, destino) : destino

    gsap.to(contenedor, {
      x,
      duration: 0.6,
      ease: ease.out,
      onUpdate: () => draggable.current?.update(),
    })
    setIndiceVisible(i)
  }, [])

  /** Estado de la card capturado en el click, para que el modal anime
   *  desde ahí. */
  const estadoOrigen = useRef<Flip.FlipState | null>(null)

  /** Al abrir el modal pasan dos cosas antes de que React re-renderice:
   *
   *  1. Se detiene Lenis. Flip mide getBoundingClientRect() y con el
   *     scroll interpolando lo medido deja de ser válido en el frame
   *     siguiente: la transición salta en vez de fluir.
   *  2. Se captura el estado de la card acá y no dentro del modal. El
   *     modal no existe en el DOM mientras está cerrado, así que para
   *     cuando monta ya no hay forma de leer la posición de partida.
   */
  const abrirModal = useCallback((i: number) => {
    bloquearScroll(true)

    const card = cards.current[i]
    estadoOrigen.current = card ? Flip.getState(card) : null

    setAbierto(i)
  }, [])

  const { ui } = seccionEjemplos
  const enElPrimero = indiceVisible === 0
  const enElUltimo = indiceVisible >= mockups.length - 1

  return (
    <>
      <section ref={raiz} id="ejemplos" className="seccion relative scroll-mt-24 overflow-hidden">
        <div className="contenedor">
          <div className="flex items-end justify-between gap-8">
            <TituloSeccion
              degrade={seccionEjemplos.tituloDegrade}
              bajada={seccionEjemplos.bajada}
            >
              {seccionEjemplos.titulo}
            </TituloSeccion>

            {/* Flechas: solo desktop (§7). */}
            <div className="hidden shrink-0 gap-3 lg:flex">
              <BotonFlecha
                direccion="izquierda"
                etiqueta={ui.anterior}
                deshabilitado={enElPrimero}
                onClick={() => irA(Math.max(0, indiceVisible - 1))}
              />
              <BotonFlecha
                direccion="derecha"
                etiqueta={ui.siguiente}
                deshabilitado={enElUltimo}
                onClick={() => irA(Math.min(mockups.length - 1, indiceVisible + 1))}
              />
            </div>
          </div>
        </div>

        {/* La pista arranca alineada al contenedor pero se desborda a la
            derecha: así se ve que hay más cards fuera de pantalla. */}
        <div className="mt-14 overflow-hidden lg:mt-16">
          <div
            ref={pista}
            className="flex w-max gap-5 px-6 lg:gap-6 lg:px-16"
            style={{ paddingInlineStart: 'max(1.5rem, calc((100vw - 1280px) / 2 + 4rem))' }}
          >
            {mockups.map((m, i) => {
              const Pantalla = PANTALLAS[m.pantalla]

              return (
                <article
                  key={m.id}
                  ref={(el) => {
                    cards.current[i] = el
                  }}
                  className="w-[80vw] shrink-0 sm:w-[58vw] lg:w-[36rem]"
                >
                  <button
                    type="button"
                    onClick={() => abrirModal(i)}
                    aria-label={`${ui.abrir}: ${m.titulo}`}
                    className="group block w-full text-left"
                  >
                    <div className="overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated transition-colors duration-500 ease-(--ease-suave) group-hover:border-hairline-hover">
                      {/* Barra de navegador */}
                      <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
                        <span className="flex gap-1.5">
                          <span className="size-2 rounded-full bg-[#4A4370]" />
                          <span className="size-2 rounded-full bg-[#4A4370]" />
                          <span className="size-2 rounded-full bg-[#4A4370]" />
                        </span>
                        <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
                          {m.url}
                        </span>
                      </div>

                      {/* La pantalla se recorta: el detalle completo va
                          en el modal. */}
                      <div
                        role="img"
                        aria-label={m.alt}
                        className="aspect-16/10 overflow-hidden"
                      >
                        <Pantalla />
                      </div>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <p className="text-cuerpo text-hi">{m.titulo}</p>
                      <p className="text-label shrink-0 text-low">{m.rubro}</p>
                    </div>
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <div className="contenedor mt-8">
          <p className="text-label text-low lg:hidden">{ui.pista}</p>
        </div>
      </section>

      <MockupModal
        indice={abierto}
        onCerrar={() => setAbierto(null)}
        onCambiar={setAbierto}
        estadoOrigen={estadoOrigen}
      />
    </>
  )
}

function BotonFlecha({
  direccion,
  etiqueta,
  deshabilitado,
  onClick,
}: {
  direccion: 'izquierda' | 'derecha'
  etiqueta: string
  deshabilitado: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={deshabilitado}
      aria-label={etiqueta}
      className="flex size-11 items-center justify-center rounded-(--radius-pill) border border-hairline text-hi transition-colors duration-300 ease-(--ease-suave) hover:border-hairline-hover disabled:pointer-events-none disabled:opacity-35"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direccion === 'izquierda' ? <path d="m14 6-6 6 6 6" /> : <path d="m10 6 6 6-6 6" />}
      </svg>
    </button>
  )
}

/** Devuelve la posición de snap más cercana, respetando el límite. */
function cercano(valor: number, posiciones: number[], minX: number): number {
  let mejor = valor
  let dist = Infinity
  for (const p of posiciones) {
    const limitada = Math.max(minX, p)
    const d = Math.abs(limitada - valor)
    if (d < dist) {
      dist = d
      mejor = limitada
    }
  }
  return mejor
}
