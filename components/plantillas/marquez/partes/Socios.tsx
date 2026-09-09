import Image from 'next/image'
import { marquez } from '@/content/plantillas/marquez'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Los cuatro socios: foto, nombre, matrícula del CPACF y especialidad.
 *
 *  **La matrícula es lo que hace creíble la sección.** Tomo y folio del
 *  Colegio Público de Abogados de la Capital Federal es un dato público
 *  y verificable —se chequea en el padrón— y es justo el que ninguna
 *  plantilla de estudio jurídico incluye. Un cliente corporativo lo
 *  busca antes de la primera reunión.
 *
 *  Va con `tabular-nums` y en bronce: es el dato con más peso del
 *  bloque después del nombre, y en color se lee como credencial en
 *  lugar de como letra chica.
 *
 *  Las fotos van en blanco y negro por CSS y **quedan así**: no se
 *  colorean al hover. Un retrato que cambia al pasar el mouse es
 *  interacción decorativa, que es lo que esta plantilla no tiene —y
 *  con `prefers-reduced-motion` la transición se anularía igual.
 */
export default function Socios() {
  const { socios } = marquez

  return (
    <section
      style={{ background: 'var(--blanco)', borderTopColor: 'var(--linea)', borderBottomColor: 'var(--linea)' }}
      className="border-y"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
        <Aparecer y={18} className="max-w-[58ch]">
          <p
            style={{ color: 'var(--bronce)' }}
            className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
          >
            {socios.volanta}
          </p>
          <h2
            style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
            className="mt-3 text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
          >
            {socios.titulo}
          </h2>
          <p
            style={{ color: 'var(--tinta-media)' }}
            className="mt-4 text-[14.5px] leading-[1.7]"
          >
            {socios.bajada}
          </p>
        </Aparecer>

        <Aparecer
          escalonado={0.07}
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
        >
          {socios.items.map((s) => (
            <article key={s.n}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={s.foto}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw"
                  className="object-cover grayscale"
                />
              </div>

              <span
                style={{ background: 'var(--bronce)' }}
                className="mt-5 block h-[2px] w-7"
              />

              <h3
                style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
                className="mt-3.5 text-[18px] font-semibold leading-snug"
              >
                {s.n}
              </h3>

              <p
                style={{ color: 'var(--tinta-media)' }}
                className="mt-1.5 text-[13px] leading-snug"
              >
                {s.e}
              </p>

              <p
                style={{ color: 'var(--bronce)' }}
                className="mt-3 text-[12px] font-semibold tabular-nums"
              >
                {s.m}
              </p>

              <p
                style={{ borderTopColor: 'var(--linea)', color: 'var(--tinta-media)' }}
                className="mt-3.5 border-t pt-3.5 text-[12.5px] leading-[1.6]"
              >
                {s.d}
              </p>
            </article>
          ))}
        </Aparecer>
      </div>
    </section>
  )
}
