import Image from 'next/image'
import { terrazas } from '@/content/plantillas/terrazas'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las tres propiedades destacadas. Es la sección clave de la plantilla.
 *
 *  **La ficha lleva todo lo que un comprador mira antes de llamar**: el
 *  código de referencia, el precio, las expensas por separado, los
 *  metros cubiertos *y* los totales, ambientes, baños, cochera,
 *  antigüedad y orientación. Una card con "3 amb · US$ 189.000" es
 *  exactamente lo que delata una plantilla: nadie decide una visita con
 *  eso, y quien vende propiedades lo nota en dos segundos.
 *
 *  Cubiertos y totales van en dos celdas distintas porque en el mercado
 *  argentino son dos números que se negocian aparte —el balcón y el
 *  patio no valen lo mismo que el interior— y verlos juntos en una
 *  celda es el error de quien no conoce el rubro.
 *
 *  La etiqueta ("Apto crédito", "Recién publicada") se renderiza solo
 *  en las que la tienen. Poner una en las tres la vuelve decoración: el
 *  valor del chip es que distingue.
 *
 *  El zoom de la foto al hover es refuerzo, nunca vía de acceso: con
 *  `prefers-reduced-motion` el `!important` de `globals.css` anula toda
 *  transición y se hereda al iframe, así que ningún dato de la ficha
 *  depende del hover.
 */
export default function Destacadas() {
  const { destacadas } = terrazas
  const { ficha } = destacadas

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            style={{ color: 'var(--bronce)' }}
            className="text-[11.5px] font-semibold uppercase tracking-[0.16em]"
          >
            {destacadas.volanta}
          </p>
          <h2
            style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
            className="mt-2 text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
          >
            {destacadas.titulo}
          </h2>
        </div>

        <a
          href="#"
          style={{ color: 'var(--bronce)' }}
          className="group inline-flex items-center gap-2 text-[13px] font-semibold"
        >
          {destacadas.enlace}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      <Aparecer
        escalonado={0.08}
        className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {destacadas.items.map((p) => (
          <article
            key={p.ref}
            style={{ background: 'var(--blanco)', borderColor: 'var(--linea)' }}
            className="group flex flex-col overflow-hidden rounded-sm border transition-shadow duration-300 hover:shadow-[0_20px_44px_-26px_rgba(35,31,28,0.4)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.foto}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />

              {/* Solo las que tienen etiqueta la muestran. */}
              {p.etiqueta ? (
                <span
                  style={{ background: 'var(--bronce)' }}
                  className="absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white"
                >
                  {p.etiqueta}
                </span>
              ) : null}

              {/* La referencia sobre la foto: es el dato con el que se
                  pide una propiedad por teléfono. */}
              <span
                style={{ background: 'rgba(35,31,28,0.72)' }}
                className="absolute bottom-3 right-3 rounded-sm px-2 py-1 text-[10.5px] font-semibold tabular-nums text-white"
              >
                {p.ref}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p
                style={{ color: 'var(--tinta-tenue)' }}
                className="text-[11px] font-semibold uppercase tracking-[0.1em]"
              >
                {p.zona}
              </p>
              <h3
                style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
                className="mt-1.5 text-[19px] font-semibold leading-snug"
              >
                {p.titulo}
              </h3>
              <p style={{ color: 'var(--tinta-media)' }} className="mt-1 text-[13px]">
                {p.calle}
              </p>

              {/* Precio y expensas, separados: en un departamento las
                  expensas cambian la cuota real y esconderlas es lo que
                  hace que un aviso se sienta tramposo. */}
              <div
                style={{ borderTopColor: 'var(--linea)' }}
                className="mt-4 border-t pt-4"
              >
                <p
                  style={{ color: 'var(--tinta)' }}
                  className="text-[23px] font-semibold leading-none tabular-nums"
                >
                  {p.precio}
                </p>
                <p
                  style={{ color: 'var(--tinta-media)' }}
                  className="mt-1.5 text-[12.5px] tabular-nums"
                >
                  {p.expensas}
                </p>
              </div>

              {/* Los metros, en dos celdas. */}
              <dl
                style={{ borderTopColor: 'var(--linea)' }}
                className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4"
              >
                <div>
                  <dt
                    style={{ color: 'var(--tinta-tenue)' }}
                    className="text-[10.5px] uppercase tracking-[0.08em]"
                  >
                    {ficha.cubierta}
                  </dt>
                  <dd
                    style={{ color: 'var(--tinta)' }}
                    className="mt-0.5 text-[15px] font-semibold tabular-nums"
                  >
                    {p.cubierta}
                  </dd>
                </div>
                <div>
                  <dt
                    style={{ color: 'var(--tinta-tenue)' }}
                    className="text-[10.5px] uppercase tracking-[0.08em]"
                  >
                    {ficha.total}
                  </dt>
                  <dd
                    style={{ color: 'var(--tinta)' }}
                    className="mt-0.5 text-[15px] font-semibold tabular-nums"
                  >
                    {p.total}
                  </dd>
                </div>
              </dl>

              {/* Ambientes, baños y cochera en una línea corrida:
                  son los tres que se leen de un vistazo. */}
              <p
                style={{ color: 'var(--tinta-media)' }}
                className="mt-3.5 text-[12.5px] tabular-nums"
              >
                {p.ambientes} {ficha.ambientes} · {p.banos}{' '}
                {p.banos === 1 ? ficha.bano : ficha.banos} ·{' '}
                {p.cochera ? ficha.cochera : ficha.sinCochera}
              </p>

              <dl
                style={{ borderTopColor: 'var(--linea)' }}
                className="mt-3.5 space-y-1.5 border-t pt-3.5 text-[12.5px]"
              >
                <div className="flex justify-between gap-3">
                  <dt style={{ color: 'var(--tinta-tenue)' }}>Antigüedad</dt>
                  <dd style={{ color: 'var(--tinta-media)' }} className="text-right">
                    {p.antiguedad}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt style={{ color: 'var(--tinta-tenue)' }}>Orientación</dt>
                  <dd style={{ color: 'var(--tinta-media)' }} className="text-right">
                    {p.orientacion}
                  </dd>
                </div>
              </dl>

              <a
                href="#"
                style={{ borderColor: 'var(--tinta)', color: 'var(--tinta)' }}
                className="mt-5 block rounded-sm border py-2.5 text-center text-[12.5px] font-semibold transition-colors duration-200 hover:bg-[var(--tinta)] hover:text-white"
              >
                {ficha.ver}
              </a>
            </div>
          </article>
        ))}
      </Aparecer>
    </section>
  )
}
