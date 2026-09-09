'use client'

import { marquez } from '@/content/plantillas/marquez'

/** El formulario de consulta: cuatro campos y el tipo de consulta.
 *
 *  **El `<select>` de tipo de consulta va sobre fondo claro y con color
 *  explícito.** Es el control que más se rompe en estas plantillas: sin
 *  `color-scheme: light` —que la hoja de `(plantillas)` fija en la
 *  raíz— el navegador lo pinta con la paleta oscura del sistema y queda
 *  un desplegable negro en medio de un formulario blanco. Acá además se
 *  declaran `background` y `color` en el estilo, así el control no
 *  depende solo de esa herencia.
 *
 *  Las opciones son las seis áreas de práctica más "Otra consulta". La
 *  última no es relleno: sin ella, alguien con un caso que no encaja en
 *  la lista abandona el formulario en lugar de elegir el que más se
 *  parezca.
 *
 *  **No hay backend**: el `onSubmit` corta el envío con
 *  `preventDefault`. Sin eso el formulario navegaría a la misma URL con
 *  los datos en la query y la plantilla se recargaría en blanco dentro
 *  del iframe. Tampoco simula una confirmación: mostrar "consulta
 *  enviada" cuando no se envió nada es mentirle a quien prueba la
 *  demostración.
 *
 *  La nota sobre el convenio de honorarios es la advertencia que un
 *  estudio real pone: el formulario no crea relación profesional. Es un
 *  recaudo de ejercicio, no letra chica decorativa.
 *
 *  `'use client'` por el `onSubmit`.
 */
export default function Consulta() {
  const { consulta } = marquez

  const estiloCampo = {
    borderColor: 'var(--linea)',
    background: 'var(--blanco)',
    color: 'var(--tinta)',
    colorScheme: 'light' as const,
  }

  return (
    <section
      style={{ background: 'var(--bronce-tenue)', borderTopColor: 'var(--linea)' }}
      className="border-t"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
          <div>
            <p
              style={{ color: 'var(--bronce)' }}
              className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
            >
              {consulta.volanta}
            </p>
            <h2
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="mt-3 text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
            >
              {consulta.titulo}
            </h2>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.7]"
            >
              {consulta.bajada}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span
                  style={{ color: 'var(--tinta-media)' }}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                >
                  {consulta.campos.nombre}
                </span>
                <input
                  type="text"
                  name="nombre"
                  style={estiloCampo}
                  className="border px-3.5 py-3 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--bronce)]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span
                  style={{ color: 'var(--tinta-media)' }}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                >
                  {consulta.campos.correo}
                </span>
                <input
                  type="email"
                  name="correo"
                  style={estiloCampo}
                  className="border px-3.5 py-3 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--bronce)]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span
                  style={{ color: 'var(--tinta-media)' }}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                >
                  {consulta.campos.tel}
                </span>
                <input
                  type="tel"
                  name="tel"
                  style={estiloCampo}
                  className="border px-3.5 py-3 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--bronce)]"
                />
              </label>

              {/* El select. Mismo estilo que los inputs para que la fila
                  no se rompa: un control nativo con su propia altura al
                  lado de un input desalinea el formulario entero. */}
              <label className="flex flex-col gap-2">
                <span
                  style={{ color: 'var(--tinta-media)' }}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                >
                  {consulta.campos.tipo}
                </span>
                <select
                  name="tipo"
                  defaultValue={consulta.tipos[0]}
                  style={estiloCampo}
                  className="border px-3.5 py-3 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--bronce)]"
                >
                  {consulta.tipos.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 flex flex-col gap-2">
              <span
                style={{ color: 'var(--tinta-media)' }}
                className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
              >
                {consulta.campos.detalle}
              </span>
              <textarea
                name="detalle"
                rows={4}
                style={estiloCampo}
                className="resize-y border px-3.5 py-3 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--bronce)]"
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                style={{ background: 'var(--tinta)' }}
                className="px-7 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--bronce)]"
              >
                {consulta.cta}
              </button>
              <p
                style={{ color: 'var(--tinta-media)' }}
                className="max-w-[38ch] text-[11.5px] leading-snug"
              >
                {consulta.nota}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
