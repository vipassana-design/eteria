import Image from 'next/image'
import { feria } from '@/content/plantillas/feria'

/** Hero de Feria: titular, cifras y búsquedas frecuentes.
 *
 *  Las búsquedas frecuentes son el detalle que más comunica que el
 *  sitio tiene tráfico: son términos concretos y desprolijos —"pelota
 *  nº5", "maceta grande"— del modo en que la gente escribe de verdad.
 *  Con búsquedas prolijas y genéricas se leerían como inventadas.
 */
export default function Hero() {
  const { hero } = feria

  return (
    <section style={{ background: 'var(--naranja-claro)' }}>
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 py-11 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:px-8 lg:py-14">
        <div>
          <h1
            style={{ color: 'var(--tinta)' }}
            className="whitespace-pre-line text-[28px] font-bold leading-[1.14] tracking-tight sm:text-[34px] lg:text-[40px]"
          >
            {hero.titulo}
          </h1>

          <p
            style={{ color: 'var(--tinta-media)' }}
            className="mt-3.5 max-w-[52ch] text-[14.5px] leading-relaxed lg:text-[15.5px]"
          >
            {hero.bajada}
          </p>

          {/* Las búsquedas frecuentes. */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span
              style={{ color: 'var(--tinta-tenue)' }}
              className="text-[11.5px] uppercase tracking-wider"
            >
              Se busca
            </span>
            {hero.frecuentes.map((f) => (
              <a
                key={f}
                href="#"
                style={{ background: 'var(--blanco)', color: 'var(--tinta-media)' }}
                className="rounded-full px-3.5 py-1.5 text-[12.5px] transition-all duration-200 hover:-translate-y-px hover:text-[var(--naranja)]"
              >
                {f}
              </a>
            ))}
          </div>
        </div>

        {/* La foto: recortada en un círculo grande, que es distinto del
            rectángulo de las otras plantillas. */}
        <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-full lg:max-w-none">
          <Image
            src="/plantillas/feria/hero.webp"
            alt="Productos variados de distintos vendedores"
            fill
            priority
            sizes="(min-width: 1024px) 38vw, 300px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
