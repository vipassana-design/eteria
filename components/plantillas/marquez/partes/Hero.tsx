import Image from 'next/image'
import { marquez } from '@/content/plantillas/marquez'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Hero del estudio: titular en serif a la izquierda, foto a la derecha.
 *
 *  Dos columnas y texto sobre fondo plano, nunca sobre la foto. En un
 *  estudio jurídico el titular tiene que leerse sin esfuerzo, y el
 *  texto sobre imagen siempre pierde contraste —además de ser el
 *  recurso con el que se disimula que no hay nada que decir.
 *
 *  Los tres datos de la firma (fundación, socios, sede) van bajo el
 *  titular en una fila con filetes de bronce. Es el equivalente sobrio
 *  de las cifras que suben de las otras plantillas: acá no cuentan,
 *  porque un número animado en un sitio de abogados suena a landing.
 *
 *  Las esquinas son rectas en toda la plantilla. El radio grande lee
 *  como producto de software; la esquina recta, como documento.
 */
export default function Hero() {
  const { hero } = marquez

  return (
    <section style={{ background: 'var(--blanco)', borderBottomColor: 'var(--linea)' }} className="border-b">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:py-20">
        <Aparecer y={18}>
          <p
            style={{ color: 'var(--bronce)' }}
            className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
          >
            {hero.volanta}
          </p>

          <h1
            style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
            className="mt-4 whitespace-pre-line text-[31px] font-semibold leading-[1.16] tracking-[-0.015em] sm:text-[38px] lg:text-[45px]"
          >
            {hero.titulo}
          </h1>

          <p
            style={{ color: 'var(--tinta-media)' }}
            className="mt-5 max-w-[54ch] text-[15px] leading-[1.7]"
          >
            {hero.bajada}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#"
              style={{ background: 'var(--tinta)' }}
              className="px-6 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-[var(--bronce)]"
            >
              {hero.cta}
            </a>
            <a
              href="#"
              style={{ borderColor: 'var(--bronce)', color: 'var(--bronce)' }}
              className="border px-6 py-3.5 text-[13.5px] font-semibold transition-colors duration-200 hover:bg-[var(--bronce-tenue)]"
            >
              {hero.secundario}
            </a>
          </div>

          {/* Los tres datos, con el filete de bronce arriba de cada uno.
              El filete es lo que los convierte en una unidad de dato y
              no en tres líneas de texto suelto. */}
          <dl className="mt-10 grid grid-cols-3 gap-5 sm:gap-8">
            {hero.datos.map((d) => (
              <div key={d.t}>
                <span
                  style={{ background: 'var(--bronce)' }}
                  className="block h-[2px] w-7"
                />
                <dt
                  style={{ color: 'var(--tinta-media)' }}
                  className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em]"
                >
                  {d.t}
                </dt>
                <dd
                  style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
                  className="mt-1 text-[19px] font-semibold tabular-nums lg:text-[21px]"
                >
                  {d.d}
                </dd>
              </div>
            ))}
          </dl>
        </Aparecer>

        <Aparecer y={22}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={hero.foto}
              alt={hero.fotoAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Aparecer>
      </div>
    </section>
  )
}
