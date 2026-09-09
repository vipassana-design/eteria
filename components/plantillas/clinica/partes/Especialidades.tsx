import { clinica } from '@/content/plantillas/clinica'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las seis especialidades, en cards con borde de color.
 *
 *  Acá **sí** van cards, al revés de Atelier: en un sitio de salud la
 *  card separa cada especialidad como una unidad consultable, y eso es
 *  lo que un paciente escanea. Lo que las salva de verse genéricas es
 *  el contador de profesionales por especialidad —un dato que una
 *  plantilla no tiene— y el filete de color que crece al hover.
 */
export default function Especialidades() {
  const { especialidades } = clinica

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            style={{ color: 'var(--verde)' }}
            className="text-[12px] font-semibold uppercase tracking-[0.1em]"
          >
            {especialidades.volanta}
          </p>
          <h2
            style={{ color: 'var(--tinta)' }}
            className="mt-2 text-[26px] font-bold leading-tight lg:text-[32px]"
          >
            {especialidades.titulo}
          </h2>
        </div>

        <a
          href="#"
          style={{ color: 'var(--verde)' }}
          className="group inline-flex items-center gap-2 text-[13.5px] font-semibold"
        >
          {especialidades.enlace}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <Aparecer
        escalonado={0.07}
        className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {especialidades.items.map((e) => (
          <a
            key={e.t}
            href="#"
            style={{ background: 'var(--crudo)' }}
            className="group relative block overflow-hidden rounded-xl p-5 transition-shadow duration-300 hover:shadow-[0_14px_30px_-16px_rgba(15,46,42,0.3)]"
          >
            {/* El filete crece de arriba hacia abajo: es refuerzo, la
                card ya es clickeable. */}
            <span
              style={{ background: 'var(--verde)' }}
              className="absolute left-0 top-0 h-0 w-[3px] transition-[height] duration-300 group-hover:h-full"
            />

            <div className="flex items-start justify-between gap-3">
              <h3
                style={{ color: 'var(--tinta)' }}
                className="text-[16px] font-semibold leading-snug"
              >
                {e.t}
              </h3>
              <span
                style={{ background: 'var(--verde-claro)', color: 'var(--verde-hondo)' }}
                className="shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold tabular-nums"
              >
                {e.n}
              </span>
            </div>

            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-1.5 text-[13px] leading-relaxed"
            >
              {e.d}
            </p>
          </a>
        ))}
      </Aparecer>
    </section>
  )
}
