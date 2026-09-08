'use client'

import { useCallback, useRef, useState } from 'react'
import { Draggable, Flip, gsap, useGSAP } from '@/lib/gsap'
import { bloquearScroll } from '@/lib/lenis'
import TituloSeccion from '@/components/ui/TituloSeccion'
import { mockups, seccionEjemplos } from '@/content/mockups'
import { PANTALLAS } from './PantallasMockup'
import MockupModal from './MockupModal'

/** Sección "Ejemplos" — carrusel de mockups (PLAN.md §4.6).
 *
 *  Marcha automática continua e infinita. Las cards se pueden arrastrar
 *  para los dos lados sin tope; al soltar, el carrusel espera un momento
 *  quieto y retoma la marcha desde donde quedó.
 *
 *  El hover ilumina la card y frena la marcha. El click abre el modal.
 *
 *  El loop anima `x` sobre la pista y la envuelve con un modificador:
 *  las cards están duplicadas, así que cuando avanzó un ciclo entero la
 *  x vuelve a 0 sin que se vea el corte. Todo composición, sin layout.
 */

/** Velocidad de la marcha en píxeles por segundo. */
const VELOCIDAD = 46

/** Cuánto se queda quieto después de soltar el arrastre, en ms. */
const PAUSA_TRAS_SOLTAR = 1600

/** Estado apagado de las cards: el hover las devuelve a color pleno. */
const APAGADO = 'grayscale(0.7) brightness(0.62)'
const ENCENDIDO = 'grayscale(0) brightness(1)'

