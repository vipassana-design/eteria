'use client'

import { useState } from 'react'
import { feria } from '@/content/plantillas/feria'

/** Barra de Feria: buscador dominante y menú de categorías.
 *
 *  El buscador ocupa el centro y es lo más grande de la barra: en un
 *  marketplace con 48.000 productos de 1.240 tiendas, buscar es la
 *  única forma razonable de llegar a algo. Navegar por categorías es el
 *  camino secundario, y por eso van en una franja aparte.
 *
 *  El acceso a "Vender" va destacado en la barra: es la mitad del
 *  negocio y en los marketplaces reales siempre está a la vista.
 */
export default function Barra() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div style={{ background: 'var(--blanco)' }}>
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-5 py-3 lg:gap-6 lg:px-8">
          <a href="#" className="flex shrink-0 items-center gap-2">
            {/* Dos toldos de feria, dibujados. */}
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <path d="M3 10h20v13H3V10Z" fill="var(--naranja-claro)" />
              <path d="M3 10 6 3h14l3 7H3Z" fill="var(--naranja)" />
              <path d="M10 10v13M16 10v13" stroke="var(--naranja)" strokeWidth="1.3" />
            </svg>
            <span
              style={{ color: 'var(--tinta)' }}
              className="text-[18px] font-bold tracking-tight"
            >
              {feria.marca.nombre}
            </span>
          </a>

          {/* El buscador, dominante. */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="hidden flex-1 sm:flex"
          >
            <label className="flex flex-1">
              <span className="sr-only">{feria.hero.buscador.campo}</span>
              <input
                type="search"
                placeholder={feria.hero.buscador.campo}
                style={{
                  borderColor: 'var(--linea)',
                  background: 'var(--papel)',
                  color: 'var(--tinta)',
                }}
                className="w-full rounded-l-lg border border-r-0 px-4 py-2.5 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--naranja)]"
              />
            </label>
            <button
              type="submit"
              style={{ background: 'var(--naranja)' }}
              aria-label={feria.hero.buscador.cta}
              className="rounded-r-lg px-5 transition-opacity duration-200 hover:opacity-90"
            >
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="4.8" stroke="#fff" strokeWidth="1.6" />
                <path d="M10.2 10.2 14 14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          <div className="ml-auto flex items-center gap-3 sm:ml-0 sm:gap-5">
            <a
              href="#"
              style={{ borderColor: 'var(--naranja)', color: 'var(--naranja)' }}
              className="hidden rounded-lg border px-3.5 py-2 text-[12.5px] font-semibold transition-colors duration-200 hover:bg-[var(--naranja-claro)] lg:block"
            >
              Vender
            </a>

            <a
              href="#"
              style={{ color: 'var(--tinta-media)' }}
              className="hidden text-[13px] lg:block"
            >
              Ingresar
            </a>

            <button type="button" aria-label="Ver el carrito" className="relative">
              <svg width="21" height="21" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M2.5 4h2l2 9h9l2-6.5H6" stroke="var(--tinta)" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="8" cy="16.5" r="1.4" fill="var(--tinta)" />
                <circle cx="14.5" cy="16.5" r="1.4" fill="var(--tinta)" />
              </svg>
              <span
                style={{ background: 'var(--naranja)' }}
                className="absolute -right-1.5 -top-1 grid size-[16px] place-items-center rounded-full text-[9.5px] font-bold text-white tabular-nums"
              >
                1
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

        {/* Buscador de mobile, debajo. */}
        <form onSubmit={(e) => e.preventDefault()} className="px-5 pb-3 sm:hidden">
          <label className="flex">
            <span className="sr-only">{feria.hero.buscador.campo}</span>
            <input
              type="search"
              placeholder="Buscar productos"
              style={{ borderColor: 'var(--linea)', background: 'var(--papel)', color: 'var(--tinta)' }}
              className="w-full rounded-lg border px-4 py-2.5 text-[14px] outline-none"
            />
          </label>
        </form>
      </div>

      {/* La franja de categorías. */}
      <div
        style={{ background: 'var(--papel)', borderBottomColor: 'var(--linea)' }}
        className="border-b"
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-5 overflow-x-auto px-5 py-2.5 lg:px-8">
          {feria.categorias.map((c, i) => (
            <a
              key={c.t}
              href="#"
              style={{ color: i === 0 ? 'var(--naranja)' : 'var(--tinta-media)' }}
              className="flex shrink-0 items-baseline gap-1.5 text-[12.5px] font-medium transition-colors duration-200 hover:text-[var(--naranja)]"
            >
              {c.t}
              <span style={{ color: 'var(--tinta-tenue)' }} className="text-[10.5px] tabular-nums">
                {c.n.toLocaleString('es-AR')}
              </span>
            </a>
          ))}
        </div>
      </div>

      {abierto ? (
        <nav
          style={{ background: 'var(--blanco)', borderBottomColor: 'var(--linea)' }}
          className="border-b lg:hidden"
        >
          {feria.nav.map((n) => (
            <a
              key={n.t}
              href="#"
              style={{ borderTopColor: 'var(--linea)', color: 'var(--tinta)' }}
              className="block border-t px-5 py-3.5 text-[15px]"
            >
              {n.t}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
