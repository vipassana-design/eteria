'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Fondo 4 — Flujo.
 *
 *  Trazos finos que recorren el hero dejando una estela corta que se
 *  desvanece. Sugiere datos moviéndose.
 *
 *  Este va en canvas y no en CSS: la estela se consigue **no** limpiando
 *  el frame, sino pintando un velo semitransparente encima. Cada trazo
 *  deja su rastro y el velo lo borra de a poco. Con divs habría que
 *  mantener un elemento por segmento de estela.
 *
 *  El loop corre en el ticker de GSAP, que es el único rAF de la página.
 *
 *  En mobile: la mitad de trazos y más lentos.
 */

const TRAZOS = 18
const TRAZOS_MOBILE = 8

/** Cuánto borra el velo por frame. Más alto, estela más corta. */
const DESVANECIDO = 0.075

interface Trazo {
  x: number
  y: number
  /** Velocidad en px por segundo. */
  vel: number
  largo: number
  grosor: number
  color: string
  /** Desfase vertical de la trayectoria, en px por segundo. */
  deriva: number
}

const COLORES = [
  'rgba(196,181,253,',
  'rgba(139,92,246,',
  'rgba(96,165,250,',
  'rgba(244,242,255,',
]

export default function FondoFlujo() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Sin movimiento no se monta el loop: queda el canvas vacío y el
    // desvanecido de los bordes, que ya da textura.
    mm.add(
      {
        desktop: '(min-width: 1024px)',
        movimientoOk: '(prefers-reduced-motion: no-preference)',
      },
      (contexto) => {
        const { desktop, movimientoOk } = contexto.conditions as Record<string, boolean>
        if (!movimientoOk) return

        const cv = canvas.current
        const ctx = cv?.getContext('2d')
        if (!cv || !ctx) return

        const cantidad = desktop ? TRAZOS : TRAZOS_MOBILE
        const factorVel = desktop ? 1 : 0.6

        let ancho = 0
        let alto = 0
        let trazos: Trazo[] = []

        const redimensionar = () => {
          // DPR limitado a 2: por encima el costo no aporta nada visible
          // en líneas de 1px.
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          ancho = cv.clientWidth
          alto = cv.clientHeight
          cv.width = Math.round(ancho * dpr)
          cv.height = Math.round(alto * dpr)
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const nuevoTrazo = (desdeIzquierda = false): Trazo => ({
          x: desdeIzquierda ? -gsap.utils.random(0, 200) : gsap.utils.random(0, ancho),
          y: gsap.utils.random(0, alto),
          vel: gsap.utils.random(70, 190) * factorVel,
          largo: gsap.utils.random(40, 130),
          grosor: gsap.utils.random(0.6, 1.5),
          color: COLORES[Math.floor(Math.random() * COLORES.length)]!,
          deriva: gsap.utils.random(-14, 14),
        })

        redimensionar()
        trazos = Array.from({ length: cantidad }, () => nuevoTrazo())

        const dibujar = (_t: number, delta: number) => {
          const dt = Math.min(delta, 50) / 1000

          // El velo es lo que hace la estela: en vez de limpiar, se
          // oscurece lo ya pintado. `source-over` con alfa bajo.
          ctx.globalCompositeOperation = 'source-over'
          ctx.fillStyle = `rgba(12,10,24,${DESVANECIDO})`
          ctx.fillRect(0, 0, ancho, alto)

          // Los trazos se suman a lo que quedó: así el cruce de dos
          // estelas aclara en vez de taparse.
          ctx.globalCompositeOperation = 'lighter'

          for (let i = 0; i < trazos.length; i++) {
            const t = trazos[i]!
            t.x += t.vel * dt
            t.y += t.deriva * dt

            // El degradé a lo largo del trazo es lo que le da la punta
            // brillante y la cola apagada.
            const grad = ctx.createLinearGradient(t.x - t.largo, t.y, t.x, t.y)
            grad.addColorStop(0, `${t.color}0)`)
            grad.addColorStop(0.75, `${t.color}0.16)`)
            grad.addColorStop(1, `${t.color}0.5)`)

            ctx.strokeStyle = grad
            ctx.lineWidth = t.grosor
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(t.x - t.largo, t.y)
            ctx.lineTo(t.x, t.y)
            ctx.stroke()

            // Al salir por la derecha vuelve a entrar por la izquierda,
            // con parámetros nuevos: el patrón no se repite.
            if (t.x - t.largo > ancho) trazos[i] = nuevoTrazo(true)
          }

          ctx.globalCompositeOperation = 'source-over'
        }

        gsap.ticker.add(dibujar)

        const observador = new ResizeObserver(() => {
          redimensionar()
          trazos = Array.from({ length: cantidad }, () => nuevoTrazo())
        })
        observador.observe(cv)

        return () => {
          gsap.ticker.remove(dibujar)
          observador.disconnect()
        }
      },
    )
  })

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <canvas ref={canvas} className="absolute inset-0 size-full" />

      {/* Desvanecido hacia los bordes, para que los trazos no corten en
          seco contra el límite del hero. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 95% 88% at 50% 45%, transparent 28%, #0C0A18 100%)',
        }}
      />
    </div>
  )
}
