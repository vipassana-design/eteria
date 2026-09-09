'use client'

import { useState } from 'react'
import { vertice } from '@/content/plantillas/vertice'

/** Barra de Vértice: franja de beneficios, buscador ancho y nav con
 *  contadores por categoría.
 *
 *  El buscador va **ancho y al centro**, no como un ícono: en una
 *  tienda de tecnología la búsqueda es el camino principal —la gente
 *  llega sabiendo el modelo que quiere— y esconderla detrás de una lupa
 *  es un error de rubro.
 *
 *  Los contadores en la nav ("Notebooks 84") dicen que hay catálogo
 *  detrás. Es el mismo recurso que las categorías de Atelier, pero acá
 *  van en la barra porque la densidad es el carácter de esta plantilla.
 */
export default function Barra() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Los tres beneficios, rotando visualmente en mobile: en desktop
          entran los tres, en mobile solo el primero. */}
      <div style={{ background: 'var(--azul-hondo)' }}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-8 px-5 py-2 lg:px-8">
          {vertice.aviso.items.map((a, i) => (
            <p
              key={a}
              className={`text-[11.5px] text-white/85 ${i > 0 ? 'hidden lg:block' : ''}`}
            >
              {a}
            </p>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--blanco)', borderBottomColor: 'var(--linea)' }} className="border-b">
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3 lg:gap-7 lg:px-8">
          <a href="#" className="flex shrink-0 items-center gap-2">
            {/* El logo: un vértice dibujado. */}
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M13 2 24 22H2L13 2Z" fill="var(--azul)" />
              <path d="M13 9l5.5 10h-11L13 9Z" fill="var(--blanco)" />
            </svg>
            <span className="flex flex-col leading-none">
              <span style={{ color: 'var(--tinta)' }} className="text-[17px] font-bold tracking-tight">
                {vertice.marca.nombre}
              </span>
            </span>
          </a>

          {/* El buscador, ancho. */}
          <label className="hidden flex-1 lg:block">
            <span className="sr-only">Buscar productos</span>
            <span
              style={{ background: 'var(--papel)', borderColor: 'var(--linea)' }}
              className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 transition-colors duration-200 focus-within:border-[var(--azul)]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="4.8" stroke="var(--tinta-tenue)" strokeWidth="1.4" />
                <path d="M10.2 10.2 14 14" stroke="var(--tinta-tenue)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Buscar entre 637 productos"
                style={{ color: 'var(--tinta)' }}
                className="w-full bg-transparent text-[13.5px] outline-none placeholder:text-[var(--tinta-tenue)]"
              />
            </span>
          </label>

          <div className="ml-auto flex items-center gap-4 lg:ml-0">
            <a
              href="#"
              style={{ color: 'var(--tinta-media)' }}
              className="hidden text-[13px] transition-colors duration-200 hover:text-[var(--azul)] sm:block"
            >
              Mi cuenta
            </a>

            <button type="button" aria-label="Ver el carrito" className="relative">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M2.5 4h2l2 9h9l2-6.5H6" stroke="var(--tinta)" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="8" cy="16.5" r="1.4" fill="var(--tinta)" />
                <circle cx="14.5" cy="16.5" r="1.4" fill="var(--tinta)" />
              </svg>
              <span
                style={{ background: 'var(--azul)' }}
                className="absolute -right-1.5 -top-1 grid size-[16px] place-items-center rounded-full text-[9.5px] font-bold text-white tabular-nums"
              >
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
              className="lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ background: 'var(--tinta)' }} className="block h-[2px] w-[21px] rounded-full" />
                ))}
              </span>
            </button>
          </div>
        </div>

        {/* La nav de categorías, con sus contadores. */}
        <nav
          style={{ borderTopColor: 'var(--linea)' }}
          className="hidden border-t lg:block"
        >
          <div className="mx-auto flex max-w-[1280px] items-center gap-7 px-5 lg:px-8">
            {vertice.nav.map((n, i) => (
              <a
                key={n.t}
                href="#"
                style={{
                  color: i === 0 ? 'var(--azul)' : 'var(--tinta-media)',
                  borderBottomColor: i === 0 ? 'var(--azul)' : 'transparent',
                }}
                className="flex items-center gap-1.5 border-b-2 py-2.5 text-[13px] font-medium transition-colors duration-200 hover:text-[var(--azul)]"
              >
                {n.t}
                <span style={{ color: 'var(--tinta-tenue)' }} className="text-[11px] tabular-nums">
                  {n.n}
                </span>
              </a>
            ))}
          </div>
        </nav>

        {abierto ? (
          <nav style={{ borderTopColor: 'var(--linea)' }} className="border-t lg:hidden">
            <label className="block p-4">
              <span className="sr-only">Buscar productos</span>
              <input
                type="search"
                placeholder="Buscar productos"
                style={{ background: 'var(--papel)', borderColor: 'var(--linea)', color: 'var(--tinta)' }}
                className="w-full rounded-lg border px-3.5 py-2.5 text-[14px] outline-none"
              />
            </label>
            {vertice.nav.map((n) => (
              <a
                key={n.t}
                href="#"
                style={{ borderTopColor: 'var(--linea)', color: 'var(--tinta)' }}
                className="flex items-center justify-between border-t px-5 py-3.5 text-[15px]"
              >
                {n.t}
                <span style={{ color: 'var(--tinta-tenue)' }} className="text-[12px] tabular-nums">
                  {n.n}
                </span>
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  )
}
