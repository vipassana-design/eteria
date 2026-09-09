'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { flota } from '@/content/plantillas/flota'

/** La barra superior: turno, chip de "en vivo" y acciones.
 *
 *  El chip lleva un punto que late. Es la única animación en loop de la
 *  plantilla y está justificada: en un panel de monitoreo el pulso es
 *  lo que dice que los datos están llegando, y sin él el mapa podría
 *  ser una captura. Va en `gsap.ticker` por vía del tween de GSAP y no
 *  en un `requestAnimationFrame` propio, como manda `CLAUDE.md`.
 *
 *  Con `prefers-reduced-motion` el punto queda encendido y quieto: la
 *  información —"en vivo"— está en el texto, no en el movimiento.
 */
export default function Cabecera() {
  const raiz = useRef<HTMLElement>(null)
  const { cabecera } = flota

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-pulso]', { opacity: 1, scale: 1 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tw = gsap.to('[data-pulso]', {
          opacity: 0.35,
          scale: 0.82,
          duration: 0.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'center',
        })
        return () => tw.kill()
      })
    },
    { scope: raiz },
  )

  return (
    <header
      ref={raiz}
      style={{
        background: 'var(--superficie)',
        borderBottomColor: 'var(--borde)',
      }}
      className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b px-3 py-2.5 lg:h-[57px] lg:flex-nowrap lg:px-4 lg:py-0"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="truncate text-[14px] font-semibold leading-tight lg:text-[15px]">
            {cabecera.titulo}
          </h1>

          {/* El chip de en vivo. */}
          <span
            style={{
              background: 'rgba(34, 211, 165, 0.14)',
              color: 'var(--ruta)',
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-2 py-[3px] text-[10px] font-semibold"
          >
            <span
              data-pulso
              style={{
                background: 'var(--ruta)',
                filter: 'drop-shadow(0 0 5px rgba(34,211,165,0.9))',
              }}
              className="size-1.5 rounded-full"
            />
            {cabecera.envivo}
          </span>
        </div>

        <p
          style={{ color: 'var(--texto-tenue)' }}
          className="mt-0.5 truncate text-[11px] tabular-nums"
        >
          {cabecera.turno} · {cabecera.actualizado}
        </p>
      </div>

      {/* Las acciones. En mobile quedan las dos, pero achicadas: en un
          panel de monitoreo "centrar mapa" es la acción más usada y
          esconderla sería raro. */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {cabecera.acciones.map((a, i) => (
          <button
            key={a.t}
            type="button"
            style={
              i === 0
                ? {
                    background: 'var(--acento)',
                    color: '#FFFFFF',
                    borderColor: 'transparent',
                  }
                : {
                    background: 'transparent',
                    color: 'var(--texto-medio)',
                    borderColor: 'var(--borde)',
                  }
            }
            className="cursor-pointer whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[11.5px] font-medium transition-all duration-200 hover:brightness-110"
          >
            {a.t}
          </button>
        ))}
      </div>
    </header>
  )
}
