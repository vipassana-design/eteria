'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { BP_DESKTOP } from '@/lib/motion'

/** Campo de partículas (PLAN.md §2.5).
 *
 *  ~60 puntos violeta a 8–14% de opacidad con deriva lenta.
 *  Se apaga en mobile y con reduced-motion (§7): en esos casos no
 *  se monta el canvas ni el loop, no es solo un display:none.
 */

const CANTIDAD = 60
const OPACIDAD_MIN = 0.16
const OPACIDAD_MAX = 0.42
/** Velocidad de deriva en px por segundo. */
const VELOCIDAD = 7

interface Punto {
  x: number
  y: number
  vx: number
  vy: number
  radio: number
  opacidad: number
  /** Índice de tono. Da variedad para que no se lean todos iguales. */
  tono: number
}

/** Del violeta de marca al blanco. La mezcla evita que el campo se lea
 *  como una sola trama plana. */
/** Del violeta de marca al blanco. La mezcla evita que el campo se
 *  lea como una sola trama plana.
 *
 *  Los dos violetas salen de los tokens: así el campo acompaña la
 *  paleta en vez de quedar fijo. Los blancos son literales porque el
 *  blanco no es un token de acento. */
const TONOS_FIJOS = ['244, 242, 255', '255, 255, 255'] as const

/** Lee un token de color y lo devuelve como `r, g, b` para canvas. */
function tonoDeToken(token: string, respaldo: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  const hex = v.match(/^#([0-9a-f]{6})$/i)
  if (hex?.[1]) {
    const n = parseInt(hex[1], 16)
    return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
  }
  const rgb = v.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i)
  if (rgb) return `${rgb[1]}, ${rgb[2]}, ${rgb[3]}`
  return respaldo
}

export default function Particulas() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      `(min-width: ${BP_DESKTOP}px) and (prefers-reduced-motion: no-preference)`,
      () => {
        const cv = canvas.current
        const ctx = cv?.getContext('2d')
        if (!cv || !ctx) return

        let puntos: Punto[] = []
        let ancho = 0
        let alto = 0

        const redimensionar = () => {
          // Se limita el DPR a 2: por encima el costo de píxeles no
          // aporta nada visible en puntos de 1px difuminados.
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          ancho = cv.clientWidth
          alto = cv.clientHeight
          cv.width = Math.round(ancho * dpr)
          cv.height = Math.round(alto * dpr)
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const sembrar = () => {
          puntos = Array.from({ length: CANTIDAD }, () => {
            const angulo = Math.random() * Math.PI * 2
            return {
              x: Math.random() * ancho,
              y: Math.random() * alto,
              vx: Math.cos(angulo) * VELOCIDAD,
              vy: Math.sin(angulo) * VELOCIDAD,
              radio: 0.8 + Math.random() * 1.4,
              opacidad: OPACIDAD_MIN + Math.random() * (OPACIDAD_MAX - OPACIDAD_MIN),
              tono: Math.floor(Math.random() * 4),
            }
          })
        }

        redimensionar()
        sembrar()

        const dibujar = (_t: number, delta: number) => {
          const dt = Math.min(delta, 50) / 1000
          ctx.clearRect(0, 0, ancho, alto)

          // Tonos y brillo vigentes: el laboratorio los cambia en vivo.
          const tonos = [
            tonoDeToken('--color-acento-2-claro', '215, 200, 250'),
            ...TONOS_FIJOS,
            tonoDeToken('--color-acento-2', '139, 92, 246'),
          ]
          const brillo =
            Number(
              getComputedStyle(document.documentElement).getPropertyValue('--lab-particulas'),
            ) || 1

          for (const p of puntos) {
            p.x += p.vx * dt
            p.y += p.vy * dt

            // Envoltura por los cuatro lados: el campo no tiene bordes.
            if (p.x < -4) p.x = ancho + 4
            else if (p.x > ancho + 4) p.x = -4
            if (p.y < -4) p.y = alto + 4
            else if (p.y > alto + 4) p.y = -4

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${tonos[p.tono % tonos.length]}, ${p.opacidad * brillo})`
            ctx.fill()
          }
        }

        // El loop va en el ticker de GSAP: un solo rAF en toda la
        // página, compartido con Lenis y ScrollTrigger.
        gsap.ticker.add(dibujar)

        const observador = new ResizeObserver(() => {
          redimensionar()
          sembrar()
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
    <canvas
      ref={canvas}
      aria-hidden="true"
      // El marcador lo usa `globals.css` para esconder las capas de
      // fondo dentro de los iframes de plantilla (§16).
      data-capa-fondo
      className="pointer-events-none fixed inset-0 z-[1] size-full"
    />
  )
}
