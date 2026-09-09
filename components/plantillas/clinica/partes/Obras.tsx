import { clinica } from '@/content/plantillas/clinica'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las obras sociales, en chips.
 *
 *  Es la sección más consultada de un sitio de salud después de los
 *  turnos, y la que ninguna plantilla genérica tiene. Los nombres son
 *  de coberturas reales del país porque es información de servicio, no
 *  uso de marca con fines comerciales: la clínica es ficticia y el
 *  aviso legal lo aclara.
 *
 *  La nota sobre consultas particulares evita el vacío de "¿y si no
 *  tengo ninguna de estas?", que es la pregunta que sigue.
 */
export default function Obras() {
  const { obras } = clinica

  return (
    <section style={{ background: 'var(--verde-claro)' }}>
      <div className="mx-auto max-w-[1240px] px-5 py-11 lg:px-10 lg:py-14">
        <Aparecer y={18}>
          <h2
            style={{ color: 'var(--verde-hondo)' }}
            className="text-[22px] font-bold leading-tight lg:text-[26px]"
          >
            {obras.titulo}
          </h2>
          <p
            style={{ color: 'var(--tinta-media)' }}
            className="mt-2 max-w-[54ch] text-[14px] leading-relaxed"
          >
            {obras.bajada}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {obras.items.map((o) => (
              <li key={o}>
                <span
                  style={{ background: 'var(--papel)', color: 'var(--verde-hondo)' }}
                  className="inline-block rounded-full px-4 py-2 text-[13px] font-semibold shadow-[0_2px_6px_-3px_rgba(15,46,42,0.2)]"
                >
                  {o}
                </span>
              </li>
            ))}
          </ul>

          <p
            style={{ color: 'var(--tinta-media)' }}
            className="mt-5 text-[12.5px]"
          >
            {obras.nota}
          </p>
        </Aparecer>
      </div>
    </section>
  )
}
