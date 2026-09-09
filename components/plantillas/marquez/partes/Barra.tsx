'use client'

import { useState } from 'react'
import { marquez } from '@/content/plantillas/marquez'

/** Barra del estudio: logo, nav, teléfono visible y CTA de consulta.
 *
 *  **El teléfono va en la barra, no escondido en el pie.** En un estudio
 *  jurídico la primera consulta se hace por teléfono: quien tiene una
 *  audiencia el martes no espera la respuesta a un formulario. Es el
 *  mismo criterio por el que la guardia va arriba en el sitio de la
 *  clínica.
 *
 *  El logo es tipográfico y no un símbolo. Una balanza, un martillo de
 *  juez o unas columnas dóricas son la firma visual de la plantilla
 *  legal comprada; el nombre en serif con el filete en bronce es lo que
 *  usan los estudios que existen.
 *
 *  Sin sombra al scrollear y sin cambio de alto: la barra es una línea
 *  fina y quieta. Cualquier movimiento acá contradice el registro.
 */
export default function Barra() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header
      style={{ background: 'var(--blanco)', borderBottomColor: 'var(--linea)' }}
      className="sticky top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 lg:px-10 lg:py-5">
        <a href="#" className="flex items-center gap-3">
          {/* El filete vertical en bronce, en lugar de un símbolo. */}
          <span
            style={{ background: 'var(--bronce)' }}
            className="block h-8 w-[3px]"
          />
          <span className="flex flex-col leading-none">
            <span
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="text-[17px] font-semibold tracking-[-0.01em] sm:text-[19px]"
            >
              {marquez.marca.nombre}
            </span>
            <span
              style={{ color: 'var(--bronce)' }}
              className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.2em]"
            >
              {marquez.marca.bajada}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {marquez.nav.map((n) => (
            <a
              key={n.t}
              href="#"
              style={{ color: 'var(--tinta-media)' }}
              className="text-[13px] transition-colors duration-200 hover:text-[var(--bronce)]"
            >
              {n.t}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* El teléfono, con su etiqueta. Sin la etiqueta un número
              suelto en una barra se lee como un dato de más. */}
          <div className="hidden flex-col items-end leading-none md:flex">
            <span
              style={{ color: 'var(--tinta-media)' }}
              className="text-[9.5px] font-semibold uppercase tracking-[0.16em]"
            >
              {marquez.contactoBarra.etiqueta}
            </span>
            <a
              href="#"
              style={{ color: 'var(--tinta)' }}
              className="mt-1 text-[14.5px] font-semibold tabular-nums transition-colors duration-200 hover:text-[var(--bronce)]"
            >
              {marquez.contactoBarra.tel}
            </a>
          </div>

          {/* En un div con la clase de display: pasarle `hidden` al
              enlace competiría con su `inline-flex` y ganaría el orden
              de la hoja generada. */}
          <div className="hidden lg:block">
            <a
              href="#"
              style={{ background: 'var(--tinta)' }}
              className="inline-flex px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--bronce)]"
            >
              {marquez.cta}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
            className="lg:hidden"
          >
            <span className="flex flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{ background: 'var(--tinta)' }}
                  className="block h-[1.5px] w-[21px]"
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {abierto ? (
        <nav
          style={{ borderTopColor: 'var(--linea)', background: 'var(--blanco)' }}
          className="border-t lg:hidden"
        >
          {marquez.nav.map((n) => (
            <a
              key={n.t}
              href="#"
              style={{ borderBottomColor: 'var(--linea)', color: 'var(--tinta)' }}
              className="block border-b px-5 py-3.5 text-[14.5px] last:border-b-0"
            >
              {n.t}
            </a>
          ))}
          <div
            style={{ borderTopColor: 'var(--linea)' }}
            className="flex flex-col gap-3 border-t p-5"
          >
            <a
              href="#"
              style={{ color: 'var(--tinta)' }}
              className="text-[16px] font-semibold tabular-nums"
            >
              {marquez.contactoBarra.tel}
            </a>
            <a
              href="#"
              style={{ background: 'var(--tinta)' }}
              className="block py-3 text-center text-[13px] font-semibold text-white"
            >
              {marquez.cta}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
