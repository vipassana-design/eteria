'use client'

import { useState } from 'react'
import { legajos } from '@/content/plantillas/legajos'

/** La tabla de personal con el filtro por área.
 *
 *  **El filtro es la interacción de la plantilla y filtra de verdad.**
 *  Recorta las filas y recalcula el recuento del encabezado. Cada chip
 *  lleva además la cantidad de personas de su área, así que se sabe qué
 *  va a pasar antes de tocarlo: un filtro donde hay que probar para
 *  saber si hay algo es un filtro a medio hacer.
 *
 *  No hay `overflow-y-auto` acá y es deliberado: esta plantilla
 *  scrollea, así que la tabla crece y el documento se encarga. Un
 *  scroll interno sobre una página que scrollea da el problema de los
 *  dos scrolls anidados, que es lo que hace sentir roto un sistema. Los
 *  paneles one page hacen lo contrario porque no tienen alternativa.
 *
 *  Sí hay `overflow-x-auto` en el contenedor de la tabla: a 390px cinco
 *  columnas no entran. Desborda **la tabla**, no el documento, que es
 *  la diferencia que importa.
 *
 *  El estado vacío existe aunque con estos datos no se pueda alcanzar:
 *  un sistema sin estado vacío está a medio hacer, y si mañana se
 *  agrega un área sin gente el bloque ya está.
 */
export default function Personal() {
  const { tabla } = legajos
  const [area, setArea] = useState(tabla.areas[0] as string)

  const todas = tabla.areas[0]
  const filas =
    area === todas ? tabla.personas : tabla.personas.filter((p) => p.area === area)

  // Cuánta gente hay por área, para el número de cada chip.
  const cuantos = (a: string) =>
    a === todas ? tabla.personas.length : tabla.personas.filter((p) => p.area === a).length

  return (
    <section
      style={{ background: 'var(--superficie)', borderColor: 'var(--linea)' }}
      className="overflow-hidden rounded-xl border"
    >
      <div
        style={{ borderBottomColor: 'var(--linea)' }}
        className="border-b px-3.5 py-3 lg:px-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[14px] font-semibold">{tabla.titulo}</h2>
          <span
            style={{ background: 'var(--fondo)', color: 'var(--texto-medio)' }}
            className="rounded-full px-2 py-0.5 text-[11px] tabular-nums"
          >
            {tabla.contador(filas.length, tabla.personas.length)}
          </span>
        </div>

        {/* Los chips del filtro. En mobile scrollean en su propia fila:
            seis áreas no entran en 390px. */}
        <div
          data-lenis-prevent
          className="-mx-3.5 mt-2.5 overflow-x-auto px-3.5 lg:mx-0 lg:px-0"
        >
          <div
            role="group"
            aria-label={tabla.filtroTitulo}
            className="flex w-max min-w-full items-center gap-1.5"
          >
            {tabla.areas.map((a) => {
              const activo = a === area
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => setArea(a)}
                  aria-pressed={activo}
                  style={{
                    background: activo ? 'var(--acento)' : 'var(--fondo)',
                    color: activo ? '#FFFFFF' : 'var(--texto-medio)',
                    borderColor: activo ? 'var(--acento)' : 'var(--linea)',
                  }}
                  className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors duration-200 hover:not-aria-pressed:border-[var(--texto-tenue)]"
                >
                  {a}
                  {/* La cantidad por área: se sabe qué va a traer el
                      filtro antes de tocarlo. */}
                  <span
                    style={{
                      color: activo ? 'rgba(255,255,255,0.75)' : 'var(--texto-tenue)',
                    }}
                    className="text-[10px] tabular-nums"
                  >
                    {cuantos(a)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {filas.length === 0 ? (
        <p
          style={{ color: 'var(--texto-tenue)' }}
          className="px-4 py-10 text-center text-[12.5px]"
        >
          {tabla.vacio}
        </p>
      ) : (
        <div data-lenis-prevent className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr style={{ borderBottomColor: 'var(--linea)' }} className="border-b">
                {tabla.columnas.map((c, i) => (
                  <th
                    key={c.t}
                    scope="col"
                    style={{ color: 'var(--texto-tenue)', letterSpacing: '0.04em' }}
                    className={`whitespace-nowrap px-3 py-2 text-[9.5px] font-semibold uppercase lg:px-4 ${
                      // Ingreso y antigüedad se esconden en mobile: la
                      // antigüedad ya va bajo el nombre de la persona.
                      i === 2 || i === 3 ? 'hidden lg:table-cell' : ''
                    }`}
                  >
                    {c.t}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filas.map((p) => {
                const est = tabla.estados[p.estado]
                return (
                  <tr
                    key={p.legajo}
                    style={{ borderBottomColor: 'var(--linea-suave)' }}
                    className="border-b transition-colors duration-150 last:border-b-0 hover:bg-[var(--fondo)]"
                  >
                    <td className="px-3 py-2.5 lg:px-4">
                      <div className="flex items-center gap-2.5">
                        {/* Iniciales en círculo: el legajo no tiene foto
                            cargada, que es el caso normal. */}
                        <span
                          style={{ background: p.color }}
                          className="grid size-8 shrink-0 place-items-center rounded-full text-[10.5px] font-semibold text-white"
                          aria-hidden="true"
                        >
                          {p.iniciales}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[12.5px] font-medium leading-tight">
                            {p.nombre}
                          </p>
                          <p
                            style={{ color: 'var(--texto-tenue)' }}
                            className="mt-0.5 truncate text-[10.5px] leading-tight"
                          >
                            {p.puesto} · Legajo{' '}
                            <span className="tabular-nums">{p.legajo}</span>
                          </p>
                          {/* En mobile la antigüedad sube acá, porque su
                              columna está escondida. */}
                          <p
                            style={{ color: 'var(--texto-tenue)' }}
                            className="mt-0.5 text-[10px] tabular-nums lg:hidden"
                          >
                            {p.antiguedad} · {p.area}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-2.5 lg:px-4">
                      <span
                        style={{ color: 'var(--texto-medio)' }}
                        className="whitespace-nowrap text-[11.5px]"
                      >
                        {p.area}
                      </span>
                      <span
                        style={{ color: 'var(--texto-tenue)' }}
                        className="mt-0.5 block whitespace-nowrap text-[10px]"
                      >
                        {p.modalidad}
                      </span>
                    </td>

                    <td
                      style={{ color: 'var(--texto-medio)' }}
                      className="hidden whitespace-nowrap px-3 py-2.5 text-[11.5px] tabular-nums lg:table-cell lg:px-4"
                    >
                      {p.ingreso}
                    </td>

                    <td
                      style={{ color: 'var(--texto-medio)' }}
                      className="hidden whitespace-nowrap px-3 py-2.5 text-[11.5px] tabular-nums lg:table-cell lg:px-4"
                    >
                      {p.antiguedad}
                    </td>

                    <td className="px-3 py-2.5 lg:px-4">
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
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
