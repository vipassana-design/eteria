'use client'

import { useState } from 'react'
import Image from 'next/image'
import { atelier } from '@/content/plantillas/atelier'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** La grilla de productos: la sección que decide si la tienda se cree.
 *
 *  Lo que la hace real no es la técnica, son los estados. Cada producto
 *  tiene los suyos y ninguno se repite: uno con descuento y su precio
 *  anterior tachado, uno con talle S agotado, uno con dos talles
 *  agotados y etiqueta de últimas unidades, uno nuevo con stock
 *  completo. Un catálogo donde los cuatro están disponibles y a precio
 *  redondo se lee como demostración.
 *
 *  **Los talles son interactivos y el estado es real.** Se puede elegir
 *  uno, y los agotados no se pueden seleccionar —van tachados y con
 *  `disabled`. Es la interacción que más comunica que la plantilla está
 *  viva, y funciona sin backend.
 *
 *  El hover revela "Agregar" sobre la foto, pero el precio y los talles
 *  están siempre visibles: con `prefers-reduced-motion` el
 *  `!important` de `globals.css` anula la transición, así que nada
 *  esencial puede depender de ella (restricción de la Etapa 0).
 */
export default function Grilla() {
  const { grilla } = atelier

  // Un talle elegido por producto. Arranca en el primero disponible,
  // que es lo que hace una tienda real.
  const [elegidos, setElegidos] = useState<Record<number, string>>(() =>
    Object.fromEntries(
      grilla.items.map((p, i) => [i, p.talles.find((t) => t.hay)?.t ?? '']),
    ),
  )

  const precio = (n: number) => `$${n.toLocaleString('es-AR')}`

  return (
    <section
      style={{ borderTopColor: 'var(--linea)' }}
      className="border-t"
    >
      <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-10 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              style={{ color: 'var(--terracota)', letterSpacing: '0.2em' }}
              className="text-[10px] uppercase"
            >
              {grilla.volanta}
            </p>
            <h2
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="mt-2 text-[30px] leading-tight lg:text-[38px]"
            >
              {grilla.titulo}
            </h2>
          </div>

          <a
            href="#"
            style={{ color: 'var(--tinta-media)' }}
            className="group relative text-[12px] uppercase tracking-[0.1em]"
          >
            {grilla.enlace}
            <span
              style={{ background: 'var(--terracota)' }}
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            />
          </a>
        </div>

        <Aparecer
          escalonado={0.08}
          className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6"
        >
          {grilla.items.map((p, i) => (
            <article key={p.nombre} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={p.foto}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />

                {p.etiqueta ? (
                  <span
                    style={{
                      background: p.antes ? 'var(--terracota)' : 'var(--tinta)',
                      letterSpacing: '0.08em',
                    }}
                    className="absolute left-3 top-3 px-2.5 py-1 text-[9px] uppercase text-white"
                  >
                    {p.etiqueta}
                  </span>
                ) : null}

                {/* Favorito: un estado que toda tienda tiene. El
                    segundo producto va marcado. */}
                <button
                  type="button"
                  aria-label={`Guardar ${p.nombre}`}
                  className="absolute right-3 top-3 grid size-8 place-items-center bg-white/85 opacity-0 transition-opacity duration-300 focus-visible:opacity-100 group-hover:opacity-100"
                >
                  <svg width="14" height="13" viewBox="0 0 14 13" fill="none" aria-hidden="true">
                    <path
                      d="M7 12C3.6 9.4 1 7.5 1 5.1 1 3.3 2.4 2 4 2c1.2 0 2.3.6 3 1.6C7.7 2.6 8.8 2 10 2c1.6 0 3 1.3 3 3.1 0 2.4-2.6 4.3-6 6.9Z"
                      fill={i === 1 ? 'var(--terracota)' : 'none'}
                      stroke={i === 1 ? 'var(--terracota)' : 'var(--tinta)'}
                      strokeWidth="1.1"
                    />
                  </svg>
                </button>

                {/* "Agregar" al hover. Es refuerzo: el producto ya es
                    clickeable y el precio está abajo. */}
                <button
                  type="button"
                  style={{ background: 'var(--papel)', color: 'var(--tinta)' }}
                  className="absolute inset-x-3 bottom-3 translate-y-2 py-2.5 text-[11px] uppercase tracking-[0.1em] opacity-0 transition-all duration-300 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Agregar
                </button>
              </div>

              <div className="mt-3.5">
                <h3
                  style={{ color: 'var(--tinta)' }}
                  className="text-[13px] leading-snug lg:text-[14px]"
                >
                  {p.nombre}
                </h3>
                <p
                  style={{ color: 'var(--tinta-tenue)' }}
                  className="mt-0.5 text-[11px]"
                >
                  {p.detalle}
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span
                    style={{ color: 'var(--tinta)' }}
                    className="text-[14px] tabular-nums lg:text-[15px]"
                  >
                    {precio(p.precio)}
                  </span>
                  {p.antes ? (
                    <span
                      style={{ color: 'var(--tinta-tenue)' }}
                      className="text-[11px] tabular-nums line-through"
                    >
                      {precio(p.antes)}
                    </span>
                  ) : null}
                </div>

                {/* Los talles, con el stock real. Los agotados van
                    tachados y deshabilitados: es el detalle que hace
                    que se lea como una tienda con inventario. */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.talles.map((t) => {
                    const activo = elegidos[i] === t.t
                    return (
                      <button
                        key={t.t}
                        type="button"
                        disabled={!t.hay}
                        onClick={() => setElegidos((v) => ({ ...v, [i]: t.t }))}
                        aria-pressed={activo}
                        aria-label={
                          t.hay ? `Talle ${t.t}` : `Talle ${t.t}, sin stock`
                        }
                        style={{
                          borderColor: activo ? 'var(--tinta)' : 'var(--linea)',
                          background: activo ? 'var(--tinta)' : 'transparent',
                          color: !t.hay
                            ? 'var(--tinta-tenue)'
                            : activo
                              ? 'var(--papel)'
                              : 'var(--tinta-media)',
                        }}
                        className={`size-7 border text-[10px] transition-colors duration-200 ${
                          t.hay
                            ? 'cursor-pointer hover:border-current'
                            : 'cursor-not-allowed line-through opacity-55'
                        }`}
                      >
                        {t.t}
                      </button>
                    )
                  })}
                </div>

                {/* Los colores disponibles. */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  {p.colores.map((c, j) => (
                    <span
                      key={c}
                      style={{
                        background: c,
                        outlineColor: j === 0 ? 'var(--tinta)' : 'transparent',
                      }}
                      className="size-3 rounded-full outline outline-1 outline-offset-2"
                    />
                  ))}
                  <span
                    style={{ color: 'var(--tinta-tenue)' }}
                    className="ml-1 text-[10px]"
                  >
                    {p.colores.length} colores
                  </span>
                </div>
              </div>
            </article>
          ))}
        </Aparecer>
      </div>
    </section>
  )
}
