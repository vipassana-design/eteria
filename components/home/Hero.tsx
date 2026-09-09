'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrollearA } from '@/lib/lenis'
import { dur, ease } from '@/lib/motion'
import { etapasHero, etiquetaTerminal, hero, sesionHero } from '@/content/hero'
import Boton from '@/components/ui/Boton'
import FondoHero from '@/components/bg/FondoHero'
import RollingText from '@/components/ui/RollingText'
import { POR_PARTES } from './PantallasPorPartes'
import SesionTerminal from './SesionTerminal'

/** Hero (PLAN.md §4.2).
 *
 *  Texto a la izquierda y a la derecha una ventana donde la interfaz se
 *  arma sola: primero una sesión de terminal que levanta el proyecto, y
 *  después las tres pantallas armándose por partes, una tras otra,
 *  antes de volver a la terminal.
 *
 *  La terminal comparte el marco y la caja 16:10 de las ventanas, así el
 *  ciclo no cambia de tamaño entre etapas.
 *
 *  El texto entra una sola vez, con la secuencia orquestada del sitio, y
 *  después queda quieto: el movimiento vive en la ventana.
 */

/** El ciclo: la terminal primero (null) y después las tres pantallas. */
const CICLO = [null, ...etapasHero] as const

interface PropsHero {
  /** Solo se apaga en la ruta de comparación /fondos, que monta este
   *  hero con otro fondo detrás: sin esto se verían los dos apilados.
   *  En el sitio va siempre en true. */
  conFondo?: boolean
  /** Set de pantallas del ciclo. Se cambia en /mockups para ver las
   *  propuestas corriendo dentro del hero real. */
  pantallas?: typeof POR_PARTES
}

