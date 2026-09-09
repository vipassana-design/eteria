import { clinica } from '@/content/plantillas/clinica'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** El cuerpo médico: cuatro profesionales con su matrícula.
 *
 *  **Las iniciales en un círculo, no fotos de stock.** Poner caras de
 *  banco de imágenes como si fueran los médicos de la clínica es
 *  exactamente lo que hace que un sitio de salud se lea como
 *  plantilla —y en un mockup además es engañoso.
 *
 *  El número de matrícula es lo que hace creíble la sección: es un dato
 *  público y verificable que ninguna plantilla genérica incluye.
 */
export default function Equipo() {
  const { equipo } = clinica

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            style={{ color: 'var(--verde)' }}
            className="text-[12px] font-semibold uppercase tracking-[0.1em]"
          >
            {equipo.volanta}
          </p>
          <h2
            style={{ color: 'var(--tinta)' }}
            className="mt-2 text-[26px] font-bold leading-tight lg:text-[32px]"
          >
            {equipo.titulo}
          </h2>
        </div>
        <a
          href="#"
          style={{ color: 'var(--verde)' }}
          className="group inline-flex items-center gap-2 text-[13.5px] font-semibold"
        >
          {equipo.enlace}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <Aparecer
        escalonado={0.07}
        className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {equipo.items.map((m) => (
          <article
            key={m.n}
            style={{ borderColor: 'var(--linea)' }}
            className="group rounded-xl border p-5 transition-colors duration-300 hover:border-[var(--verde)]"
          >
            <span
              style={{ background: 'var(--verde-claro)', color: 'var(--verde-hondo)' }}
              className="grid size-12 place-items-center rounded-full text-[15px] font-bold"
            >
              {m.ini}
            </span>

            <h3
              style={{ color: 'var(--tinta)' }}
              className="mt-3.5 text-[15px] font-semibold leading-snug"
            >
              {m.n}
            </h3>
            <p style={{ color: 'var(--verde)' }} className="mt-1 text-[12.5px] font-medium">
              {m.e}
            </p>
            <p
              style={{ color: 'var(--tinta-tenue)' }}
              className="mt-2 text-[11.5px] tabular-nums"
            >
              {m.m}
            </p>
          </article>
        ))}
      </Aparecer>
    </section>
  )
}
