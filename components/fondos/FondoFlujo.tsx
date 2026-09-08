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

/** Cuánto borra el velo por frame. Más alto, estela más corta.
 *
 *  A 0.075 el rastro tardaba unos 40 frames en desaparecer y quedaban
 *  franjas colgadas ensuciando la pantalla. A 0.3 se apaga en ~8. */
const DESVANECIDO = 0.3

/** Velo por defecto: el color base del sitio con el alfa del
 *  desvanecido.
 *
 *  Apilado sobre otro fondo hay que pasar uno más transparente: el
 *  color base opaco taparía lo que está debajo. */
const VELO_BASE = `rgba(12,10,24,${DESVANECIDO})`

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

interface PropsFlujo {
  /** Cómo se borra la estela.
   *
   *  'pintar' cubre el canvas con `colorVelo` cada frame: sirve cuando
   *  el canvas es la capa de fondo, porque además repone el color base.
   *
   *  'borrar' usa `destination-out`, que baja el alfa de lo ya pintado
   *  en vez de pintar encima. Es lo que hay que usar cuando el canvas
   *  está apilado sobre otra capa: pintando, el velo se acumula sobre
   *  todo el canvas y termina tapando lo que está debajo.
   */
  modoBorrado?: 'pintar' | 'borrar'
  /** Color del velo que borra la estela. Apilado sobre otro fondo hay
   *  que pasar uno más transparente que el opaco por defecto. */
  colorVelo?: string
  /** El desvanecido de bordes es opaco: se apaga cuando hay otro fondo
   *  debajo que ya aporta el suyo. */
  conDesvanecido?: boolean
}

export default function FondoFlujo({
  colorVelo = VELO_BASE,
  conDesvanecido = true,
  modoBorrado = 'pintar',
}: PropsFlujo = {}) {
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

          // Asignar width/height resetea el estado del contexto, así que
          // estas dos van acá y no una sola vez al montar: en un resize
          // se perderían.
          ctx.globalCompositeOperation = 'source-over'
          ctx.lineCap = 'round'
        }

        const nuevoTrazo = (desdeIzquierda = false): Trazo => ({
          x: desdeIzquierda ? -gsap.utils.random(0, 200) : gsap.utils.random(0, ancho),
          y: gsap.utils.random(0, alto),
          vel: gsap.utils.random(70, 190) * factorVel,
          largo: gsap.utils.random(30, 74),
          grosor: gsap.utils.random(0.7, 1.7),
          color: COLORES[Math.floor(Math.random() * COLORES.length)]!,
          deriva: gsap.utils.random(-14, 14),
        })

        redimensionar()
        trazos = Array.from({ length: cantidad }, () => nuevoTrazo())

        const dibujar = (_t: number, delta: number) => {
          const dt = Math.min(delta, 50) / 1000

          // El velo es lo que hace la estela: cada frame apaga un poco
          // lo ya pintado, y lo que queda es el rastro reciente.
          //
          // Los trazos van con `source-over`. Antes usaban `lighter`,
          // que suma luz sobre lo anterior: el rastro se volvía más
          // brillante donde el trazo pasaba despacio y el velo ya no
          // alcanzaba a borrarlo. De ahí las franjas colgadas.
          if (modoBorrado === 'borrar') {
            // Baja el alfa de lo pintado sin agregar color: el canvas
            // queda transparente donde no hay trazo, así lo de abajo se
            // ve intacto.
            ctx.globalCompositeOperation = 'destination-out'
            ctx.fillStyle = `rgba(0,0,0,${DESVANECIDO})`
            ctx.fillRect(0, 0, ancho, alto)
            ctx.globalCompositeOperation = 'source-over'
          } else {
            ctx.fillStyle = colorVelo
            ctx.fillRect(0, 0, ancho, alto)
          }

          for (let i = 0; i < trazos.length; i++) {
            const t = trazos[i]!
            t.x += t.vel * dt
            t.y += t.deriva * dt

            // El degradé a lo largo del trazo es lo que le da la punta
            // brillante y la cola apagada.
            const grad = ctx.createLinearGradient(t.x - t.largo, t.y, t.x, t.y)
            // La cola llega a cero y la punta es lo único brillante:
            // así el trazo se lee como un destello que avanza y no como
            // una franja.
            grad.addColorStop(0, `${t.color}0)`)
            grad.addColorStop(0.6, `${t.color}0.05)`)
            grad.addColorStop(1, `${t.color}0.38)`)

            ctx.strokeStyle = grad
            ctx.lineWidth = t.grosor
            ctx.beginPath()
            ctx.moveTo(t.x - t.largo, t.y)
            ctx.lineTo(t.x, t.y)
            ctx.stroke()

            // Al salir por la derecha vuelve a entrar por la izquierda,
            // con parámetros nuevos: el patrón no se repite.
            if (t.x - t.largo > ancho) trazos[i] = nuevoTrazo(true)
          }
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
          seco contra el límite del hero. Apilado sobre otro fondo se
          apaga: es opaco y taparía lo que está debajo. */}
      {conDesvanecido ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 95% 88% at 50% 45%, transparent 28%, #0C0A18 100%)',
          }}
        />
      ) : null}
    </div>
  )
}