export default function Hero({ conFondo = true, pantallas = POR_PARTES }: PropsHero = {}) {
  const raiz = useRef<HTMLElement>(null)
  const [paso, setPaso] = useState(0)

  const etapa = CICLO[paso] ?? null
  const esTerminal = etapa === null
  const Pantalla = etapa ? pantallas[etapa.pantalla] : null

  const avanzar = () => setPaso((p) => (p + 1) % CICLO.length)

  // --- Entrada del texto: corre una sola vez, al montar ---
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('[data-anim]', { opacity: 0, duration: dur.fast, stagger: 0.04, ease: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline()
        // Solo las líneas fijas entran con máscara. El tramo rotante
        // queda afuera: su wrapper tiene overflow-hidden y su tira ya
        // usa yPercent, así que animarlo desde abajo recortaría la
        // palabra. Entra con opacidad, junto al resto del texto.
        tl.from('[data-titulo] > span:not([data-rotante])', {
          yPercent: 100,
          duration: 0.9,
          stagger: 0.08,
          ease: ease.snap,
        })
          .from(
            '[data-rotante]',
            { opacity: 0, duration: dur.base, ease: ease.out },
            0.3,
          )
          .from(
            '[data-texto]',
            { opacity: 0, y: 20, duration: dur.base, stagger: 0.1, ease: ease.out },
            0.4,
          )
          .from('[data-ventana]', { opacity: 0, x: 60, scale: 0.96, duration: 1, ease: ease.out }, 0.2)
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

        // ── Etapas de ventana ──
        const partes = gsap.utils.toArray<SVGGElement>('[data-parte]', raiz.current)
        if (partes.length === 0) return

        const tl = gsap.timeline({ onComplete: avanzar })
        gsap.set(partes, { opacity: 0, y: 18 })

        partes.forEach((parte, i) => {
          // Los que esperan el trazo se animan aparte, más abajo.
          const items = parte.querySelectorAll('[data-item]:not([data-tras-trazo])')

          tl.to(parte, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' }, i * 0.38)

          // Las partes con varios elementos los dejan caer con stagger:
          // es lo que da la sensación de que el contenido se puebla.
          if (items.length > 1) {
            tl.from(
              items,
              { opacity: 0, y: 14, duration: 0.32, stagger: 0.06, ease: 'power2.out' },
              i * 0.38 + 0.1,
            )
          }

          const trazo = parte.querySelector<SVGPathElement>('[data-trazo]')
          const dibujaEn = i * 0.38 + 0.15
          const duraTrazo = 0.75
          if (trazo) {
            const largo = trazo.getTotalLength()
            tl.fromTo(
              trazo,
              { strokeDasharray: largo, strokeDashoffset: largo },
              { strokeDashoffset: 0, duration: duraTrazo, ease: 'power2.inOut' },
              dibujaEn,
            )
          }

          // Lo que la línea tiene que alcanzar antes de aparecer: el
          // tooltip del último valor de un gráfico señala un punto, y
          // mostrarlo mientras la línea todavía viaja lo desmiente.
          const trasTrazo = parte.querySelectorAll('[data-tras-trazo]')
          if (trasTrazo.length > 0) {
            tl.from(
              trasTrazo,
              { opacity: 0, scale: 0.8, duration: 0.3, ease: 'back.out(2)', transformOrigin: 'center' },
              trazo ? dibujaEn + duraTrazo - 0.05 : dibujaEn,
            )
          }
        })

        tl.to(
          [...partes].reverse(),
          { opacity: 0, y: -14, duration: 0.28, stagger: 0.07, ease: 'power2.in' },
          '+=1.9',
        )

        return () => tl.kill()
      })
    },
    { scope: raiz, dependencies: [paso] },
  )

  const alClickAncla = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const ancla = href.slice(href.indexOf('#'))
    if (scrollearA(ancla)) e.preventDefault()
  }

  return (
    <section
      ref={raiz}
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40"
    >
      {/* El fondo animado reemplaza a los dos Glow que tenía el hero:
          las manchas del mesh ya aportan el color y la profundidad, y
          sumarles los glows encima lavaba el contraste del texto. */}
      {conFondo ? <FondoHero /> : null}

      <div className="contenedor grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
        {/* Texto.  declara el contenedor de consulta: el
            tamaño del H1 se mide contra esta columna y no contra el
            viewport. */}
        <div className="titulo-hero relative z-10">
          {/* Los cortes de línea vienen del contenido, no del ancho: a
              76px las palabras largas ocupan casi la columna entera y el
              wrap dejaba líneas de una sola palabra. */}
          <h1 data-anim data-titulo className="titulo-hero-texto font-display font-semibold [text-wrap:nowrap]">
            {hero.titulo.antes.map((linea) => (
              <span key={linea} className="block">
                {linea}
              </span>
            ))}
            {/* El último tramo rota, y ocupa su propia línea como los
                anteriores. */}
            <RollingText palabras={hero.titulo.rotantes} className="block" />
          </h1>

          <p data-anim data-texto className="text-cuerpo medida mt-6 text-mid">
            {hero.bajada}
          </p>

          <div data-anim data-texto className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
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

          <p data-anim data-texto className="text-label mt-8 text-low">
            {hero.prueba}
          </p>
        </div>

        {/* Ventana. Se desborda hacia la derecha: el corte contra el
            borde es parte del efecto, y #capa-sitio lo recorta sin
            generar scroll horizontal. */}
        <div data-anim data-ventana className="lg:w-[118%]">
          <div className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
                <span className="size-2 rounded-full bg-[#4A4370]" />
              </span>
              <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
                {esTerminal ? 'eteria — bash' : etapa.url}
              </span>
            </div>

            {/* Misma caja para las dos clases de etapa. */}
            <div className="aspect-16/10">
              {esTerminal ? <SesionTerminal lineas={sesionHero} /> : Pantalla && <Pantalla />}
            </div>
          </div>

          {/* Indicador de la etapa. */}
          <div className="mt-4 flex items-center gap-3">
            <p aria-live="polite" className="text-label text-low">
              {esTerminal ? etiquetaTerminal : etapa.etiqueta}
            </p>
            <span className="flex gap-1.5" aria-hidden="true">
              {CICLO.map((e, i) => (
                <span
                  key={e?.pantalla ?? 'terminal'}
                  className={`h-0.5 w-6 rounded-full transition-colors duration-500 ${
                    i === paso ? 'bg-violet-500' : 'bg-hairline'
                  }`}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
