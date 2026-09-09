'use client'

import { useState } from 'react'
import { panel } from '@/content/plantillas/panel'

/** La tabla de pedidos: el bloque que decide si el panel se cree.
 *
 *  **Tiene su propio scroll y el header queda fijo.** El contenedor
 *  lleva `overflow-y-auto` y el `<thead>` va `sticky top-0` con fondo
 *  opaco —sin el fondo, las filas se ven pasar por detrás del
 *  encabezado—. Es la mecánica que hace que se lea como aplicación: en
 *  un panel real la tabla scrollea dentro de su card, no arrastra la
 *  página.
 *
 *  Lleva `data-lenis-prevent`, como manda `CLAUDE.md`: Lenis captura el
 *  `wheel` de toda la página, así que sin ese atributo la rueda movería
 *  el sitio de atrás en vez de la tabla. Acá la plantilla corre en su
 *  propio documento dentro del iframe y Lenis no está montado, pero el
 *  atributo va igual: si alguna vez se embebe en un documento con Lenis
 *  —o si la plantilla se monta fuera del iframe— el bug aparece y no es
 *  obvio de dónde viene.
 *
 *  **Los estados de color son cinco y ninguno se repite entre filas
 *  vecinas.** Un panel donde diez de doce pedidos están "Entregado" no
 *  muestra el producto: lo que se demuestra es que la tabla comunica
 *  estado de un vistazo.
 *
 *  El seleccionado se marca con fondo y una barra de acento a la
 *  izquierda. No es solo hover: el click deja la fila marcada, que es
 *  lo que hace una tabla de gestión.
 */
export default function Pedidos({ total }: { total: number }) {
  const { tabla } = panel
  const [elegido, setElegido] = useState<string | null>(null)

  const importe = (n: number) => `$${n.toLocaleString('es-AR')}`

  return (
    <section
      style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
      className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border"
    >
      <div
        style={{ borderBottomColor: 'var(--linea)' }}
        className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b px-3 py-2.5 lg:px-4"
      >
        <h2 className="text-[13px] font-semibold">{tabla.titulo}</h2>
        <span
          style={{ background: 'var(--fondo)', color: 'var(--texto-medio)' }}
          className="rounded-full px-2 py-0.5 text-[10.5px] tabular-nums"
        >
          {tabla.contador(total)}
        </span>
      </div>

      {/* El contenedor con scroll propio. `min-h-[180px]` para que en
          mobile la tabla nunca colapse a nada cuando el alto sobra
          poco. */}
      <div
        data-lenis-prevent
        className="min-h-[180px] flex-1 overflow-y-auto overscroll-contain"
      >
        <table className="w-full border-collapse text-left">
          <thead
            style={{ background: 'var(--superficie)' }}
            className="sticky top-0 z-10"
          >
            <tr style={{ borderBottomColor: 'var(--linea)' }} className="border-b">
              {tabla.columnas.map((c, i) => (
                <th
                  key={c.t}
                  scope="col"
                  style={{ color: 'var(--texto-tenue)', letterSpacing: '0.04em' }}
                  className={`whitespace-nowrap px-3 py-2 text-[9.5px] font-semibold uppercase lg:px-4 ${
                    c.derecha ? 'text-right' : ''
                  } ${
                    // A 390px sobran columnas: se esconden zona y
                    // fecha, que son las que menos hacen falta para
                    // entender la tabla.
                    i === 4 ? 'hidden lg:table-cell' : ''
                  }`}
                >
                  {c.t}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tabla.filas.map((p) => {
              const est = tabla.estados[p.estado]
              const activo = elegido === p.codigo

              return (
                <tr
                  key={p.codigo}
                  onClick={() => setElegido(activo ? null : p.codigo)}
                  aria-selected={activo}
                  style={{
                    borderBottomColor: 'var(--linea-suave)',
                    background: activo ? 'var(--acento-suave)' : 'transparent',
                  }}
                  className="cursor-pointer border-b transition-colors duration-150 last:border-b-0 hover:not-aria-selected:bg-[var(--fondo)]"
                >
                  <td className="relative px-3 py-2.5 lg:px-4">
                    {/* La barra del seleccionado. */}
                    {activo ? (
                      <span
                        style={{ background: 'var(--acento)' }}
                        className="absolute left-0 top-0 h-full w-[3px]"
                      />
                    ) : null}
                    <span
                      style={{ color: 'var(--texto)' }}
                      className="whitespace-nowrap text-[11.5px] font-medium tabular-nums"
                    >
                      {p.codigo}
                    </span>
                    <span
                      style={{ color: 'var(--texto-tenue)' }}
                      className="mt-0.5 block whitespace-nowrap text-[10px] tabular-nums"
                    >
                      {tabla.detalleItems(p.items)}
                    </span>
                  </td>

                  <td className="px-3 py-2.5 lg:px-4">
                    <div className="flex items-center gap-2">
                      {/* Avatar de iniciales: un panel interno no tiene
                          fotos de clientes. */}
                      <span
                        style={{ background: p.color }}
                        className="grid size-6 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white"
                        aria-hidden="true"
                      >
                        {p.iniciales}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[11.5px] font-medium">
                          {p.cliente}
                        </span>
                        <span
                          style={{ color: 'var(--texto-tenue)' }}
                          className="block truncate text-[10px]"
                        >
                          {p.zona}
                        </span>
                      </span>
                    </div>
                  </td>

                  <td
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                    className="whitespace-nowrap px-3 py-2.5 text-right text-[11.5px] font-semibold lg:px-4"
                  >
                    {importe(p.importe)}
                  </td>

                  <td className="px-3 py-2.5 lg:px-4">
                    {/* El badge de estado: punto de color, fondo tenue y
                        el nombre escrito. El color solo no alcanza. */}
                    <span
                      style={{ background: est.fondo, color: est.texto }}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-[3px] text-[10px] font-medium"
                    >
                      <span
                        style={{ background: est.punto }}
                        className="size-1.5 shrink-0 rounded-full"
                      />
                      {p.estado}
                    </span>
                  </td>

                  <td
                    style={{ color: 'var(--texto-tenue)' }}
                    className="hidden whitespace-nowrap px-3 py-2.5 text-[10.5px] tabular-nums lg:table-cell lg:px-4"
                  >
                    {p.cuando}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
