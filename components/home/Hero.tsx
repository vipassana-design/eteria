'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { scrollearA } from '@/lib/lenis'
import { dur, ease } from '@/lib/motion'
import { hero } from '@/content/hero'
import Boton from '@/components/ui/Boton'
import Glow from '@/components/bg/Glow'
import VentanaMockup from './VentanaMockup'

/** Hero (PLAN.md §4.2).
 *
 *  Dos tercios de texto a la izquierda, tres ventanas de navegador a la
 *  derecha en perspectiva isométrica suave, escalonadas en profundidad.
 *
 *  Es el único momento orquestado del sitio (~1.4s): título con máscara
 *  por líneas, después párrafo y botones, después los mockups en
 *  cascada. El resto de las secciones usa reveals contenidos.
 */
export default function Hero() {
  const raiz = useRef<HTMLElement>(null)
  const titulo = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Con reduced-motion no hay secuencia: todo aparece con un fade
      // corto y en su posición final (§2.4).
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('[data-anim]', { opacity: 0, duration: dur.fast, stagger: 0.04, ease: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = titulo.current
        if (!el) return

        // SplitText por líneas, cada una en su propia máscara.
        const split = new SplitText(el, {
          type: 'lines',
          linesClass: 'linea-titulo',
          // La máscara la crea SplitText: sin esto habría que envolver
          // cada línea a mano.
          mask: 'lines',
        })

        const tl = gsap.timeline()

        // 1) Título: máscara desde abajo, stagger 0.08
        tl.from(split.lines, {
          yPercent: 100,
          duration: 0.9,
          stagger: 0.08,
          ease: ease.snap,
        })

          // 2) Párrafo, botones y prueba social: fade + 20px, delay 0.5
          .from(
            '[data-texto]',
            { opacity: 0, y: 20, duration: dur.base, stagger: 0.1, ease: ease.out },
            0.5,
          )

          // 3) Mockups en cascada desde la derecha, escala 0.94 → 1
          .from(
            '[data-mockup]',
            {
              opacity: 0,
              x: 80,
              scale: 0.94,
              duration: 1,
              stagger: 0.12,
              ease: ease.out,
            },
            0.35,
          )

        return () => {
          tl.kill()
          split.revert()
        }
      })

      // Seguimiento del mouse, solo desktop: desplazamiento amortiguado,
      // máximo 12px (§4.2).
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const grupo = raiz.current?.querySelector('[data-mockups]')
        if (!grupo) return

        const mockups = gsap.utils.toArray<HTMLElement>('[data-mockup]', raiz.current)
        // quickTo amortigua el seguimiento sin crear un tween por evento.
        const seguidores = mockups.map((m, i) => ({
          x: gsap.quickTo(m, 'x', { duration: 0.7, ease: 'power3.out' }),
          y: gsap.quickTo(m, 'y', { duration: 0.7, ease: 'power3.out' }),
          // Las de adelante se mueven más: refuerza la profundidad.
          factor: 0.5 + i * 0.25,
        }))

        const alMover = (e: MouseEvent) => {
          const cx = window.innerWidth / 2
          const cy = window.innerHeight / 2
          const dx = gsap.utils.clamp(-12, 12, ((e.clientX - cx) / cx) * 12)
          const dy = gsap.utils.clamp(-12, 12, ((e.clientY - cy) / cy) * 12)

          for (const s of seguidores) {
            s.x(dx * s.factor)
            s.y(dy * s.factor)
          }
        }

        window.addEventListener('mousemove', alMover)
        return () => window.removeEventListener('mousemove', alMover)
      })
    },
    { scope: raiz },
  )

  const alClickAncla = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const ancla = href.slice(href.indexOf('#'))
    if (scrollearA(ancla)) e.preventDefault()
  }

  return (
    <section
      ref={raiz}
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-36"
    >
      <Glow className="-right-40 -top-24" tamano={860} />
      <Glow className="-left-56 top-1/3" tamano={620} intensidad={0.6} />

      {/* Dos tercios de texto a la izquierda (§4.2). Con la columna más
          angosta el H1 caía en 4 líneas cortas: "Desarrollamos" mide
          560px a 76px de cuerpo y necesita ~634px para repartirse en 3.
          Los mockups se desbordan hacia la derecha, que es lo que les da
          la sensación de profundidad. */}
      <div className="contenedor grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
        {/* Texto */}
        <div className="relative z-10">
          {/* Los cortes de línea vienen del contenido, no del ancho: así
              el título no se rearma de forma pobre en anchos intermedios.
              text-wrap:nowrap por línea evita que el balance del CSS los
              vuelva a repartir. SplitText igual reconoce cada una. */}
          <h1 ref={titulo} data-anim className="text-hero font-semibold [text-wrap:nowrap]">
            {hero.titulo.antes.map((linea) => (
              <span key={linea} className="block">
                {linea}
              </span>
            ))}
            {hero.titulo.degrade.map((linea) => (
              <span key={linea} className="texto-degrade block">
                {linea}
              </span>
            ))}
          </h1>

          <p data-anim data-texto className="text-cuerpo-lg medida mt-7 text-mid">
            {hero.bajada}
          </p>

          <div data-anim data-texto className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Boton
              href={hero.ctaPrimario.href}
              onClick={(e) => alClickAncla(e, hero.ctaPrimario.href)}
            >
              {hero.ctaPrimario.etiqueta}
            </Boton>
            <Boton
              href={hero.ctaSecundario.href}
              variante="secundario"
              onClick={(e) => alClickAncla(e, hero.ctaSecundario.href)}
            >
              {hero.ctaSecundario.etiqueta}
            </Boton>
          </div>

          <p data-anim data-texto className="text-label mt-10 text-low">
            {hero.prueba}
          </p>
        </div>

        {/* Mockups en perspectiva. En mobile queda uno solo, con
            perspectiva más plana y sin seguimiento (§7). */}
        <div
          data-mockups
          className="relative hidden lg:block"
          style={{ perspective: '1600px', perspectiveOrigin: '60% 50%' }}
        >
          {/* Se ensancha más allá de su columna: el corte contra el borde
              derecho es parte del efecto, y la capa #capa-sitio del
              layout lo recorta sin generar scroll horizontal. */}
          <div className="relative aspect-4/3 w-[132%]">
            {hero.mockups.map((m, i) => (
              <div
                key={m.id}
                data-anim
                data-mockup
                className="absolute w-[72%]"
                style={{
                  // Escalonadas en diagonal hacia abajo y a la derecha:
                  // cada una deja ver la franja superior de la anterior,
                  // que es donde está la URL y el encabezado. Con un
                  // offset menor quedaban tapadas entre sí.
                  top: `${i * 19}%`,
                  left: `${i * 14}%`,
                  zIndex: i,
                  transform: `rotateY(-14deg) rotateX(6deg) scale(${1 - (2 - i) * 0.03})`,
                  transformStyle: 'preserve-3d',
                  // Las de atrás se apagan un poco: las asienta en
                  // profundidad en vez de que compitan con la de
                  // adelante, que es la que tiene que leerse.
                  filter: i < 2 ? `brightness(${0.62 + i * 0.16}) saturate(0.85)` : undefined,
                }}
              >
                <VentanaMockup mockup={m} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: un solo mockup, perspectiva plana. */}
        <div data-anim className="lg:hidden" style={{ perspective: '1200px' }}>
          <div style={{ transform: 'rotateY(-6deg) rotateX(3deg)' }}>
            <VentanaMockup mockup={hero.mockups[hero.mockups.length - 1]!} />
          </div>
        </div>
      </div>
    </section>
  )
}
