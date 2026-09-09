import Image from 'next/image'
import { atelier } from '@/content/plantillas/atelier'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Las tres categorías, sin cards.
 *
 *  Foto y nombre debajo, nada más: ni borde, ni fondo, ni sombra. Eso
 *  es lo que separa el registro editorial del ecommerce genérico —una
 *  card con sombra alrededor de cada categoría es la firma de plantilla
 *  de Bootstrap.
 *
 *  El contador de productos sí va: dice que hay catálogo detrás.
 */
export default function Categorias() {
  const { categorias } = atelier

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 lg:px-10 lg:pb-16 lg:pt-20">
      <h2
        style={{ color: 'var(--tinta-tenue)', letterSpacing: '0.2em' }}
        className="text-[10px] uppercase"
      >
        {categorias.titulo}
      </h2>

      <Aparecer
        escalonado={0.12}
        className="mt-6 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-3 lg:gap-x-7"
      >
        {categorias.items.map((c) => (
          <a key={c.t} href="#" className="group block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={c.foto}
                alt={c.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                // El zoom lento al hover es la microinteracción de una
                // tienda de moda. Va sobre `scale`, que es de
                // composición: no dispara layout.
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>

            <div className="mt-3.5 flex items-baseline justify-between gap-3">
              <h3
                style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
                className="text-[19px] leading-tight lg:text-[21px]"
              >
                {c.t}
              </h3>
              <span
                style={{ color: 'var(--tinta-tenue)' }}
                className="shrink-0 text-[11px] tabular-nums"
              >
                {c.n}
              </span>
            </div>

            {/* La línea que crece: refuerza el hover sin ser la única
                señal de que es un enlace. */}
            <span
              style={{ background: 'var(--terracota)' }}
              className="mt-2 block h-px w-0 transition-[width] duration-500 ease-out group-hover:w-14"
            />
          </a>
        ))}
      </Aparecer>
    </section>
  )
}
