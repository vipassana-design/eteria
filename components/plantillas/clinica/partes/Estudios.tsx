import Image from 'next/image'
import { clinica } from '@/content/plantillas/clinica'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Estudios y diagnóstico: foto a la izquierda, lista a la derecha.
 *
 *  El argumento de la sección —"no hace falta ir a otro centro"— es una
 *  ventaja concreta que un paciente entiende, no una promesa de venta.
 *  Y los plazos de cada estudio ("resultados en 24 a 48 horas") son el
 *  dato que hace que se lea como un servicio real.
 */
export default function Estudios() {
  const { estudios } = clinica

  return (
    <section style={{ background: 'var(--crudo)' }}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-9 px-5 py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-10 lg:py-16">
        <Aparecer y={24} className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={estudios.foto}
              alt={estudios.fotoAlt}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
          </div>
        </Aparecer>

        <Aparecer y={24} className="order-1 lg:order-2">
          <p
            style={{ color: 'var(--verde)' }}
            className="text-[12px] font-semibold uppercase tracking-[0.1em]"
          >
            {estudios.volanta}
          </p>
          <h2
            style={{ color: 'var(--tinta)' }}
            className="mt-2 text-[26px] font-bold leading-tight lg:text-[32px]"
          >
            {estudios.titulo}
          </h2>
          <p
            style={{ color: 'var(--tinta-media)' }}
            className="mt-3 max-w-[50ch] text-[14.5px] leading-relaxed"
          >
            {estudios.bajada}
          </p>

          <ul className="mt-7 space-y-0">
            {estudios.items.map((e) => (
              <li
                key={e.t}
                style={{ borderTopColor: 'var(--linea)' }}
                className="flex items-baseline justify-between gap-4 border-t py-3.5 last:border-b last:border-b-[var(--linea)]"
              >
                <span
                  style={{ color: 'var(--tinta)' }}
                  className="text-[14.5px] font-semibold"
                >
                  {e.t}
                </span>
                <span
                  style={{ color: 'var(--tinta-media)' }}
                  className="text-right text-[13px]"
                >
                  {e.d}
                </span>
              </li>
            ))}
          </ul>
        </Aparecer>
      </div>
    </section>
  )
}
