'use client'

import { useState } from 'react'
import { terrazas } from '@/content/plantillas/terrazas'

/** Barra de Terrazas: logo con serif, nav y el CTA del propietario.
 *
 *  El CTA no es "Contacto" sino "Publicar mi propiedad", y eso importa:
 *  un sitio inmobiliario tiene dos públicos opuestos —quien busca y
 *  quien vende— y la barra es donde se atiende al segundo. Todo lo
 *  demás de la página le habla al primero.
 *
 *  El logo va en la serif de los títulos, no en la sans del cuerpo: es
 *  el gesto que distingue a las inmobiliarias establecidas de las
 *  aplicaciones de alquiler.
 */
export default function Barra() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header
      style={{ background: 'var(--blanco)', borderBottomColor: 'var(--linea)' }}
      className="sticky top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 lg:px-10">
        <a href="#" className="flex items-baseline gap-2">
          <span
            style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
            className="text-[22px] font-semibold leading-none tracking-[-0.01em]"
          >
            {terrazas.marca.nombre}
          </span>
          {/* La bajada en bronce y en versalitas: separa el nombre del
              rubro sin necesitar una segunda línea. */}
          <span
            style={{ color: 'var(--bronce)' }}
            className="text-[10.5px] font-semibold uppercase tracking-[0.16em]"
          >
            {terrazas.marca.bajada}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {terrazas.nav.map((n) => (
            <a
              key={n.t}
              href="#"
              style={{ color: 'var(--tinta-media)' }}
              className="text-[13.5px] transition-colors duration-200 hover:text-[var(--bronce)]"
            >
              {n.t}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* El CTA en un div con la clase de display: pasarle `hidden`
              por className pierde contra el `inline-flex` de sus clases
              base según el orden de la hoja generada. */}
          <div className="hidden sm:block">
            <a
              href="#"
              style={{ background: 'var(--bronce)' }}
              className="inline-flex rounded-sm px-4 py-2.5 text-[12.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
            >
              {terrazas.cta}
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
                  className="block h-[1.5px] w-[22px]"
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
          {terrazas.nav.map((n) => (
            <a
              key={n.t}
              href="#"
              style={{ borderBottomColor: 'var(--linea)', color: 'var(--tinta)' }}
              className="block border-b px-5 py-3.5 text-[15px] last:border-b-0"
            >
              {n.t}
            </a>
          ))}
          <div className="p-5">
            <a
              href="#"
              style={{ background: 'var(--bronce)' }}
              className="block rounded-sm py-3 text-center text-[13.5px] font-semibold text-white"
            >
              {terrazas.cta}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
