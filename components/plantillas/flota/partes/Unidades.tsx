'use client'

import { flota } from '@/content/plantillas/flota'

/** La lista lateral de vehículos, con su scroll propio.
 *
 *  **Es el otro extremo de la interacción del mapa.** Click acá resalta
 *  en el mapa y viceversa: el estado vive en `Flota.tsx` y las dos
 *  partes lo leen, así que nunca pueden mostrar cosas distintas. Que el
 *  click funcione en los dos sentidos es lo que hace que se sienta un
 *  producto y no dos bloques que comparten paleta.
 *
 *  Lleva `data-lenis-prevent` por la razón que explica `CLAUDE.md`: sin
 *  el atributo, un contenedor con scroll propio pierde la rueda si hay
 *  Lenis en el documento. Acá corre en su propio iframe sin Lenis, pero
 *  el atributo va igual: si alguna vez se monta fuera, el bug aparece y
 *  es de los que cuestan encontrar.
 *
 *  El progreso de la hoja de ruta va como barra **y** como texto
 *  ("7 de 12 paradas"). La barra sola no es información accesible.
 */
interface Props {
  elegido: string | null
  alElegir: (id: string | null) => void
}

export default function Unidades({ elegido, alElegir }: Props) {
  const { lista } = flota
  const enCalle = lista.vehiculos.filter((v) => v.estado !== 'planta').length

  return (
    <section
      style={{ background: 'var(--superficie)', borderColor: 'var(--borde)' }}
      className="flex min-h-0 flex-col overflow-hidden rounded-xl border lg:flex-[1.35]"
    >
      <div
        style={{ borderBottomColor: 'var(--borde)' }}
        className="shrink-0 border-b px-3 py-2.5"
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[13px] font-semibold">{lista.titulo}</h2>
          <span
            style={{ background: 'var(--superficie-alta)', color: 'var(--texto-medio)' }}
            className="rounded-full px-2 py-0.5 text-[10px] tabular-nums"
          >
            {lista.contador(enCalle, lista.vehiculos.length)}
          </span>
        </div>
        {/* La pista de la interacción. Va escrita: que el click resalte
            en el mapa no se descubre solo. */}
        <p
          style={{ color: 'var(--texto-tenue)' }}
          className="mt-0.5 text-[10px]"
        >
          {lista.pista}
        </p>
      </div>

      <div
        data-lenis-prevent
        className="min-h-[200px] flex-1 overflow-y-auto overscroll-contain p-2"
      >
        <ul className="flex flex-col gap-1.5">
          {lista.vehiculos.map((v) => {
            const est = lista.estados[v.estado]
            const activo = elegido === v.id
            const avance = Math.round((v.entregadas / v.paradas) * 100)

            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => alElegir(activo ? null : v.id)}
                  aria-pressed={activo}
                  style={{
                    background: activo ? 'var(--acento-suave)' : 'transparent',
                    borderColor: activo ? 'var(--acento)' : 'var(--borde)',
                  }}
                  className="w-full cursor-pointer rounded-lg border p-2.5 text-left transition-colors duration-200 hover:not-aria-pressed:bg-white/[0.035]"
                >
                  <div className="flex items-start gap-2.5">
                    {/* Iniciales del chofer, con el color del estado en
                        el anillo: dos datos en un elemento. */}
                    <span
                      style={{
                        background: est.fondo,
                        color: est.color,
                        boxShadow: `inset 0 0 0 1.5px ${est.color}`,
                      }}
                      className="grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-semibold"
                      aria-hidden="true"
                    >
                      {v.iniciales}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                          className="truncate text-[12px] font-semibold"
                        >
                          {v.patente}
                        </span>
                        <span
                          style={{ color: est.color }}
                          className="shrink-0 whitespace-nowrap text-[10px] font-medium"
                        >
                          {est.t}
                        </span>
                      </div>

                      <p
                        style={{ color: 'var(--texto-medio)' }}
                        className="mt-0.5 truncate text-[10.5px]"
                      >
                        {v.chofer}
                      </p>

                      <div className="mt-1.5 flex items-baseline justify-between gap-2">
                        <span
                          style={{ color: 'var(--texto-tenue)' }}
                          className="truncate text-[10px]"
                        >
                          {v.destino}
                        </span>
                        <span
                          style={{
                            color: 'var(--texto)',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                          className="shrink-0 whitespace-nowrap text-[10.5px] font-medium"
                        >
                          {v.eta}
                        </span>
                      </div>

                      {/* El progreso: barra más texto. */}
                      <div className="mt-1.5 flex items-center gap-2">
                        <span
                          style={{ background: 'rgba(255,255,255,0.07)' }}
                          className="h-1 min-w-0 flex-1 overflow-hidden rounded-full"
                        >
                          <span
                            style={{ background: est.color, width: `${avance}%` }}
                            className="block h-full rounded-full"
                          />
                        </span>
                        <span
                          style={{
                            color: 'var(--texto-tenue)',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                          className="shrink-0 text-[9.5px]"
                        >
                          {lista.progreso(v.entregadas, v.paradas)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
