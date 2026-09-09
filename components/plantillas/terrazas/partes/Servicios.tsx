import { terrazas } from '@/content/plantillas/terrazas'
import Aparecer from '@/components/plantillas/comun/Aparecer'
import Cifra from '@/components/plantillas/comun/Cifra'

/** Cómo acompaña la inmobiliaria: tres bloques de texto y las cifras.
 *
 *  **Sin cards y sin iconos.** Un ícono de casita, otro de lupa y otro
 *  de handshake es la firma visual de la plantilla comprada, y acá los
 *  tres servicios ya se distinguen por lo que dicen: el número
 *  ("48 horas"), quién no tiene que estar, con cuántas escribanías se
 *  trabaja. Un ícono genérico arriba de eso solo diluye.
 *
 *  Lo que separa los bloques es un filete en bronce y el número de
 *  orden: estructura tipográfica, que es el registro de una
 *  inmobiliaria establecida.
 *
 *  Las cifras van sobre el bronce claro y cierran la sección con lo
 *  verificable —operaciones cerradas, días hasta la primera visita—
 *  detrás del texto que promete el servicio.
 */
export default function Servicios() {
  const { servicios, cifras } = terrazas

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
      <Aparecer y={20}>
        <p
          style={{ color: 'var(--bronce)' }}
          className="text-[11.5px] font-semibold uppercase tracking-[0.16em]"
        >
          {servicios.volanta}
        </p>
        <h2
          style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
          className="mt-2 max-w-[24ch] text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
        >
          {servicios.titulo}
        </h2>
      </Aparecer>

      <Aparecer
        escalonado={0.08}
        className="mt-9 grid gap-8 md:grid-cols-3 md:gap-10"
      >
        {servicios.items.map((s, i) => (
          <div key={s.t}>
            {/* El filete y el ordinal, en lugar del ícono. */}
            <span
              style={{ background: 'var(--bronce)' }}
              className="block h-[2px] w-9"
            />
            <p
              style={{ color: 'var(--bronce)' }}
              className="mt-4 text-[11px] font-semibold tabular-nums tracking-[0.1em]"
            >
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="mt-2 text-[20px] font-semibold leading-snug"
            >
              {s.t}
            </h3>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-2.5 text-[14px] leading-relaxed"
            >
              {s.d}
            </p>
          </div>
        ))}
      </Aparecer>

      {/* El fondo va en un div propio y no en `Aparecer`: el compartido
          no acepta `style`, y sumarle la prop lo volvería un componente
          de presentación —justo lo que `comun/` no puede ser. */}
      <div
        style={{ background: 'var(--bronce-claro)' }}
        className="mt-12 rounded-sm p-7 lg:mt-14 lg:p-10"
      >
        <Aparecer y={20}>
          <h3
            style={{ color: 'var(--bronce)' }}
            className="text-[11.5px] font-semibold uppercase tracking-[0.16em]"
          >
            {cifras.titulo}
          </h3>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
            {cifras.items.map((c) => (
              <div key={c.t}>
                <dd
                  style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
                  className="text-[30px] font-semibold leading-none lg:text-[36px]"
                >
                  <Cifra hasta={c.n} sufijo={c.s} separador />
                </dd>
                <dt
                  style={{ color: 'var(--tinta-media)' }}
                  className="mt-2 text-[12.5px] leading-snug"
                >
                  {c.t}
                </dt>
              </div>
            ))}
          </dl>
        </Aparecer>
      </div>
    </section>
  )
}
