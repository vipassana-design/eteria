'use client'

import { useState } from 'react'
import { clinica } from '@/content/plantillas/clinica'

/** Barra de la Clínica: franja de guardia, logo, nav y CTA de turno.
 *
 *  La franja de urgencias va arriba de todo y en color: es lo primero
 *  que alguien busca en un sitio de salud, y esconderla en el pie es el
 *  error más común de estos sitios.
 */
export default function Barra() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* La guardia, en el verde hondo. */}
      <div style={{ background: 'var(--verde-hondo)' }}>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-4 gap-y-1 px-5 py-2 lg:px-10">
          <span className="flex items-center gap-2">
            {/* El punto pulsante: dice "esto está abierto ahora". */}
            <span className="relative flex size-2">
              <span
                style={{ background: '#5EEAD4' }}
                className="absolute inline-flex size-full animate-ping rounded-full opacity-75"
              />
              <span style={{ background: '#5EEAD4' }} className="relative inline-flex size-2 rounded-full" />
            </span>
            <span className="text-[11.5px] font-semibold text-white">
              {clinica.urgencias.etiqueta}
            </span>
          </span>
          <a
            href="#"
            className="text-[11.5px] font-semibold text-white underline decoration-white/40 underline-offset-2 transition-colors duration-200 hover:decoration-white"
          >
            {clinica.urgencias.tel}
          </a>
          <span className="hidden text-[11.5px] text-white/65 sm:inline">
            {clinica.urgencias.nota}
          </span>
        </div>
      </div>

      <div
        style={{ background: 'var(--papel)', borderBottomColor: 'var(--linea)' }}
        className="border-b"
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3.5 lg:px-10">
          <a href="#" className="flex items-center gap-2.5">
            {/* La cruz, dibujada: un logo de salud sin cruz no se lee
                como tal, y con un ícono de librería se ve genérico. */}
            <span
              style={{ background: 'var(--verde)' }}
              className="grid size-9 place-items-center rounded-lg"
            >
              <svg width="17" height="17" viewBox="0 0 17 17" aria-hidden="true">
                <path d="M7 1.5h3v4h4v3h-4v4H7v-4H3v-3h4v-4Z" fill="#fff" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span style={{ color: 'var(--tinta)' }} className="text-[16px] font-bold">
                {clinica.marca.nombre}
              </span>
              <span style={{ color: 'var(--tinta-tenue)' }} className="mt-0.5 text-[10px]">
                {clinica.marca.bajada}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {clinica.nav.map((n) => (
              <a
                key={n.t}
                href="#"
                style={{ color: 'var(--tinta-media)' }}
                className="text-[13.5px] transition-colors duration-200 hover:text-[var(--verde)]"
              >
                {n.t}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              style={{ background: 'var(--verde)' }}
              className="hidden rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-lg sm:block"
              // La sombra en el hover usa el verde: una sombra negra
              // sobre fondo blanco se ve sucia.
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 20px -6px rgba(13,148,136,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = ''
              }}
            >
              {clinica.cta}
            </a>

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
                    className="block h-[2px] w-[22px] rounded-full"
                  />
                ))}
              </span>
            </button>
          </div>
        </div>

        {abierto ? (
          <nav
            style={{ borderTopColor: 'var(--linea)' }}
            className="border-t lg:hidden"
          >
            {clinica.nav.map((n) => (
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
                style={{ background: 'var(--verde)' }}
                className="block rounded-lg py-3 text-center text-[14px] font-semibold text-white"
              >
                {clinica.cta}
              </a>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
