'use client'

import { useEffect, useRef } from 'react'
import { Flip, gsap, useGSAP } from '@/lib/gsap'
import { bloquearScroll } from '@/lib/lenis'
import { prefiereMenosMovimiento } from '@/lib/motion'
import { mockups, seccionSoluciones } from '@/content/mockups'
import { PANTALLAS } from './PantallasMockup'

interface Props {
  /** Índice del mockup abierto, o null si el modal está cerrado. */
  indice: number | null
  onCerrar: () => void
  onCambiar: (indice: number) => void
  /** Estado de la card de origen, capturado por el carrusel en el click.
   *  Tiene que venir de afuera: el modal no está en el DOM mientras
   *  está cerrado, así que no puede medir la posición de partida. */
  estadoOrigen: React.RefObject<Flip.FlipState | null>
}

/** Modal de previsualización (PLAN.md §4.6).
 *
 *  La card se expande al centro con Flip desde su posición real. Flechas
 *  laterales para pasar al siguiente sin cerrar, cierre con Esc, click
 *  fuera o botón, focus trap y aria-modal.
 */
export default function MockupModal({ indice, onCerrar, onCambiar, estadoOrigen }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const marco = useRef<HTMLDivElement>(null)
  const fondo = useRef<HTMLDivElement>(null)
  /** Guarda el índice anterior para saber si es apertura o cambio. */
  const previo = useRef<number | null>(null)

  const abierto = indice !== null
  const mockup = indice !== null ? mockups[indice] : null

  useGSAP(
    () => {
      const contenedor = raiz.current
      const caja = marco.current
      if (!contenedor || !caja) return

      // --- Apertura ---
      if (abierto && previo.current === null) {
        const estado = estadoOrigen.current

        gsap.set(contenedor, { pointerEvents: 'auto' })
        gsap.to(fondo.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })

        if (!estado || prefiereMenosMovimiento()) {
          // Sin estado de origen (o con reduced-motion) no hay nada que
          // "expandir": entra con un fade corto.
          gsap.fromTo(
            caja,
            { opacity: 0, scale: prefiereMenosMovimiento() ? 1 : 0.96 },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' },
          )
          return
        }

        // El estado de la card viene capturado desde el click en el
        // carrusel, con Lenis ya detenido (medir acá no serviría: el
        // modal recién monta en este commit).
        //
        // Flip.fit posa el marco sobre la card; se guarda ESA posición
        // como punto de partida, se devuelve el marco a su lugar real, y
        // Flip.from anima del uno al otro.
        Flip.fit(caja, estado, { scale: true })
        const partida = Flip.getState(caja)
        gsap.set(caja, { clearProps: 'transform,width,height' })

        Flip.from(partida, {
          targets: caja,
          duration: 0.55,
          ease: 'power3.inOut',
          scale: true,
          onComplete: () => gsap.set(caja, { clearProps: 'transform' }),
        })
        return
      }

      // --- Cambio de mockup sin cerrar ---
      if (abierto && previo.current !== null && previo.current !== indice) {
        gsap.fromTo(
          caja.querySelector('[data-pantalla]'),
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' },
        )
      }
    },
    { scope: raiz, dependencies: [indice, abierto] },
  )

  // Bloqueo de scroll, foco y teclado. Va en useEffect y no en useGSAP
  // porque no es animación, y porque tiene que correr ANTES de que Flip
  // mida: detener Lenis acá es lo que evita el salto.
  useEffect(() => {
    if (!abierto) {
      previo.current = null
      return
    }

    bloquearScroll(true)

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCerrar()
        return
      }
      if (e.key === 'ArrowRight') {
        onCambiar((indice + 1) % mockups.length)
        return
      }
      if (e.key === 'ArrowLeft') {
        onCambiar((indice - 1 + mockups.length) % mockups.length)
        return
      }
      if (e.key !== 'Tab') return

      const el = raiz.current
      if (!el) return
      const focoables = el.querySelectorAll<HTMLElement>('button:not([disabled]), [href]')
      if (focoables.length === 0) return
      const primero = focoables[0]!
      const ultimo = focoables[focoables.length - 1]!

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    document.addEventListener('keydown', alTeclado)
    raiz.current?.querySelector<HTMLElement>('button')?.focus()

    return () => {
      document.removeEventListener('keydown', alTeclado)
      bloquearScroll(false)
    }
  }, [abierto, indice, onCerrar, onCambiar])

  // Registrar el índice ya procesado, después de que corrió useGSAP.
  useEffect(() => {
    previo.current = indice
  })

  if (!mockup || indice === null) {
    return null
  }

  const Pantalla = PANTALLAS[mockup.pantalla]
  const { ui } = seccionSoluciones

  return (
    <div
      ref={raiz}
      role="dialog"
      aria-modal="true"
      aria-label={mockup.titulo}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 lg:p-10"
    >
      {/* Fondo con blur. El click cierra. */}
      <div
        ref={fondo}
        onClick={onCerrar}
        className="absolute inset-0 bg-base/80 opacity-0 backdrop-blur-md"
      />

      {/* Flecha anterior */}
      <button
        type="button"
        onClick={() => onCambiar((indice - 1 + mockups.length) % mockups.length)}
        aria-label={ui.anterior}
        className="absolute left-2 z-10 flex size-11 items-center justify-center rounded-(--radius-pill) border border-hairline bg-elevated/80 text-hi backdrop-blur transition-colors duration-300 hover:border-hairline-hover lg:left-6"
      >
        <Flecha direccion="izquierda" />
      </button>

      {/* Marco de navegador */}
      <div
        ref={marco}
        className="relative z-[1] flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-[#4A4370]" />
            <span className="size-2 rounded-full bg-[#4A4370]" />
            <span className="size-2 rounded-full bg-[#4A4370]" />
          </span>
          <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
            {mockup.url}
          </span>
          <button
            type="button"
            onClick={onCerrar}
            aria-label={ui.cerrar}
            className="flex size-7 items-center justify-center rounded-md text-low transition-colors duration-300 hover:bg-white/5 hover:text-hi"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* La pantalla, con scroll propio si no entra. */}
        <div data-pantalla className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <Pantalla />
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
          <div>
            <p className="text-cuerpo text-hi">{mockup.titulo}</p>
            <p className="text-label text-low">{mockup.rubro}</p>
          </div>
          <p className="text-label text-low">{ui.contador(indice + 1, mockups.length)}</p>
        </div>
      </div>

      {/* Flecha siguiente */}
      <button
        type="button"
        onClick={() => onCambiar((indice + 1) % mockups.length)}
        aria-label={ui.siguiente}
        className="absolute right-2 z-10 flex size-11 items-center justify-center rounded-(--radius-pill) border border-hairline bg-elevated/80 text-hi backdrop-blur transition-colors duration-300 hover:border-hairline-hover lg:right-6"
      >
        <Flecha direccion="derecha" />
      </button>
    </div>
  )
}

function Flecha({ direccion }: { direccion: 'izquierda' | 'derecha' }) {
  return (
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
  )
}
