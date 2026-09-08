'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { scrollearA } from '@/lib/lenis'
import { contacto, navegacion, ui } from '@/content/marca'
import type { EnlaceNav } from '@/types'
import Boton from '@/components/ui/Boton'
import Logo from './Logo'
import MobileMenu from './MobileMenu'

/** Header fijo (PLAN.md §4.1).
 *  Al scrollear pasa de transparente a --bg-elevated con blur y borde
 *  inferior hairline. */
export default function Header() {
  const raiz = useRef<HTMLElement>(null)
  const [conScroll, setConScroll] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const pathname = usePathname()

  useGSAP(() => {
    // El estado se resuelve con ScrollTrigger en vez de un listener
    // propio: ya hay uno corriendo y comparte el mismo cálculo.
    const st = ScrollTrigger.create({
      start: 'top -24px',
      end: 'max',
      onToggle: (self) => setConScroll(self.isActive),
    })
    return () => st.kill()
  })

  /** Los enlaces del header son anclas a secciones de la home. Si ya
   *  estamos en la home, se intercepta para scrollear con Lenis; si no,
   *  se deja navegar y el ancla la resuelve el navegador. */
  const alClickEnAncla = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== '/') return

    const ancla = href.slice(href.indexOf('#'))
    if (scrollearA(ancla)) e.preventDefault()
  }

  return (
    <>
      {/* Salto al contenido: primer tabulable de la página (§8.6). */}
      <a
        href="#contenido"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-6 focus-visible:top-6 focus-visible:z-100 focus-visible:rounded-(--radius-control) focus-visible:bg-elevated focus-visible:px-5 focus-visible:py-3 focus-visible:text-hi"
      >
        {ui.saltarAlContenido}
      </a>

      <header
        ref={raiz}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-(--ease-suave) ${
          conScroll
            ? 'border-b border-hairline bg-elevated/80 backdrop-blur-[12px]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="contenedor flex h-20 items-center justify-between gap-8">
          <Logo />

          <nav aria-label={ui.navegacionPrincipal} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navegacion.map((enlace) =>
                enlace.hijos ? (
                  <ItemConDropdown
                    key={enlace.href}
                    enlace={enlace}
                    onClickAncla={alClickEnAncla}
                  />
                ) : (
                  <li key={enlace.href}>
                    <Link
                      href={enlace.href}
                      onClick={(e) => alClickEnAncla(e, enlace.href)}
                      className={ENLACE_NAV}
                    >
                      {enlace.etiqueta}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* El wrapper oculta el botón en mobile: aplicar `hidden` al
                Boton no alcanza, porque compite con el `inline-flex` de
                sus clases base y gana el orden de la hoja, no el del
                atributo. En mobile el CTA vive en el overlay del menú. */}
            <div className="hidden lg:block">
              <Boton
                href={contacto.href}
                tamano="chico"
                onClick={(e) => alClickEnAncla(e, contacto.href)}
              >
                {contacto.etiqueta}
              </Boton>
            </div>

            <BotonHamburguesa abierto={menuAbierto} onClick={() => setMenuAbierto((v) => !v)} />
          </div>
        </div>
      </header>

      <MobileMenu abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />
    </>
  )
}

/** Hamburguesa de dos líneas que se cruzan al abrir. */
function BotonHamburguesa({ abierto, onClick }: { abierto: boolean; onClick: () => void }) {
  const raiz = useRef<HTMLButtonElement>(null)

  useGSAP(
    () => {
      const lineas = raiz.current?.querySelectorAll('span[data-linea]')
      if (!lineas || lineas.length < 2) return

      gsap.to(lineas[0]!, {
        y: abierto ? 3.5 : 0,
        rotate: abierto ? 45 : 0,
        duration: 0.35,
        ease: 'power2.inOut',
      })
      gsap.to(lineas[1]!, {
        y: abierto ? -3.5 : 0,
        rotate: abierto ? -45 : 0,
        duration: 0.35,
        ease: 'power2.inOut',
      })
    },
    { scope: raiz, dependencies: [abierto] },
  )

  return (
    <button
      ref={raiz}
      type="button"
      onClick={onClick}
      aria-expanded={abierto}
      aria-controls="menu-mobile"
      aria-label={abierto ? ui.cerrarMenu : ui.abrirMenu}
      className="relative flex size-11 items-center justify-center rounded-(--radius-control) border border-hairline transition-colors duration-300 hover:border-hairline-hover lg:hidden"
    >
      <span className="flex w-5 flex-col gap-[7px]">
        <span data-linea className="block h-px w-full origin-center bg-hi" />
        <span data-linea className="block h-px w-full origin-center bg-hi" />
      </span>
    </button>
  )
}

/** Estilo de los enlaces de la navegación: subrayado con el degradé que
 *  crece en hover. Compartido con el disparador del dropdown. */
const ENLACE_NAV =
  'text-cuerpo relative text-mid transition-colors duration-300 hover:text-hi after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-(image:--grad-brand) after:transition-[width] after:duration-300 after:ease-(--ease-suave) hover:after:w-full'

/** Item de navegación con dropdown (Servicios).
 *
 *  El enlace propio sigue llevando a la sección de la home; los hijos
 *  van a su landing.
 *
 *  El panel abre con hover y con foco de teclado. El cierre por hover
 *  tiene un retardo corto: sin él, el hueco entre el disparador y el
 *  panel alcanza para que el mouse "salga" y el panel se cierre en el
 *  camino.
 */
function ItemConDropdown({
  enlace,
  onClickAncla,
}: {
  enlace: EnlaceNav
  onClickAncla: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  const raiz = useRef<HTMLLIElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const [abierto, setAbierto] = useState(false)
  const cierre = useRef<number | null>(null)

  const abrir = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    setAbierto(true)
  }
  const cerrarConRetardo = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    cierre.current = window.setTimeout(() => setAbierto(false), 120)
  }

  useGSAP(
    () => {
      const el = panel.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { autoAlpha: abierto ? 1 : 0, y: 0 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(el, {
          autoAlpha: abierto ? 1 : 0,
          y: abierto ? 0 : -8,
          duration: abierto ? 0.32 : 0.2,
          ease: abierto ? 'power3.out' : 'power2.in',
        })

        if (abierto) {
          gsap.fromTo(
            el.querySelectorAll('a'),
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.28, stagger: 0.05, ease: 'power2.out' },
          )
        }
      })
    },
    { scope: raiz, dependencies: [abierto] },
  )

  // Esc cierra, y el foco que sale del item también: así el dropdown no
  // queda abierto al tabular fuera de él.
  const alTeclado = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setAbierto(false)
  }
  const alSalirElFoco = (e: React.FocusEvent) => {
    if (!raiz.current?.contains(e.relatedTarget as Node)) setAbierto(false)
  }

  return (
    <li
      ref={raiz}
      className="relative"
      onMouseEnter={abrir}
      onMouseLeave={cerrarConRetardo}
      onFocus={abrir}
      onBlur={alSalirElFoco}
      onKeyDown={alTeclado}
    >
      <Link
        href={enlace.href}
        onClick={(e) => {
          setAbierto(false)
          onClickAncla(e, enlace.href)
        }}
        aria-expanded={abierto}
        className={`${ENLACE_NAV} inline-flex items-center gap-1.5`}
      >
        {enlace.etiqueta}
        <svg
          viewBox="0 0 16 16"
          className={`size-3.5 transition-transform duration-300 ease-(--ease-suave) ${
            abierto ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="m4 6.5 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* El panel arranca invisible por GSAP (autoAlpha), no por una
          clase: si no, la primera apertura no tiene desde dónde animar. */}
      <div
        ref={panel}
        className="absolute left-0 top-full pt-4 opacity-0"
        // Sin punteros cuando está cerrado: invisible pero clickeable
        // taparía la sección de abajo.
        style={{ pointerEvents: abierto ? 'auto' : 'none' }}
      >
        <ul className="min-w-64 overflow-hidden rounded-(--radius-card) border border-hairline bg-elevated/95 p-2 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          {enlace.hijos?.map((hijo) => (
            <li key={hijo.href}>
              <Link
                href={hijo.href}
                onClick={() => setAbierto(false)}
                tabIndex={abierto ? 0 : -1}
                className="text-cuerpo flex items-center justify-between gap-4 rounded-(--radius-control) px-4 py-3 text-mid transition-colors duration-300 ease-(--ease-suave) hover:bg-white/[0.04] hover:text-hi"
              >
                {hijo.etiqueta}
                <span aria-hidden="true" className="text-violet-300">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
