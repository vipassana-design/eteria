'use client'

import { useEffect, useRef } from 'react'
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

  const alClickEnEnlace = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onCerrar()
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
      <nav aria-label={ui.navegacionPrincipal} className="contenedor mt-28 flex-1">
        <ul className="flex flex-col gap-2">
          {navegacion.map((enlace) => (
            <li key={enlace.href} data-item>
              <Link
                href={enlace.href}
                onClick={(e) => alClickEnEnlace(e, enlace.href)}
                tabIndex={abierto ? 0 : -1}
                className="font-display block py-2 text-[2rem] font-semibold leading-tight text-hi transition-colors duration-300 hover:text-violet-300"
              >
                {enlace.etiqueta}
              </Link>
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
