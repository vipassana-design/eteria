import { marquez } from '@/content/plantillas/marquez'

/** El pie: sede con piso y código postal, horario y contacto.
 *
 *  **La dirección va completa, con piso y código postal.** En un estudio
 *  jurídico la sede es un dato operativo —ahí se firman los convenios y
 *  ahí llegan las cédulas— y una dirección sin piso es la señal de que
 *  el sitio no la tomó de ninguna parte real. Microcentro porteño, que
 *  es donde están los estudios que trabajan con los fueros de la
 *  Ciudad.
 *
 *  El horario aclara que las reuniones son con turno previo: un estudio
 *  no atiende sin cita, y omitirlo genera la visita perdida.
 *
 *  El correo usa el dominio `.test`, reservado por la RFC 2606
 *  justamente para ejemplos: no existe ni puede registrarse. Es el
 *  mismo criterio por el que la barra del navegador queda vacía.
 *
 *  Cierra con la mención al CPACF. En Argentina la matriculación es lo
 *  que habilita el ejercicio, y publicarla es lo que hace que el pie se
 *  lea como el de una firma y no como un footer de plantilla.
 */
export default function Pie() {
  const { pie, marca } = marquez

  return (
    <footer style={{ background: 'var(--tinta)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:gap-16">
          <div>
            <span className="flex items-center gap-3">
              <span
                style={{ background: 'var(--bronce)' }}
                className="block h-8 w-[3px]"
              />
              <span className="flex flex-col leading-none">
                <span
                  style={{ fontFamily: 'var(--serif)' }}
                  className="text-[18px] font-semibold text-white"
                >
                  {marca.nombre}
                </span>
                <span
                  style={{ color: 'var(--bronce)' }}
                  className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.2em]"
                >
                  {marca.bajada}
                </span>
              </span>
            </span>

            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <address className="not-italic">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {pie.sede.t}
                </p>
                <p className="mt-2 text-[14px] font-semibold text-white">
                  {pie.sede.dir}
                </p>
                <p className="mt-1 text-[12.5px] text-white/60">
                  {pie.sede.detalle}
                </p>
              </address>

              <div>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {pie.horario.t}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/75">
                  {pie.horario.d}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {pie.columnas.map((c) => (
              <div key={c.t}>
                <h3 className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  {c.t}
                </h3>
                <ul className="mt-3.5 space-y-2">
                  {c.items.map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-[12.5px] text-white/75 transition-colors duration-200 hover:text-white"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/45">
                {pie.contacto.t}
              </h3>
              <div className="mt-3.5 flex flex-col gap-2">
                <a
                  href="#"
                  className="text-[14px] font-semibold tabular-nums text-white transition-colors duration-200 hover:text-[var(--bronce)]"
                >
                  {pie.contacto.tel}
                </a>
                <a
                  href="#"
                  className="text-[12.5px] text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {pie.contacto.correo}
                </a>
              </div>
            </div>
          </div>
        </div>

        <p
          style={{ borderTopColor: 'rgba(255,255,255,0.12)' }}
          className="mt-10 border-t pt-5 text-[11px] leading-relaxed text-white/45"
        >
          {pie.legal}
        </p>
      </div>
    </footer>
  )
}
