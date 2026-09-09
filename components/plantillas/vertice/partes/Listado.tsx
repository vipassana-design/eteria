'use client'

import { useState } from 'react'
import { vertice } from '@/content/plantillas/vertice'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** El listado con filtros laterales y el comparador.
 *
 *  Es la sección que decide si la tienda se cree, y lo que la sostiene
 *  es el detalle de cada producto:
 *
 *  - **Precio de lista y precio con transferencia.** Es como se vende
 *    en el país, y una tienda de tecnología que muestra un solo precio
 *    no se lee como local.
 *  - **Stock discriminado por sucursal**, con alguna sin stock. Un
 *    catálogo donde los cuatro están disponibles en las tres sucursales
 *    es una demostración.
 *  - **Specs comparables** entre modelos, con las mismas cinco filas.
 *  - Cuotas con su monto exacto, SKU, puntaje y cantidad de opiniones.
 *
 *  **El comparador funciona.** Se marcan hasta tres modelos y las specs
 *  se muestran lado a lado en una tabla. Es la interacción que más
 *  comunica que la plantilla está viva, y no necesita backend.
 *
 *  Los filtros muestran su estado inicial aplicado —"Kryon" y "16 GB"
 *  marcados, con el contador arriba— porque un panel de filtros vacío
 *  se ve como un control que existe pero no se usa.
 */
const TOPE = 3

