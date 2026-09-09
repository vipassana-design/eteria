import Image from 'next/image'
import { clinica } from '@/content/plantillas/clinica'
import Aparecer from '@/components/plantillas/comun/Aparecer'
import Cifra from '@/components/plantillas/comun/Cifra'

/** Hero de la Clínica: dos columnas, texto y foto.
 *
 *  A diferencia del hero de Atelier —foto a sangre con el texto
 *  encima—, acá va en dos columnas. Un sitio de salud tiene que ser
 *  legible antes que impactante, y el texto sobre foto siempre pierde
 *  contraste.
 *
 *  Las tres señales de confianza van sobre el fondo crudo y con las
 *  cifras contando: son datos verificables, que es lo que un paciente
 *  evalúa.
 */
export default function Hero() {
  const { hero } = clinica

  return (
    <section style={{ background: 'var(--crudo)' }}>
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-12 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-10 lg:pb-16 lg:pt-16">
        <Aparecer y={22}>
          <p
            style={{ color: 'var(--verde)' }}
            className="text-[12px] font-semibold uppercase tracking-[0.1em]"
          >
            {hero.volanta}
          </p>

          <h1
            style={{ color: 'var(--tinta)' }}
            className="mt-3 whitespace-pre-line text-[32px] font-bold leading-[1.14] tracking-[-0.015em] sm:text-[40px] lg:text-[46px]"
          >
            {hero.titulo}
          </h1>

          <p
            style={{ color: 'var(--tinta-media)' }}
            className="mt-4 max-w-[52ch] text-[15px] leading-relaxed lg:text-[16px]"
          >
            {hero.bajada}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#"
              style={{ background: 'var(--verde)' }}
              className="rounded-lg px-6 py-3.5 text-[14px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              {hero.cta}
            </a>
            <a
              href="#"
              style={{ borderColor: 'var(--verde)', color: 'var(--verde)' }}
              className="rounded-lg border px-6 py-3.5 text-[14px] font-semibold transition-colors duration-200 hover:bg-[var(--verde-claro)]"
            >
              {hero.secundario}
            </a>
          </div>

          {/* Las señales, con las cifras contando. */}
          <div
            style={{ borderTopColor: 'var(--linea)' }}
            className="mt-9 grid grid-cols-3 gap-4 border-t pt-6"
          >
            {hero.señales.map((s) => (
              <div key={s.t}>
                <p
                  style={{ color: 'var(--verde-hondo)' }}
                  className="text-[26px] font-bold leading-none lg:text-[30px]"
                >
                  <Cifra hasta={Number(s.n)} />
                </p>
                <p
                  style={{ color: 'var(--tinta-media)' }}
                  className="mt-1.5 text-[12px] leading-snug"
                >
                  {s.t}
                </p>
              </div>
            ))}
          </div>
        </Aparecer>

        <Aparecer y={28} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/6]">
            <Image
              src={hero.foto}
              alt={hero.fotoAlt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* La tarjeta flotante con el dato de la espera: es el tipo de
              información concreta que diferencia un sitio real de una
              plantilla, y rompe el rectángulo de la foto. */}
          <div
            style={{ background: 'var(--papel)', borderColor: 'var(--linea)' }}
            className="absolute -bottom-4 left-4 rounded-xl border px-4 py-3 shadow-[0_12px_28px_-12px_rgba(15,46,42,0.25)] lg:-bottom-5 lg:left-auto lg:right-5"
          >
            <p
              style={{ color: 'var(--tinta-tenue)' }}
              className="text-[10px] uppercase tracking-wider"
            >
              Espera promedio hoy
            </p>
            <p
              style={{ color: 'var(--tinta)' }}
              className="mt-0.5 text-[17px] font-bold tabular-nums"
            >
              14 minutos
            </p>
          </div>
        </Aparecer>
      </div>
    </section>
  )
}
