'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Un número que sube desde cero al entrar en viewport.
 *
 *  Anima una propiedad de un objeto y escribe el resultado en el DOM,
 *  en vez de dejar que GSAP interpole el `textContent`: así el valor
 *  siempre es un entero y no aparecen decimales a medio camino.
 *
 *  El ease es `power2.out`: arranca rápido y desacelera al final, que
 *  es lo que hace que se lea como un conteo y no como un contador
 *  digital. Con `none` el número sube a velocidad constante y se siente
 *  mecánico.
 *
 *  Corre una sola vez —`once: true`— porque un número que se reinicia
 *  cada vez que pasás por la sección se vuelve un adorno.
 *
 *  Con `prefers-reduced-motion` el valor final se escribe directo.
 */
interface Props {
  /** El valor al que llega. */
  hasta: number
  /** Lo que va antes del número, por ejemplo el `+`. */
  prefijo?: string
  /** Lo que va después, por ejemplo `%`. */
  sufijo?: string
  /** Segundos que dura el conteo. */
  duracion?: number
  className?: string
}

export default function NumeroQueSube({
  hasta,
  prefijo = '',
  sufijo = '',
  duracion = 2,
  className = '',
}: Props) {
  const raiz = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = raiz.current
      if (!el) return

      const escribir = (n: number) => {
        el.textContent = `${prefijo}${Math.round(n)}${sufijo}`
      }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        escribir(hasta)
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        escribir(0)

        // El contador vive en un objeto aparte: GSAP interpola el
        // número y el callback lo redondea antes de escribirlo.
        const contador = { valor: 0 }

        const tw = gsap.to(contador, {
          valor: hasta,
          duration: duracion,
          ease: 'power2.out',
          onUpdate: () => escribir(contador.valor),
          scrollTrigger: {
            trigger: el,
            // Arranca cuando el número está bien dentro del viewport,
            // no al asomar: si empieza en el borde, el conteo termina
            // antes de que se lo pueda leer.
            start: 'top 78%',
            once: true,
          },
        })

        return () => {
          tw.scrollTrigger?.kill()
          tw.kill()
        }
      })
    },
    { scope: raiz, dependencies: [hasta, prefijo, sufijo, duracion] },
  )

  return (
    <span ref={raiz} className={className}>
      {/* El valor inicial va en el HTML para que exista sin JS y para
          que el layout no salte cuando el número aparece. */}
      {prefijo}
      {hasta}
      {sufijo}
    </span>
  )
}