export default function Listado() {
  const { productos, listado, comparador } = vertice
  const [comparando, setComparando] = useState<string[]>([])

  const alternar = (sku: string) => {
    setComparando((v) =>
      v.includes(sku) ? v.filter((x) => x !== sku) : v.length < TOPE ? [...v, sku] : v,
    )
  }

  const elegidos = productos.filter((p) => comparando.includes(p.sku))
  const pesos = (n: number) => `$${n.toLocaleString('es-AR')}`

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-10 lg:px-8 lg:py-14">
      <div className="grid gap-7 lg:grid-cols-[240px_1fr] lg:gap-8">
        {/* ── Filtros ── */}
        <aside className="lg:sticky lg:top-[124px] lg:self-start">
          <div
            style={{ background: 'var(--blanco)', borderColor: 'var(--linea)' }}
            className="rounded-xl border p-5"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 style={{ color: 'var(--tinta)' }} className="text-[14px] font-bold">
                {listado.filtros.titulo}
              </h2>
              <button
                type="button"
                style={{ color: 'var(--azul)' }}
                className="text-[11.5px] font-medium"
              >
                {listado.filtros.limpiar}
              </button>
            </div>

            {listado.filtros.grupos.map((g) => (
              <div
                key={g.t}
                style={{ borderTopColor: 'var(--linea)' }}
                className="mt-4 border-t pt-4"
              >
                <h3
                  style={{ color: 'var(--tinta)' }}
                  className="text-[12px] font-semibold uppercase tracking-wider"
                >
                  {g.t}
                </h3>
                <ul className="mt-2.5 space-y-2">
                  {g.items.map((i) => (
                    <li key={i.v}>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <input
                          type="checkbox"
                          defaultChecked={i.on}
                          style={{ accentColor: 'var(--azul)' }}
                          className="size-3.5"
                        />
                        <span
                          style={{ color: i.on ? 'var(--tinta)' : 'var(--tinta-media)' }}
                          className="flex-1 text-[13px]"
                        >
                          {i.v}
                        </span>
                        <span
                          style={{ color: 'var(--tinta-tenue)' }}
                          className="text-[11px] tabular-nums"
                        >
                          {i.n}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div style={{ borderTopColor: 'var(--linea)' }} className="mt-4 border-t pt-4">
              <h3
                style={{ color: 'var(--tinta)' }}
                className="text-[12px] font-semibold uppercase tracking-wider"
              >
                {listado.filtros.precio.t}
              </h3>
              <div className="mt-3">
                <span
                  style={{ background: 'var(--linea)' }}
                  className="relative block h-1 rounded-full"
                >
                  <span
                    style={{ background: 'var(--azul)' }}
                    className="absolute left-0 h-1 w-3/5 rounded-full"
                  />
                  <span
                    style={{ borderColor: 'var(--azul)', background: 'var(--blanco)' }}
                    className="absolute left-[60%] top-1/2 size-3.5 -translate-y-1/2 rounded-full border-2"
                  />
                </span>
                <div
                  style={{ color: 'var(--tinta-media)' }}
                  className="mt-2 flex justify-between text-[11px] tabular-nums"
                >
                  <span>{listado.filtros.precio.min}</span>
                  <span>{listado.filtros.precio.max}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── El listado ── */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                style={{ color: 'var(--azul)' }}
                className="text-[11.5px] font-semibold uppercase tracking-[0.12em]"
              >
                {listado.volanta}
              </p>
              <h2
                style={{ color: 'var(--tinta)' }}
                className="mt-1.5 text-[24px] font-bold leading-tight lg:text-[28px]"
              >
                {listado.titulo}
              </h2>
            </div>

            <label className="flex items-center gap-2">
              <span style={{ color: 'var(--tinta-media)' }} className="text-[12.5px]">
                Ordenar por
              </span>
              <select
                style={{
                  background: 'var(--blanco)',
                  borderColor: 'var(--linea)',
                  color: 'var(--tinta)',
                }}
                className="rounded-lg border px-3 py-2 text-[13px] outline-none"
              >
                {listado.orden.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>

          <Aparecer escalonado={0.06} className="mt-6 space-y-4">
            {productos.map((p) => {
              const enComparacion = comparando.includes(p.sku)
              return (
                <article
                  key={p.sku}
                  style={{
                    background: 'var(--blanco)',
                    borderColor: enComparacion ? 'var(--azul)' : 'var(--linea)',
                  }}
                  className="rounded-xl border p-5 transition-shadow duration-300 hover:shadow-[0_10px_28px_-16px_rgba(15,23,42,0.25)] lg:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          style={{ color: 'var(--tinta-tenue)' }}
                          className="text-[10.5px] uppercase tracking-wider"
                        >
                          {p.marca} · {p.sku}
                        </span>
                        {p.etiqueta ? (
                          <span
                            style={{
                              background: p.etiqueta.startsWith('-')
                                ? 'var(--rojo)'
                                : 'var(--azul-claro)',
                              color: p.etiqueta.startsWith('-') ? '#fff' : 'var(--azul-hondo)',
                            }}
                            className="rounded px-2 py-0.5 text-[10px] font-bold"
                          >
                            {p.etiqueta}
                          </span>
                        ) : null}
                      </div>

                      <h3
                        style={{ color: 'var(--tinta)' }}
                        className="mt-1.5 text-[16px] font-semibold leading-snug lg:text-[17px]"
                      >
                        {p.nombre}
                      </h3>

                      {/* Puntaje y opiniones. */}
                      <p className="mt-1.5 flex items-center gap-1.5">
                        <span className="flex gap-0.5" aria-hidden="true">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <svg key={i} width="11" height="11" viewBox="0 0 11 11">
                              <path
                                d="M5.5 0l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8L0 4l3.8-.6L5.5 0Z"
                                fill={i < Math.round(p.estrellas) ? 'var(--ambar)' : 'var(--linea)'}
                              />
                            </svg>
                          ))}
                        </span>
                        <span
                          style={{ color: 'var(--tinta)' }}
                          className="text-[12px] font-semibold tabular-nums"
                        >
                          {p.estrellas.toLocaleString('es-AR')}
                        </span>
                        <span style={{ color: 'var(--tinta-tenue)' }} className="text-[11.5px]">
                          · {listado.ui.opiniones(p.opiniones)}
                        </span>
                      </p>
                    </div>

                    {/* El precio. */}
                    <div className="shrink-0">
                      <p
                        style={{ color: 'var(--tinta-tenue)' }}
                        className="text-[11.5px] tabular-nums line-through"
                      >
                        {pesos(p.lista)}
                      </p>
                      <p
                        style={{ color: 'var(--tinta)' }}
                        className="text-[21px] font-bold leading-none tabular-nums lg:text-[24px]"
                      >
                        {pesos(p.transferencia)}
                      </p>
                      <p style={{ color: 'var(--verde)' }} className="mt-1 text-[11.5px] font-semibold">
                        {listado.ui.transferencia}
                      </p>
                      <p style={{ color: 'var(--tinta-media)' }} className="mt-1.5 text-[11.5px] tabular-nums">
                        {listado.ui.cuotas(p.cuotas.n, pesos(p.cuotas.monto))}
                      </p>
                    </div>
                  </div>

                  {/* Las specs, en dos columnas. */}
                  <dl
                    style={{ borderTopColor: 'var(--linea)' }}
                    className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1.5 border-t pt-4 sm:grid-cols-2"
                  >
                    {p.specs.map((s) => (
                      <div key={s.t} className="flex items-baseline justify-between gap-3">
                        <dt style={{ color: 'var(--tinta-tenue)' }} className="text-[12px]">
                          {s.t}
                        </dt>
                        <dd
                          style={{ color: 'var(--tinta-media)' }}
                          className="text-right text-[12.5px] font-medium"
                        >
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Stock por sucursal y acciones. */}
                  <div
                    style={{ borderTopColor: 'var(--linea)' }}
                    className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-4"
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                      <span
                        style={{ color: 'var(--tinta-tenue)' }}
                        className="text-[11px] uppercase tracking-wider"
                      >
                        {listado.ui.stock}
                      </span>
                      {p.stock.map((s) => (
                        <span key={s.s} className="flex items-center gap-1.5">
                          <span
                            style={{ background: s.hay ? 'var(--verde)' : 'var(--linea)' }}
                            className="size-1.5 rounded-full"
                          />
                          <span
                            style={{
                              color: s.hay ? 'var(--tinta-media)' : 'var(--tinta-tenue)',
                            }}
                            className={`text-[12px] ${s.hay ? '' : 'line-through'}`}
                          >
                            {s.s}
                          </span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => alternar(p.sku)}
                        aria-pressed={enComparacion}
                        disabled={!enComparacion && comparando.length >= TOPE}
                        style={{
                          borderColor: enComparacion ? 'var(--azul)' : 'var(--linea)',
                          background: enComparacion ? 'var(--azul-claro)' : 'transparent',
                          color: enComparacion ? 'var(--azul-hondo)' : 'var(--tinta-media)',
                        }}
                        className="rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {enComparacion ? listado.ui.comparando : listado.ui.comparar}
                      </button>

                      <button
                        type="button"
                        style={{ background: 'var(--azul)' }}
                        className="rounded-lg px-4 py-2 text-[12.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
                      >
                        {listado.ui.agregar}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </Aparecer>

          {/* ── El comparador ── */}
          <div
            style={{ background: 'var(--blanco)', borderColor: 'var(--linea)' }}
            className="mt-6 rounded-xl border p-5 lg:p-6"
          >
            <h2 style={{ color: 'var(--tinta)' }} className="text-[16px] font-bold">
              {comparador.titulo}
            </h2>
            <p style={{ color: 'var(--tinta-media)' }} className="mt-1 text-[13px]">
              {comparador.bajada}
            </p>

            {elegidos.length === 0 ? (
              <p
                style={{ background: 'var(--papel)', color: 'var(--tinta-tenue)' }}
                className="mt-4 rounded-lg px-4 py-6 text-center text-[13px]"
              >
                {comparador.vacio}
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse">
                  <thead>
                    <tr>
                      <th className="w-[26%]" />
                      {elegidos.map((p) => (
                        <th key={p.sku} className="p-2 text-left align-top">
                          <span
                            style={{ color: 'var(--tinta)' }}
                            className="block text-[12.5px] font-semibold leading-snug"
                          >
                            {p.nombre}
                          </span>
                          <button
                            type="button"
                            onClick={() => alternar(p.sku)}
                            style={{ color: 'var(--azul)' }}
                            className="mt-1 text-[11px] font-medium"
                          >
                            {comparador.quitar}
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Las filas salen del primer elegido: las cinco
                        specs son las mismas en todos los modelos, que es
                        lo que hace posible compararlos. */}
                    {elegidos[0]!.specs.map((s, fila) => (
                      <tr key={s.t} style={{ borderTopColor: 'var(--linea)' }} className="border-t">
                        <th
                          scope="row"
                          style={{ color: 'var(--tinta-tenue)' }}
                          className="p-2 text-left text-[12px] font-normal"
                        >
                          {s.t}
                        </th>
                        {elegidos.map((p) => (
                          <td
                            key={p.sku}
                            style={{ color: 'var(--tinta-media)' }}
                            className="p-2 text-[12.5px] font-medium"
                          >
                            {p.specs[fila]?.v ?? '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr style={{ borderTopColor: 'var(--linea)' }} className="border-t">
                      <th
                        scope="row"
                        style={{ color: 'var(--tinta-tenue)' }}
                        className="p-2 text-left text-[12px] font-normal"
                      >
                        Precio
                      </th>
                      {elegidos.map((p) => (
                        <td
                          key={p.sku}
                          style={{ color: 'var(--tinta)' }}
                          className="p-2 text-[13.5px] font-bold tabular-nums"
                        >
                          {pesos(p.transferencia)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
