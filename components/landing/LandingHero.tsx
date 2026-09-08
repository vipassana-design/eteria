'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollearA } from '@/lib/lenis'
import { dur, ease } from '@/lib/motion'
import {
  landingUi,
  pantallaLanding,
  sesionesLanding,
  urlsLanding,
} from '@/content/landings'
import type { Landing } from '@/types'
import Boton from '@/components/ui/Boton'
import FondoHero from '@/components/bg/FondoHero'
import RollingText from '@/components/ui/RollingText'
import { POR_PARTES } from '@/components/home/PantallasPorPartes'
import SesionTerminal from '@/components/home/SesionTerminal'

/** Hero de las landings (PLAN.md §5, §14).
 *
 *  Split: titular con rolling text a la izquierda, y a la derecha una
 *  ventana con un ciclo de dos etapas que se repite: la terminal
 *  levantando el proyecto y después la pantalla del servicio
 *  armándose por partes.
 *
 *  Es la misma mecánica del hero de la home, con dos diferencias: la
 *  sesión de terminal es la del stack de cada servicio, y la pantalla
 *  es una sola —la que corresponde a la landing— en vez de tres.
 *
 *  La ventana va alineada, sin perspectiva: el mockup es el
 *  protagonista del hero y rotarlo le quitaba legibilidad.
 */
