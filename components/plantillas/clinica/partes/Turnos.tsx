'use client'

import { useState } from 'react'
import { clinica } from '@/content/plantillas/clinica'

/** El buscador de turnos: la interacción real de esta plantilla.
 *
 *  No hay backend, pero **el selector de especialidad cambia el
 *  resultado**: cada una tiene su próxima fecha y su profesional. Es lo
 *  que hace que el sitio se sienta conectado a algo en lugar de ser una
 *  maqueta con controles decorativos.
 *
 *  Los `<select>` son nativos y eso importa técnicamente: son el caso
 *  que verifica que `color-scheme: light` funciona dentro del iframe.
 *  Sin el reset de la Etapa 0 se renderizarían oscuros sobre el fondo
 *  claro de la plantilla.
 *
 *  El resultado está siempre visible —no aparece al apretar el botón—
 *  porque con `prefers-reduced-motion` la transición se anula y nada
 *  esencial puede depender de ella.
 */
export default function Turnos() {
  const { turnos, especialidades } = clinica
  const [especialidad, setEspecialidad] = useState(especialidades.items[0]!.t)

  const resultado =
    turnos.resultado.porEspecialidad[especialidad] ??
    turnos.resultado.porEspecialidad['Clínica médica']!

  const estiloCampo = {
    borderColor: 'var(--linea)',
    background: 'var(--papel)',
    color: 'var(--tinta)',
  }

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
      <div
        style={{ background: 'var(--verde-hondo)' }}
        className="overflow-hidden rounded-2xl"
      >
        <div className="grid gap-8 p-7 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:p-10">
          <div>
            <h2 className="text-[24px] font-bold leading-tight text-white lg:text-[28px]">
              {turnos.titulo}
            </h2>
            <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-white/70">
              {turnos.bajada}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11.5px] font-medium text-white/70">
                  {turnos.campos.especialidad}
                </span>
                <select
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  style={estiloCampo}
                  className="rounded-lg border px-3 py-2.5 text-[13.5px] outline-none"
                >
                  {especialidades.items.map((e) => (
                    <option key={e.t} value={e.t}>
                      {e.t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[11.5px] font-medium text-white/70">
                  {turnos.campos.profesional}
                </span>
                <select style={estiloCampo} className="rounded-lg border px-3 py-2.5 text-[13.5px] outline-none">
                  <option>Cualquiera</option>
                  <option>{resultado.quien}</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[11.5px] font-medium text-white/70">
                  {turnos.campos.obra}
                </span>
                <select style={estiloCampo} className="rounded-lg border px-3 py-2.5 text-[13.5px] outline-none">
                  {clinica.obras.items.slice(0, 5).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* El resultado: cambia con la especialidad elegida. */}
          <div
            style={{ background: 'rgba(255,255,255,0.08)' }}
            className="flex flex-col justify-between gap-5 rounded-xl p-5 lg:p-6"
          >
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/55">
                {turnos.resultado.titulo}
              </p>
              <p className="mt-2 text-[22px] font-bold leading-tight text-white lg:text-[25px]">
                {resultado.cuando}
              </p>
              <p className="mt-1.5 text-[13.5px] text-white/70">
                {resultado.quien} · {especialidad}
              </p>
            </div>

            <a
              href="#"
              style={{ background: '#5EEAD4', color: 'var(--verde-hondo)' }}
              className="rounded-lg py-3 text-center text-[13.5px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
            >
              {turnos.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
