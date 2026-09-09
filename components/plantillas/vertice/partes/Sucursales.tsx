import { vertice } from '@/content/plantillas/vertice'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las tres sucursales.
 *
 *  Conecta con el stock del listado: ahí se muestra qué hay en cada
 *  local, acá se dice dónde está cada uno. Esa continuidad —el mismo
 *  dato usado dos veces con sentido distinto— es lo que hace que el
 *  sitio se lea como un sistema y no como secciones sueltas.
 */
export default function Sucursales() {
  const { sucursales } = vertice

  return (
    <section style={{ background: 'var(--blanco)' }}>
      <div className="mx-auto max-w-[1280px] px-5 py-11 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div>
            <p
              style={{ color: 'var(--azul)' }}
              className="text-[11.5px] font-semibold uppercase tracking-[0.12em]"
            >
              {sucursales.volanta}
            </p>
            <h2
              style={{ color: 'var(--tinta)' }}
              className="mt-1.5 text-[24px] font-bold leading-tight lg:text-[30px]"
            >
              {sucursales.titulo}
            </h2>
            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-3 max-w-[46ch] text-[14px] leading-relaxed"
            >
              {sucursales.bajada}
            </p>
          </div>

          <Aparecer escalonado={0.08} className="grid gap-4 sm:grid-cols-3">
            {sucursales.items.map((s) => (
              <article
                key={s.s}
                style={{ background: 'var(--papel)' }}
                className="rounded-xl p-5"
              >
                <div className="flex items-center gap-2">
                  {/* El punto verde: los tres locales están abiertos. */}
                  <span
                    style={{ background: 'var(--verde)' }}
                    className="size-2 rounded-full"
                  />
                  <h3
                    style={{ color: 'var(--tinta)' }}
                    className="text-[15px] font-bold"
                  >
                    {s.s}
                  </h3>
                </div>
                <p
                  style={{ color: 'var(--tinta-media)' }}
                  className="mt-2.5 text-[13px] leading-relaxed"
                >
                  {s.dir}
                </p>
                <p
                  style={{ color: 'var(--tinta-tenue)' }}
                  className="mt-1.5 text-[11.5px]"
                >
                  {s.hora}
                </p>
              </article>
            ))}
          </Aparecer>
        </div>
      </div>
    </section>
  )
}
