'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap'
import { atelier } from '@/content/plantillas/atelier'

/** Barra de Atelier: aviso, logo centrado y navegación.
 *
 *  El logo va centrado con la nav a los costados —la disposición de las
 *  tiendas de indumentaria— y no a la izquierda como un sitio
 *  corporativo. Es una decisión de rubro, no de gusto.
 *
 *  Al scrollear, la franja del aviso se retrae y la barra toma un
 *  hairline inferior. Se hace con GSAP y no con `position: sticky` +
 *  clase, porque el alto cambia y con CSS solo el contenido salta.
 */
export default function Barra() {
  const raiz = useRef<HTMLElement>(null)
  const [abierto, setAbierto] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: la barra queda en su estado compacto, que es el
      // que sirve para leer. No se pierde nada.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-aviso]', { height: 0, opacity: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const aviso = raiz.current?.querySelector('[data-aviso]')
        if (!aviso) return

        const tl = gsap.timeline({ paused: true })
        tl.to(aviso, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' })
        tl.to(raiz.current, { borderBottomColor: 'var(--linea)', duration: 0.3 }, 0)

        const st = ScrollTrigger.create({
          start: 40,
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
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
    <header
      ref={raiz}
      style={{ background: 'var(--papel)', borderBottomColor: 'transparent' }}
      className="sticky top-0 z-50 border-b"
    >
      {/* El aviso de envíos y cuotas: es lo primero que una tienda
          quiere decir, y lo que la hace ver en actividad. */}
      <div
        data-aviso
        style={{ background: 'var(--tinta)' }}
        className="overflow-hidden"
      >
        <p
          style={{ color: '#E8E2D8', letterSpacing: '0.08em' }}
          className="px-4 py-2.5 text-center text-[11px] uppercase"
        >
          {atelier.aviso}
        </p>
      </div>

      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 lg:px-10 lg:py-5">
        {/* Mitad izquierda de la nav, en desktop. */}
        <nav className="hidden flex-1 items-center gap-7 lg:flex">
          {atelier.nav.slice(0, 2).map((n) => (
            <a
              key={n.t}
              href="#"
              style={{ color: n.destacado ? 'var(--terracota)' : 'var(--tinta-media)' }}
              className="group relative text-[13px] tracking-wide"
            >
              {n.t}
              {/* El subrayado crece de izquierda a derecha. Es refuerzo:
                  el enlace ya se distingue por color y cursor. */}
              <span
                style={{ background: 'currentColor' }}
                className="absolute -bottom-1 left-0 h-px w-0 transition-[width] duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Hamburguesa, solo en mobile. */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
          className="lg:hidden"
        >
          <span className="flex flex-col gap-[5px]">
            <span
              style={{ background: 'var(--tinta)' }}
              className="block h-px w-6 transition-transform duration-300"
            />
            <span
              style={{ background: 'var(--tinta)' }}
              className="block h-px w-6 transition-opacity duration-300"
            />
            <span
              style={{ background: 'var(--tinta)' }}
              className="block h-px w-6 transition-transform duration-300"
            />
          </span>
        </button>

        {/* El logo, centrado. */}
        <a href="#" className="flex flex-col items-center gap-0.5">
          <span
            style={{
              fontFamily: 'var(--serif)',
              letterSpacing: '0.14em',
              color: 'var(--tinta)',
            }}
            className="text-[22px] leading-none lg:text-[26px]"
          >
            {atelier.marca.nombre.toUpperCase()}
          </span>
          <span
            style={{ color: 'var(--tinta-tenue)', letterSpacing: '0.2em' }}
            className="text-[8px] uppercase"
          >
            {atelier.marca.bajada}
          </span>
        </a>

        {/* Mitad derecha de la nav + los iconos. */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden items-center gap-7 lg:flex">
            {atelier.nav.slice(2).map((n) => (
              <a
                key={n.t}
                href="#"
                style={{ color: 'var(--tinta-media)' }}
                className="group relative text-[13px] tracking-wide"
              >
                {n.t}
                <span
                  style={{ background: 'currentColor' }}
                  className="absolute -bottom-1 left-0 h-px w-0 transition-[width] duration-300 group-hover:w-full"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button type="button" aria-label="Buscar">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.2" stroke="var(--tinta)" strokeWidth="1.2" />
                <path d="M11 11l4.2 4.2" stroke="var(--tinta)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" aria-label="Ver el carrito" className="relative">
              <svg width="17" height="18" viewBox="0 0 17 18" fill="none" aria-hidden="true">
                <path
                  d="M2 5.2h13L13.8 16.5H3.2L2 5.2Z"
                  stroke="var(--tinta)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.9 5.2V3.9a2.6 2.6 0 0 1 5.2 0v1.3"
                  stroke="var(--tinta)"
                  strokeWidth="1.2"
                />
              </svg>
              {/* El contador: una tienda sin nada en el carrito se ve
                  recién abierta. */}
              <span
                style={{ background: 'var(--terracota)' }}
                className="absolute -right-1.5 -top-1 grid size-[15px] place-items-center rounded-full text-[9px] font-semibold text-white"
              >
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú mobile. Se despliega en el flujo y no como overlay: en una
          tienda con la nav corta, un overlay a pantalla completa es
          desproporcionado. */}
      {abierto ? (
        <nav
          style={{ borderTopColor: 'var(--linea)' }}
          className="border-t lg:hidden"
        >
          {atelier.nav.map((n) => (
            <a
              key={n.t}
              href="#"
              style={{
                borderBottomColor: 'var(--linea)',
                color: n.destacado ? 'var(--terracota)' : 'var(--tinta)',
              }}
              className="block border-b px-5 py-3.5 text-[15px] last:border-b-0"
            >
              {n.t}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
