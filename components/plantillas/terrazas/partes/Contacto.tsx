'use client'

import { terrazas } from '@/content/plantillas/terrazas'

/** Pedido de tasación: formulario de tres campos y datos de la oficina.
 *
 *  Tres campos y no ocho. En una inmobiliaria el formulario existe para
 *  conseguir la visita, no para calificar al cliente: nombre, teléfono
 *  y zona alcanzan para llamar, y cada campo extra es una razón para
 *  abandonarlo.
 *
 *  **No hay backend**, así que el `onSubmit` corta el envío con
 *  `preventDefault`. Sin eso el formulario navegaría a la misma URL con
 *  los datos en la query y la plantilla se recargaría en blanco dentro
 *  del iframe, que es la forma más rápida de que un mockup se vea roto.
 *
 *  Tampoco muestra un estado de "enviado": simular una confirmación que
 *  no ocurrió es mentirle a quien prueba la demostración.
 *
 *  Los datos de la oficina van al lado y no debajo: el teléfono y el
 *  horario son la alternativa real al formulario, y quien está decidido
 *  a llamar no debería tener que scrollear más allá del form.
 *
 *  `'use client'` por el `onSubmit`.
 */
export default function Contacto() {
  const { contacto } = terrazas
  const { oficina } = contacto

  const estiloCampo = {
    borderColor: 'var(--linea)',
    background: 'var(--blanco)',
    color: 'var(--tinta)',
  }

  const campos = [
    { k: 'nombre', etiqueta: contacto.campos.nombre, tipo: 'text' },
    { k: 'tel', etiqueta: contacto.campos.tel, tipo: 'tel' },
    { k: 'zona', etiqueta: contacto.campos.zona, tipo: 'text' },
  ]

  return (
    <section style={{ background: 'var(--blanco)' }}>
      <div className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-9 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <h2
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="max-w-[22ch] text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
            >
              {contacto.titulo}
            </h2>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-3 max-w-[48ch] text-[14.5px] leading-relaxed"
            >
              {contacto.bajada}
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="mt-7">
              <div className="grid gap-4 sm:grid-cols-3">
                {campos.map((c) => (
                  <label key={c.k} className="flex flex-col gap-1.5">
                    <span
                      style={{ color: 'var(--tinta-tenue)' }}
                      className="text-[10.5px] font-semibold uppercase tracking-[0.1em]"
                    >
                      {c.etiqueta}
                    </span>
                    <input
                      type={c.tipo}
                      name={c.k}
                      style={estiloCampo}
                      className="rounded-sm border px-3 py-2.5 text-[13.5px] outline-none transition-colors duration-200 focus:border-[var(--bronce)]"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="submit"
                  style={{ background: 'var(--bronce)' }}
                  className="rounded-sm px-6 py-3 text-[13.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px"
                >
                  {contacto.cta}
                </button>
                <p style={{ color: 'var(--tinta-tenue)' }} className="text-[12px]">
                  {contacto.nota}
                </p>
              </div>
            </form>
          </div>

          {/* La oficina. El bronce claro la separa del formulario sin
              necesitar un borde más. */}
          <div
            style={{ background: 'var(--bronce-claro)' }}
            // `self-start`: sin eso el bloque estira su alto al de la
            // columna del formulario y queda un rectángulo con la
            // mitad de abajo vacía.
            className="self-start rounded-sm p-6 lg:p-7"
          >
            <h3
              style={{ color: 'var(--bronce)' }}
              className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              {oficina.t}
            </h3>

            <address className="mt-4 not-italic">
              <p
                style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
                className="text-[19px] font-semibold leading-snug"
              >
                {oficina.dir}
              </p>
              <p
                style={{ color: 'var(--tinta-media)' }}
                className="mt-2.5 text-[13px] leading-relaxed"
              >
                {oficina.hora}
              </p>
              <a
                href="#"
                style={{ borderTopColor: 'rgba(154,107,63,0.3)', color: 'var(--tinta)' }}
                className="mt-4 block border-t pt-4 text-[19px] font-semibold tabular-nums transition-colors duration-200 hover:text-[var(--bronce)]"
              >
                {oficina.tel}
              </a>
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}
