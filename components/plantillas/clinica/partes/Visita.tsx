import Image from 'next/image'
import { clinica } from '@/content/plantillas/clinica'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Cómo llegar: dirección, horarios por área y contacto.
 *
 *  Los horarios van **por área** y no como un solo bloque: en una
 *  clínica el laboratorio abre antes que los consultorios y la guardia
 *  no cierra. Ese detalle es lo que separa un sitio real de una
 *  plantilla con un "Lunes a viernes de 9 a 18".
 *
 *  El correo usa el dominio `.test`, que está reservado por la RFC 2606
 *  justamente para ejemplos: no existe ni puede registrarse. Es el
 *  mismo criterio por el que la barra del navegador quedó vacía.
 */
export default function Visita() {
  const { visita } = clinica

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-12 lg:px-10 lg:py-16">
      <Aparecer
        y={22}
        className="grid gap-8 overflow-hidden rounded-2xl lg:grid-cols-[1fr_1.15fr] lg:gap-0"
        // El fondo va en el grid y no en cada mitad: así la foto y el
        // texto se leen como una sola pieza.
      >
        <div
          style={{ background: 'var(--verde-hondo)' }}
          className="p-7 lg:p-10"
        >
          <h2 className="text-[24px] font-bold leading-tight text-white lg:text-[28px]">
            {visita.titulo}
          </h2>

          <address className="mt-4 not-italic">
            <p className="text-[16px] font-semibold text-white">{visita.dir}</p>
            <p className="mt-1 text-[13px] text-white/65">{visita.detalle}</p>
          </address>

          <dl className="mt-7 space-y-3.5">
            {visita.horarios.map((h) => (
              <div key={h.t} className="border-t border-white/12 pt-3.5">
                <dt className="text-[11px] uppercase tracking-wider text-white/55">
                  {h.t}
                </dt>
                <dd className="mt-1 text-[13.5px] text-white/85">{h.d}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-1.5">
            <a
              href="#"
              className="text-[15px] font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:decoration-white"
            >
              {visita.tel}
            </a>
            <a
              href="#"
              className="text-[13px] text-white/65 transition-colors duration-200 hover:text-white"
            >
              {visita.correo}
            </a>
          </div>
        </div>

        <div className="relative min-h-[240px] lg:min-h-0">
          <Image
            src={visita.foto}
            alt={visita.fotoAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Aparecer>
    </section>
  )
}