export default function LandingHero({ landing }: { landing: Landing }) {
  const raiz = useRef<HTMLElement>(null)
  /** 0 = terminal, 1 = pantalla. Vuelve a 0 y el ciclo se repite. */
  const [paso, setPaso] = useState(0)

  const esTerminal = paso === 0
  const sesion = sesionesLanding[landing.slug]
  const urls = urlsLanding[landing.slug]
  const Pantalla = POR_PARTES[pantallaLanding[landing.slug]]

  const avanzar = () => setPaso((v) => (v + 1) % 2)

  // --- Entrada: corre una sola vez, al montar ---
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('[data-anim]', { opacity: 0, duration: dur.fast, stagger: 0.05, ease: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline()
        tl.from('[data-titulo]', { opacity: 0, y: 24, duration: 0.8, ease: ease.out })
          .from(
            '[data-texto]',
            { opacity: 0, y: 20, duration: dur.base, stagger: 0.1, ease: ease.out },
            0.25,
          )
          .from(
            '[data-ventana]',
            { opacity: 0, x: 60, scale: 0.96, duration: 1, ease: ease.out },
            0.15,
          )
        return () => tl.kill()
      })
    },
    { scope: raiz },
  )

  // --- Ciclo de la ventana: se rearma en cada paso ---
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: se muestra la etapa armada y el ciclo no avanza.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-linea-term]', { opacity: 1, display: 'flex' })
        gsap.set('[data-texto-term]', { clipPath: 'inset(0 0% 0 0)' })
        gsap.set('[data-cursor]', { opacity: 0 })
        gsap.set('[data-parte]', { opacity: 1, y: 0 })
        gsap.set('[data-item]', { opacity: 1, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // ── Etapa de terminal ──
        if (esTerminal) {
          const lineas = gsap.utils.toArray<HTMLElement>('[data-linea-term]', raiz.current)
          const cursor = raiz.current?.querySelector<HTMLElement>('[data-cursor]')
          if (lineas.length === 0) return

          const parpadeo = cursor
            ? gsap.to(cursor, {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: 'steps(1)',
              })
            : null

          const tl = gsap.timeline({ onComplete: avanzar })

          gsap.set(lineas, { opacity: 0, display: 'none' })
          for (const l of lineas) {
            const t = l.querySelector('[data-texto-term]')
            if (t) gsap.set(t, { clipPath: 'inset(0 100% 0 0)' })
          }

          for (const linea of lineas) {
            const texto = linea.querySelector<HTMLElement>('[data-texto-term]')
            const esComando = linea.dataset.tipo === 'comando'
            const largo = (texto?.textContent ?? '').length

            tl.set(linea, { opacity: 1, display: 'flex' })

            if (esComando && texto) {
              // El tipeo revela caracteres con clip-path: reescribir
              // textContent en cada frame forzaría layout.
              tl.to(texto, {
                clipPath: 'inset(0 0% 0 0)',
                duration: largo * 0.018,
                ease: `steps(${Math.max(largo, 1)})`,
              })
            } else if (texto) {
              // La salida no se tipea: aparece de golpe tras una pausa
              // de "procesamiento", como en una terminal real.
              tl.to(texto, { clipPath: 'inset(0 0% 0 0)', duration: 0.01 }, '+=0.22')
            }
          }

          tl.to(lineas, { opacity: 0, duration: 0.3, stagger: 0.03, ease: 'power2.in' }, '+=0.9')

          return () => {
            tl.kill()
            parpadeo?.kill()
          }
        }

        // ── Etapa de pantalla ──
        const partes = gsap.utils.toArray<SVGGElement>('[data-parte]', raiz.current)
        if (partes.length === 0) return

        const tl = gsap.timeline({ onComplete: avanzar })
        gsap.set(partes, { opacity: 0, y: 18 })

        partes.forEach((parte, i) => {
          const items = parte.querySelectorAll('[data-item]')

          tl.to(parte, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, i * 0.4)

          // Las partes con varios elementos los dejan caer con stagger:
          // es lo que da la sensación de que el contenido se puebla.
          if (items.length > 1) {
            tl.from(
              items,
              { opacity: 0, y: 14, duration: 0.32, stagger: 0.06, ease: 'power2.out' },
              i * 0.4 + 0.1,
            )
          }

          const trazo = parte.querySelector<SVGPathElement>('[data-trazo]')
          if (trazo) {
            const largo = trazo.getTotalLength()
            tl.fromTo(
              trazo,
              { strokeDasharray: largo, strokeDashoffset: largo },
              { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
              i * 0.4 + 0.15,
            )
          }
        })

        // Se queda armada un rato largo —es el protagonista del hero— y
        // recién después se desarma.
        tl.to(
          [...partes].reverse(),
          { opacity: 0, y: -14, duration: 0.28, stagger: 0.07, ease: 'power2.in' },
          '+=3.4',
        )

        return () => tl.kill()
      })
    },
    { scope: raiz, dependencies: [paso] },
  )

  const alClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const ancla = href.slice(href.indexOf('#'))
    if (scrollearA(ancla)) e.preventDefault()
  }

  return (
    <section ref={raiz} className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      {/* Mismo fondo animado que el hero de la home, en lugar del Glow
          que tenía: las manchas del mesh ya aportan el color y la
          profundidad, y sumarle el glow encima lavaba el contraste. */}
      <FondoHero />

      {/* Mismo grid y mismo w-full que el hero de la home, para que la
          ventana mida igual en las cuatro páginas. Sin w-full el grid se
          encoge al contenido y la ventana queda de otro tamaño. */}
      <div className="contenedor grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
        {/*  declara el contenedor de consulta: el tamaño
            del H1 se mide contra esta columna, no contra el viewport. */}
        <div className="titulo-hero">
          <h1 data-anim data-titulo className="titulo-hero-texto font-display font-semibold">
            <span className="block">{landing.titulo.antes}</span>
            <RollingText palabras={landing.titulo.palabras} className="block" />
            {landing.titulo.despues ? (
              <span className="block">{landing.titulo.despues}</span>
            ) : null}
          </h1>

          <p data-anim data-texto className="text-cuerpo-lg medida mt-7 text-mid">
            {landing.bajada}
          </p>

          <div data-anim data-texto className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Boton href="#contacto" onClick={(e) => alClick(e, '#contacto')}>
              {landingUi.ctaHero}
            </Boton>
            <Boton href="/#soluciones" variante="secundario">
              {landingUi.ctaSecundario}
            </Boton>
          </div>
        </div>

        {/* Ventana alineada, del mismo tamaño que la del hero de la home:
            se desborda hacia la derecha y #capa-sitio recorta lo que
            asoma, sin generar scroll horizontal. */}
        <div data-anim data-ventana className="lg:w-[118%]">
          <div className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
              </span>
              <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
                {esTerminal ? urls.terminal : urls.pantalla}
              </span>
            </div>

            {/* Misma caja para las dos clases de etapa, así el ciclo no
                cambia de tamaño al pasar de una a la otra. */}
            <div
              role={esTerminal ? undefined : 'img'}
              aria-label={esTerminal ? undefined : landing.mockup.alt}
              className="aspect-16/10"
            >
              {esTerminal ? <SesionTerminal lineas={sesion} /> : <Pantalla />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
