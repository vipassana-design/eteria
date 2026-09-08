'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap, useGSAP } from '@/lib/gsap'
import { bloquearScroll, scrollearA } from '@/lib/lenis'
import { contacto, marca, navegacion, ui } from '@/content/marca'
import Boton from '@/components/ui/Boton'

interface Props {
  abierto: boolean
  onCerrar: () => void
}

/** Menú mobile (PLAN.md §7).
 *  Overlay full screen con fondo --bg-elevated y blur, links en Clash
 *  Display 32px con stagger de entrada, botón de contacto abajo.
 *  Bloquea el scroll del body mientras está abierto. */
export default function MobileMenu({ abierto, onCerrar }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  /** href del item cuyo submenú está desplegado, o null. */
  const [desplegado, setDesplegado] = useState<string | null>(null)

  useGSAP(
    () => {
      const el = raiz.current
      if (!el) return

      const items = el.querySelectorAll('[data-item]')
      const pie = el.querySelector('[data-pie]')

      const tl = gsap.timeline()

      if (abierto) {
        // El overlay entra primero y los links lo siguen con stagger.
        tl.set(el, { pointerEvents: 'auto' })
          .to(el, { opacity: 1, duration: 0.3, ease: 'power2.out' })
          .fromTo(
            items,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
            '-=0.1',
          )
          .fromTo(pie, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')
      } else {
        tl.to(el, { opacity: 0, duration: 0.25, ease: 'power2.in' }).set(el, {
          pointerEvents: 'none',
        })
      }

      return () => tl.kill()
    },
    { scope: raiz, dependencies: [abierto] },
  )

  // Bloqueo de scroll, cierre con Esc y focus trap. Van en useEffect y
  // no en useGSAP porque no son animaciones.
  useEffect(() => {
    bloquearScroll(abierto)

    if (!abierto) return

    const el = raiz.current
    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCerrar()
        return
      }

      if (e.key !== 'Tab' || !el) return

      // Focus trap: el tabulado circula dentro del overlay (§8.6).
      const focoables = el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focoables.length === 0) return

      const primero = focoables[0]!
      const ultimo = focoables[focoables.length - 1]!

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }

    document.addEventListener('keydown', alTeclado)

    // El foco entra al overlay al abrirlo.
    const primerEnlace = el?.querySelector<HTMLElement>('a[href]')
    primerEnlace?.focus()

    return () => {
      document.removeEventListener('keydown', alTeclado)
      bloquearScroll(false)
    }
  }, [abierto, onCerrar])

  /** Cierra el overlay y pliega el submenú: si queda desplegado, la
   *  próxima apertura lo muestra abierto. */
  const cerrarTodo = () => {
    setDesplegado(null)
    onCerrar()
  }

  const alClickEnEnlace = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    cerrarTodo()
    if (pathname !== '/') return

    const ancla = href.slice(href.indexOf('#'))
    // El scroll espera a que el overlay termine de cerrarse y el body
    // vuelva a scrollear, si no el destino se calcula con el scroll
    // bloqueado.
    e.preventDefault()
    window.setTimeout(() => scrollearA(ancla), 280)
  }

  return (
    <div
      ref={raiz}
      id="menu-mobile"
      // aria-hidden sigue al estado: cerrado no debe ser navegable por
      // lector de pantalla aunque siga en el DOM.
      aria-hidden={!abierto}
      className="fixed inset-0 z-40 flex flex-col justify-between bg-elevated/95 opacity-0 backdrop-blur-xl lg:hidden"
      style={{ pointerEvents: 'none' }}
    >
      {/* Deja ver el header por encima: el overlay arranca debajo. */}
      <nav aria-label={ui.navegacionPrincipal} className="contenedor mt-28 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {navegacion.map((enlace) => (
            <li key={enlace.href} data-item>
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={enlace.href}
                  onClick={(e) => alClickEnEnlace(e, enlace.href)}
                  tabIndex={abierto ? 0 : -1}
                  className="font-display block flex-1 py-2 text-[2rem] font-semibold leading-tight text-hi transition-colors duration-300 hover:text-violet-300"
                >
                  {enlace.etiqueta}
                </Link>

                {/* El submenú se despliega con un botón aparte: si el
                    toque en la etiqueta abriera el submenú, no habría
                    forma de ir a la sección de la home. */}
                {enlace.hijos ? (
                  <button
                    type="button"
                    onClick={() =>
                      setDesplegado((actual) => (actual === enlace.href ? null : enlace.href))
                    }
                    aria-expanded={desplegado === enlace.href}
                    aria-label={`${enlace.etiqueta}: ver opciones`}
                    tabIndex={abierto ? 0 : -1}
                    className="flex size-10 shrink-0 items-center justify-center rounded-(--radius-control) border border-hairline text-mid transition-colors duration-300 hover:border-hairline-hover hover:text-hi"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className={`size-4 transition-transform duration-300 ease-(--ease-suave) ${
                        desplegado === enlace.href ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path d="m4 6.5 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ) : null}
              </div>

              {/* Submenú. `grid-template-rows` de 0fr a 1fr anima el
                  despliegue sin tener que medir el alto del contenido. */}
              {enlace.hijos ? (
                <div
                  className="grid transition-[grid-template-rows] duration-400 ease-(--ease-suave)"
                  style={{
                    gridTemplateRows: desplegado === enlace.href ? '1fr' : '0fr',
                  }}
                >
                  <ul className="overflow-hidden">
                    {enlace.hijos.map((hijo) => (
                      <li key={hijo.href}>
                        <Link
                          href={hijo.href}
                          onClick={cerrarTodo}
                          tabIndex={abierto && desplegado === enlace.href ? 0 : -1}
                          className="text-cuerpo-lg flex items-center gap-3 border-l border-hairline py-2.5 pl-5 text-mid transition-colors duration-300 hover:border-hairline-hover hover:text-hi"
                        >
                          {hijo.etiqueta}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      <div data-pie className="contenedor flex flex-col gap-6 pb-10">
        <Boton
          href={contacto.href}
          onClick={(e) => alClickEnEnlace(e, contacto.href)}
          tabIndex={abierto ? 0 : -1}
          className="w-full"
        >
          {contacto.etiqueta}
        </Boton>

        <a
          href={`mailto:${marca.email}`}
          tabIndex={abierto ? 0 : -1}
          className="text-cuerpo text-mid transition-colors duration-300 hover:text-hi"
        >
          {marca.email}
        </a>
      </div>
    </div>
  )
}
