import Image from 'next/image'
import { atelier } from '@/content/plantillas/atelier'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** El bloque editorial: dos columnas, foto y nota firmada.
 *
 *  Es la sección que sostiene el registro premium de la plantilla. Una
 *  tienda que cuenta cómo produce —con talleres y lugares concretos, y
 *  una firma con cargo— se lee distinto de una que solo lista
 *  productos. Y es el tipo de sección que un ecommerce genérico no
 *  tiene, así que diferencia esta plantilla de las otras dos de la
 *  misma línea.
 *
 *  La foto va sobre fondo tinta y desbordada del contenedor en desktop:
 *  el corte contra el borde es lo que le da el aire de revista.
 */
export default function Editorial() {
  const { editorial } = atelier

  return (
    <section style={{ background: 'var(--tinta)' }}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-10 lg:py-24">
        <Aparecer y={26}>
          <p
            style={{ color: 'var(--terracota)', letterSpacing: '0.22em' }}
            className="text-[10px] uppercase"
          >
            {editorial.volanta}
          </p>

          <h2
            style={{ fontFamily: 'var(--serif)' }}
            className="mt-4 whitespace-pre-line text-[30px] leading-[1.1] text-[#F5F1EA] lg:text-[42px]"
          >
            {editorial.titulo}
          </h2>

          <div className="mt-6 space-y-4">
            {editorial.parrafos.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="max-w-[54ch] text-[14px] leading-relaxed text-[#C4BDB2] lg:text-[15px]"
              >
                {p}
              </p>
            ))}
          </div>

          <p
            style={{ letterSpacing: '0.1em' }}
            className="mt-7 text-[10px] uppercase text-[#8A8378]"
          >
            {editorial.firma}
          </p>

          <a
            href="#"
            className="group mt-7 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.12em] text-[#F5F1EA]"
          >
            {editorial.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Aparecer>

        {/* La foto: en desktop se estira más alta que la columna de
            texto, que es lo que rompe la simetría de "dos cajas
            iguales" y la hace ver compuesta. */}
        <Aparecer y={34} className="relative aspect-[4/5] lg:aspect-[5/6]">
          <Image
            src={editorial.foto}
            alt={editorial.fotoAlt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
        </Aparecer>
      </div>
    </section>
  )
}
