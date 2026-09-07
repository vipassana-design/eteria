'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { scrollearA } from '@/lib/lenis'
import { contacto, navegacion, ui } from '@/content/marca'
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
              {navegacion.map((enlace) => (
                <li key={enlace.href}>
                  <Link
                    href={enlace.href}
                    onClick={(e) => alClickEnAncla(e, enlace.href)}
                    className="text-cuerpo relative text-mid transition-colors duration-300 hover:text-hi after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-(image:--grad-brand) after:transition-[width] after:duration-300 after:ease-(--ease-suave) hover:after:w-full"
                  >
                    {enlace.etiqueta}
                  </Link>
                </li>
              ))}
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
