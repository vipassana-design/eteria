import Image from 'next/image'
import { vertice } from '@/content/plantillas/vertice'

/** Hero de Vértice: banda de campaña, corta y al grano.
 *
 *  Es deliberadamente **más chico** que el hero de Atelier o de la
 *  Clínica. En una tienda de tecnología el hero es un banner de oferta,
 *  no una portada: lo que el visitante quiere es llegar al listado, y
 *  un hero a pantalla completa lo demora.
 *
 *  El contador de tiempo restante es lo que hace que la promoción se
 *  lea viva. Va como dato estático —no cuenta— porque un contador
 *  animado sin backend miente sobre el estado del sitio, y con
 *  `prefers-reduced-motion` no correría igual.
 */
export default function Hero() {
  const { hero } = vertice

  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-6 lg:px-8 lg:pt-8">
      <div
        style={{ background: 'var(--azul-hondo)' }}
        className="relative grid overflow-hidden rounded-2xl lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative z-10 p-7 lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD]">
            {hero.volanta}
          </p>

          <h1 className="mt-3 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[34px] lg:text-[40px]">
            {hero.titulo}
          </h1>

          <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-white/70 lg:text-[15px]">
            {hero.bajada}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#"
              style={{ background: 'var(--blanco)', color: 'var(--azul-hondo)' }}
              className="rounded-lg px-6 py-3 text-[13.5px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
            >
              {hero.cta}
            </a>

            <p className="flex items-baseline gap-2 text-white/75">
              <span className="text-[11.5px]">{hero.contador.t}</span>
              <span className="text-[15px] font-bold tabular-nums text-white">
                {hero.contador.v}
              </span>
            </p>
          </div>
        </div>

        {/* La foto entra desde la derecha con un velo que la funde con
            el fondo: el corte duro partiría la banda en dos bloques. */}
        <div className="relative min-h-[180px] lg:min-h-[260px]">
          <Image
            src={hero.foto}
            alt={hero.fotoAlt}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #1E3A8A 0%, rgba(30,58,138,0.65) 35%, rgba(30,58,138,0) 100%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
