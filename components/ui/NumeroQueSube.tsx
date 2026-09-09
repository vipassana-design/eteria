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
 *  Dura 3 segundos y arranca en cuanto el número entra en pantalla, no
 *  cuando llega a media altura: un número visible que espera más scroll
 *  para empezar a subir se lee como que no funciona.
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
  duracion = 3,
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
            // Arranca cuando el número se vuelve visible.
            //
            // Antes era `top 78%`, que pide que suba hasta el 78% del
            // alto del viewport: si el módulo aparecía abajo y el
            // visitante dejaba de scrollear, el trigger no se cumplía
            // nunca y el número se quedaba en cero a la vista. Que algo
            // visible esté esperando más scroll para animarse se lee
            // como que no funciona.
            //
            // El 85% no es arbitrario: es el mismo umbral que usa el
            // `Reveal` que envuelve la franja de datos. Con un valor
            // más permisivo el conteo arrancaría mientras el bloque
            // todavía está en `opacity: 0` y el número aparecería ya
            // terminado. Si ese `start` cambia, este tiene que seguirlo.
            start: 'top 85%',
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

