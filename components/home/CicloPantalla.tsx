'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'

/** Envuelve un mockup y lo arma por partes, en loop.
 *
 *  Es el mismo armado que la ventana del hero —cada `data-parte` entra
 *  con fade y `y`, los `data-item` de adentro caen con stagger, los
 *  `data-trazo` se dibujan— pero acá la pantalla es una sola y el ciclo
 *  la rearma en lugar de avanzar a la siguiente. El hero tiene cuatro
 *  etapas que rotan; una card tiene su mockup y nada más, así que lo
 *  que corresponde es que se vuelva a poblar.
 *
 *  **Corre solo cuando la card está a la vista.** Las tres cards están
 *  bien abajo de la página: un timeline en loop desde la carga gasta
 *  frames sobre algo que nadie ve, y además el visitante se perdería el
 *  armado, que es lo único que el efecto tiene para mostrar. El
 *  ScrollTrigger lo suspende con `onLeave`/`onEnterBack` en lugar de
 *  `once`, porque volver a la sección tiene que volver a mostrarlo.
 *
 *  Los mockups no llevan `'use client'` ni animación propia: son SVG
 *  estáticos con marcadores. Esto es lo único que los mueve, así que un
 *  mockup montado sin este envoltorio se ve completo y quieto, que es
 *  un estado válido.
 */

/** El compás del armado.
 *
 *  `paso` es lo que separa la entrada de una parte de la siguiente, y
 *  `sostener` cuánto queda la pantalla completa antes de desarmarse. El
 *  sostén es largo a propósito: el mockup tiene datos que se leen, y un
 *  loop que lo desarma enseguida lo vuelve una animación en vez de una
 *  captura. */
const RITMO = { paso: 0.34, sostener: 3.2 } as const

export function CicloPantalla({ children }: { children: React.ReactNode }) {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: la pantalla completa y quieta. Es el estado que
      // el SVG ya tiene, así que no hace falta escribir nada.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-parte]', { opacity: 1, y: 0 })
        gsap.set('[data-item]', { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const partes = gsap.utils.toArray<SVGGElement>('[data-parte]', raiz.current)
        if (partes.length === 0) return

        const tl = gsap.timeline({ repeat: -1, paused: true })

        // El estado de partida. Va acá y no dentro del timeline para
        // que la pantalla no se vea completa en el primer frame antes
        // de que el ciclo arranque.
        gsap.set(partes, { opacity: 0, y: 18 })

        partes.forEach((parte, i) => {
          const en = i * RITMO.paso
          const items = parte.querySelectorAll('[data-item]')

          tl.to(parte, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, en)

          // Solo con más de uno: un `stagger` sobre un elemento suelto
          // es un fade común y cuesta un tween al gusto.
          if (items.length > 1) {
            tl.from(
              items,
              { opacity: 0, y: 14, duration: 0.32, stagger: 0.06, ease: 'power2.out' },
              en + 0.1,
            )
          }

          const trazo = parte.querySelector<SVGPathElement>('[data-trazo]')
          if (trazo) {
            const largo = trazo.getTotalLength()
            tl.fromTo(
              trazo,
              { strokeDasharray: largo, strokeDashoffset: largo },
              { strokeDashoffset: 0, duration: 0.75, ease: 'power2.inOut' },
              en + 0.15,
            )
          }
        })

        // Se desarma de arriba hacia abajo, al revés de como se armó:
        // desarmar en el mismo orden se lee como un segundo armado.
        tl.to(
          [...partes].reverse(),
          { opacity: 0, y: -14, duration: 0.28, stagger: 0.07, ease: 'power2.in' },
          `+=${RITMO.sostener}`,
        )

        const st = ScrollTrigger.create({
          trigger: raiz.current,
          start: 'top 92%',
          end: 'bottom 8%',
          onEnter: () => tl.restart(true),
          // Al volver no se reinicia: retomar donde quedó evita que
          // scrollear hacia arriba y abajo dispare el armado de nuevo
          // cada vez, que se vuelve inquieto.
          onEnterBack: () => tl.play(),
          onLeave: () => tl.pause(),
          onLeaveBack: () => tl.pause(),
        })

        return () => {
          st.kill()
          tl.kill()
        }
      })
    },
    { scope: raiz },
  )

  return (
    <div ref={raiz} className="size-full">
      {children}
    </div>
  )
}
