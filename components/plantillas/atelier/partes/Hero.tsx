import Image from 'next/image'
import { atelier } from '@/content/plantillas/atelier'

/** Hero de Atelier: foto a sangre y el titular encima.
 *
 *  Full-bleed y con el texto sobre la imagen, no en dos columnas: es lo
 *  que distingue una tienda editorial de un ecommerce genérico. El velo
 *  en degradé desde abajo es lo que sostiene el contraste del texto sin
 *  apagar la foto entera.
 *
 *  El titular lleva `\n` en el contenido y se corta con `whitespace-pre-line`
 *  en lugar de dos `<span>`: el quiebre es una decisión de composición y
 *  vive con el copy, no con el markup.
 */
export default function Hero() {
  const { hero } = atelier

  return (
    <section className="relative">
      <div className="relative h-[76vh] min-h-[440px] w-full overflow-hidden lg:h-[86vh]">
        <Image
          src={hero.foto}
          alt={hero.fotoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dos velos: uno general que baja el brillo y uno desde abajo
            para el texto. Con uno solo, o la foto queda gris o el texto
            no contrasta. */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1240px] px-5 pb-12 lg:px-10 lg:pb-16">
          <p
            style={{ letterSpacing: '0.22em' }}
            className="text-[10px] uppercase text-white/85"
          >
            {hero.volanta}
          </p>

          <h1
            style={{ fontFamily: 'var(--serif)', letterSpacing: '-0.01em' }}
            className="mt-3 max-w-[15ch] whitespace-pre-line text-[38px] leading-[1.04] text-white sm:text-[52px] lg:text-[68px]"
          >
            {hero.titulo}
          </h1>

          <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-white/85 lg:text-[15px]">
            {hero.bajada}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            {/* El CTA es un rectángulo sin radio: el radio redondeado es
                de SaaS, no de moda. */}
            <a
              href="#"
              style={{ background: 'var(--papel)', color: 'var(--tinta)' }}
              className="px-8 py-3.5 text-[12px] uppercase tracking-[0.12em] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {hero.cta}
            </a>

            <a href="#" className="group relative text-[12px] uppercase tracking-[0.12em] text-white">
              {hero.secundario}
              <span className="absolute -bottom-1 left-0 h-px w-full bg-white/50 transition-colors duration-300 group-hover:bg-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
