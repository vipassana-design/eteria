'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Una cifra que sube al entrar en viewport, para las plantillas.
 *
 *  Mismo criterio que `components/ui/NumeroQueSube.tsx` del sitio:
 *  anima una propiedad de un objeto y escribe el resultado en el DOM,
 *  en vez de dejar que GSAP interpole el `textContent`. Así el valor
 *  siempre es un entero y no aparecen decimales a medio camino.
 *
 *  Dos cosas que aporta sobre el del sitio:
 *
 *  - **`separador`**: formatea con el punto de miles argentino. Un
 *    dashboard con `1284500` en lugar de `1.284.500` se lee como dato
 *    de prueba.
 *  - **`tabular-nums`** en el estilo: sin eso el ancho del número baila
 *    mientras cuenta y el layout salta. Es el detalle que hace que una
 *    cifra se lea como software y no como infografía.
 *
 *  Arranca en `top 90%`, o sea en cuanto el número entra en pantalla:
 *  con un umbral más alto se queda en cero a la vista si el visitante
 *  deja de scrollear, que es el bug que ya apareció en el sitio.
 */
interface Props {
  /** El valor al que llega. */
  hasta: number
  prefijo?: string
  sufijo?: string
  /** Punto de miles. Los dashboards y las cifras grandes lo necesitan. */
  separador?: boolean
  /** Segundos que dura el conteo. */
  duracion?: number
  className?: string
}

export default function Cifra({
  hasta,
  prefijo = '',
  sufijo = '',
  separador = false,
  duracion = 1.8,
  className = '',
}: Props) {
  const raiz = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = raiz.current
      if (!el) return

      const formatear = (n: number) => {
        const entero = Math.round(n)
        const cuerpo = separador ? entero.toLocaleString('es-AR') : String(entero)
        return `${prefijo}${cuerpo}${sufijo}`
      }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        el.textContent = formatear(hasta)
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        el.textContent = formatear(0)
        const contador = { valor: 0 }

        const tw = gsap.to(contador, {
          valor: hasta,
          duration: duracion,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = formatear(contador.valor)
          },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })

        return () => {
          tw.scrollTrigger?.kill()
          tw.kill()
        }
      })
    },
    { scope: raiz, dependencies: [hasta, prefijo, sufijo, separador, duracion] },
  )

  return (
    <span
      ref={raiz}
      // Sin esto el ancho del número cambia en cada frame y el bloque
      // de al lado se mueve mientras cuenta.
      style={{ fontVariantNumeric: 'tabular-nums' }}
      className={className}
    >
      {/* El valor final va en el HTML para que exista sin JS y para que
          el layout no salte cuando el número aparece. */}
      {prefijo}
      {separador ? hasta.toLocaleString('es-AR') : hasta}
      {sufijo}
    </span>
  )
}