export default function Ejemplos() {
  const raiz = useRef<HTMLElement>(null)
  const pista = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLElement | null)[]>([])
  const [abierto, setAbierto] = useState<number | null>(null)
  const estadoOrigen = useRef<Flip.FlipState | null>(null)

  /** Tween de la marcha, para frenarlo desde el hover y el arrastre. */
  const marcha = useRef<gsap.core.Tween | null>(null)
  /** Timer de la pausa posterior al arrastre. */
  const temporizador = useRef<number | null>(null)
  /** Con el puntero sobre una card, la marcha no debe retomar. */
  const sobreCard = useRef(false)
  /** Con el modal abierto tampoco. */
  const modalAbierto = useRef(false)

  useGSAP(
    () => {
      const contenedor = pista.current
      if (!contenedor) return

      const mm = gsap.matchMedia()

      // Sin movimiento: nada de marcha ni de inercia. El arrastre queda
      // disponible porque es navegación, no decoración, y las cards se
      // muestran a color pleno.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(gsap.utils.toArray('[data-ventana]', contenedor), { filter: 'none' })
        const d = Draggable.create(contenedor, {
          type: 'x',
          inertia: false,
          cursor: 'grab',
          activeCursor: 'grabbing',
        })
        return () => d[0]?.kill()
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-card]', contenedor)
        if (items.length === 0) return

        // Un ciclo es la mitad de la pista, porque las cards están
        // duplicadas.
        let ciclo = contenedor.scrollWidth / 2
        let envolver = gsap.utils.wrap(-ciclo, 0)

        /** La marcha se anima sobre un objeto propio y no sobre la x del
         *  contenedor: así el tween puede repetirse sin acumular, y la
         *  posición pintada siempre pasa por `envolver`.
         *
         *  Animar la x directo no alcanza: `modifiers` cambia lo que se
         *  pinta, no el valor interno del tween, así que al repetir
         *  arrancaba de un valor sin envolver y la pista se escapaba del
         *  ciclo. */
        const avance = { valor: 0 }

        const arrancar = () => {
          marcha.current?.kill()
          // Se parte de donde quedó la pista, normalizado a un ciclo.
          avance.valor = envolver((gsap.getProperty(contenedor, 'x') as number) || 0)

          marcha.current = gsap.to(avance, {
            valor: `-=${ciclo}`,
            duration: ciclo / VELOCIDAD,
            ease: 'none',
            repeat: -1,
            onUpdate: () => {
              gsap.set(contenedor, { x: envolver(avance.valor) })
            },
          })
        }

        arrancar()

        const frenar = () => {
          if (marcha.current) gsap.to(marcha.current, { timeScale: 0, duration: 0.45 })
        }

        /** Retoma la marcha desde donde quedó, salvo que haya algo que
         *  la deba mantener quieta. */
        const retomarLuegoDePausa = () => {
          if (temporizador.current) window.clearTimeout(temporizador.current)
          temporizador.current = window.setTimeout(() => {
            if (sobreCard.current || modalAbierto.current) return
            arrancar()
            marcha.current?.timeScale(1)
          }, PAUSA_TRAS_SOLTAR)
        }

        // --- Arrastre infinito, sin topes ---
        const d = Draggable.create(contenedor, {
          type: 'x',
          inertia: true,
          cursor: 'grab',
          activeCursor: 'grabbing',
          onPressInit() {
            marcha.current?.pause()
            if (temporizador.current) window.clearTimeout(temporizador.current)
          },
          onDrag() {
            gsap.set(contenedor, { x: envolver(this.x) })
          },
          onThrowUpdate() {
            gsap.set(contenedor, { x: envolver(this.x) })
          },
          // La pausa se cuenta desde que dejó de moverse: si hubo
          // inercia, desde que la inercia terminó.
          onRelease: retomarLuegoDePausa,
          onThrowComplete: retomarLuegoDePausa,
        })

        // --- Hover: ilumina y frena ---
        const limpiar: (() => void)[] = []

        for (const card of items) {
          const ventana = card.querySelector('[data-ventana]')

          const entra = () => {
            sobreCard.current = true
            frenar()
            gsap.to(card, { scale: 1.03, y: -10, duration: 0.45, ease: 'power3.out' })
            if (ventana) gsap.to(ventana, { filter: ENCENDIDO, duration: 0.45, ease: 'power3.out' })
          }
          const sale = () => {
            sobreCard.current = false
            gsap.to(card, { scale: 1, y: 0, duration: 0.5, ease: 'power3.out' })
            if (ventana) gsap.to(ventana, { filter: APAGADO, duration: 0.5, ease: 'power3.out' })
            if (modalAbierto.current) return
            if (marcha.current) gsap.to(marcha.current, { timeScale: 1, duration: 0.8 })
          }

          card.addEventListener('mouseenter', entra)
          card.addEventListener('mouseleave', sale)
          limpiar.push(() => {
            card.removeEventListener('mouseenter', entra)
            card.removeEventListener('mouseleave', sale)
          })
        }

        const alRedimensionar = () => {
          ciclo = contenedor.scrollWidth / 2
          envolver = gsap.utils.wrap(-ciclo, 0)
          arrancar()
        }
        window.addEventListener('resize', alRedimensionar)

        return () => {
          window.removeEventListener('resize', alRedimensionar)
          if (temporizador.current) window.clearTimeout(temporizador.current)
          marcha.current?.kill()
          marcha.current = null
          d[0]?.kill()
          for (const fn of limpiar) fn()
        }
      })
    },
    { scope: raiz },
  )

  /** Al abrir el modal: se detiene Lenis y se captura el estado de la
   *  card antes de que React re-renderice, porque el modal no existe en
   *  el DOM hasta ese momento (PLAN.md §4.6). La marcha se pausa
   *  también: si la card de origen se sigue moviendo, el Flip mide una
   *  posición que ya cambió. */
  const abrirModal = useCallback((indiceReal: number, elemento: HTMLElement | null) => {
    modalAbierto.current = true
    bloquearScroll(true)
    marcha.current?.pause()
    if (temporizador.current) window.clearTimeout(temporizador.current)
    estadoOrigen.current = elemento ? Flip.getState(elemento) : null
    setAbierto(indiceReal)
  }, [setAbierto])

  const cerrarModal = useCallback(() => {
    modalAbierto.current = false
    setAbierto(null)
    // Retoma solo si el puntero no quedó sobre una card.
    if (!sobreCard.current) marcha.current?.resume()
  }, [setAbierto])

  const { ui } = seccionEjemplos
  // El segundo set es lo que hace que el loop no muestre el corte.
  const fila = [...mockups, ...mockups]

  return (
    <>
      <section ref={raiz} id="ejemplos" className="seccion relative scroll-mt-24 overflow-hidden">
        <div className="contenedor">
          <TituloSeccion degrade={seccionEjemplos.tituloDegrade} bajada={seccionEjemplos.bajada}>
            {seccionEjemplos.titulo}
          </TituloSeccion>
        </div>

        {/* El riel recorta a los costados pero necesita aire arriba y
            abajo: la card en hover escala y sube 10px, y sin el padding
            el overflow la corta por el borde superior. */}
        <div className="mt-8 overflow-hidden py-6 lg:mt-10">
          <div ref={pista} className="flex w-max gap-5 lg:gap-6">
            {fila.map((m, i) => {
              const Pantalla = PANTALLAS[m.pantalla]
              const indiceReal = i % mockups.length
              const esDuplicado = i >= mockups.length

              return (
                <article
                  key={`${m.id}-${i}`}
                  data-card
                  ref={(el) => {
                    cards.current[i] = el
                  }}
                  // Los duplicados no se anuncian: son el mismo contenido.
                  aria-hidden={esDuplicado}
                  className="w-[80vw] shrink-0 will-change-[transform,filter] sm:w-[58vw] lg:w-[36rem]"
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <button
                    type="button"
                    onClick={() => abrirModal(indiceReal, cards.current[i] ?? null)}
                    aria-label={`${m.titulo}. ${ui.abrir}`}
                    tabIndex={esDuplicado ? -1 : 0}
                    className="group block w-full text-left"
                  >
                    {/* El filtro va acá y no en el article: sobre el
                        article desaturaría también el título, que lleva
                        el degradé de marca. */}
                    <div
                      data-ventana
                      className="overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated transition-colors duration-500 ease-(--ease-suave) group-hover:border-hairline-hover"
                      style={{ filter: APAGADO }}
                    >
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

                      <div
                        role="img"
                        aria-label={esDuplicado ? undefined : m.alt}
                        className="aspect-16/10 overflow-hidden"
                      >
                        <Pantalla />
                      </div>
                    </div>

                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      {/* Con el degradé de marca, como los títulos de
                          sección: es lo que le da peso al pie de la card. */}
                      <p className="font-display texto-degrade text-h3 font-semibold">
                        {m.titulo}
                      </p>
                      <p className="text-label shrink-0 text-low">{m.rubro}</p>
                    </div>
                  </button>
                </article>
              )
            })}
          </div>
        </div>

        <div className="contenedor mt-8">
          <p className="text-label text-low">{ui.pista}</p>
        </div>
      </section>

      <MockupModal
        indice={abierto}
        onCerrar={cerrarModal}
        onCambiar={setAbierto}
        estadoOrigen={estadoOrigen}
      />
    </>
  )
}
