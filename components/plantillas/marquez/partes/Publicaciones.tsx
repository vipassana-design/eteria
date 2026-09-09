import { marquez } from '@/content/plantillas/marquez'
import Aparecer from '@/components/plantillas/comun/Aparecer'

/** Dos publicaciones del estudio, con fecha, área y firma.
 *
 *  **Los títulos son de comentarios de fallos reales**, no notas de
 *  blog: "El nuevo tope indemnizatorio y su aplicación a despidos
 *  anteriores" es lo que escribe un estudio, y "5 consejos legales para
 *  tu empresa" es lo que escribe una plantilla. La diferencia la nota
 *  cualquier abogado en el primer segundo.
 *
 *  Van con fecha completa y con firma del socio. La fecha importa
 *  porque en derecho una nota sin fecha es inservible —el criterio pudo
 *  haber cambiado— y la firma, porque es lo que convierte la
 *  publicación en un antecedente del socio y no en contenido de la
 *  agencia que hizo el sitio.
 *
 *  Solo dos y no seis: un estudio de cuatro socios publica poco, y una
 *  grilla de nueve notas se lee como relleno.
 */
export default function Publicaciones() {
  const { publicaciones } = marquez

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            style={{ color: 'var(--bronce)' }}
            className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
          >
            {publicaciones.volanta}
          </p>
          <h2
            style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
            className="mt-3 max-w-[26ch] text-[27px] font-semibold leading-tight tracking-[-0.01em] lg:text-[34px]"
          >
            {publicaciones.titulo}
          </h2>
        </div>

        <a
          href="#"
          style={{ color: 'var(--bronce)' }}
          className="text-[12.5px] font-semibold underline decoration-[1px] underline-offset-4 transition-colors duration-200 hover:text-[var(--tinta)]"
        >
          {publicaciones.enlace}
        </a>
      </div>

      <Aparecer
        escalonado={0.08}
        className="mt-9 grid gap-8 md:grid-cols-2 md:gap-10"
      >
        {publicaciones.items.map((p) => (
          <article
            key={p.t}
            style={{ borderTopColor: 'var(--tinta)' }}
            className="border-t pt-6"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                style={{ color: 'var(--bronce)' }}
                className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
              >
                {p.area}
              </span>
              <span
                style={{ color: 'var(--tinta-media)' }}
                className="text-[11.5px] tabular-nums"
              >
                {p.fecha}
              </span>
            </div>

            <h3
              style={{ fontFamily: 'var(--serif)', color: 'var(--tinta)' }}
              className="mt-3 text-[20px] font-semibold leading-snug lg:text-[22px]"
            >
              <a
                href="#"
                className="transition-colors duration-200 hover:text-[var(--bronce)]"
              >
                {p.t}
              </a>
            </h3>

            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-3 text-[14px] leading-[1.7]"
            >
              {p.d}
            </p>

            <p
              style={{ color: 'var(--tinta-media)' }}
              className="mt-4 text-[12px]"
            >
              {p.firma}
            </p>
          </article>
        ))}
      </Aparecer>
    </section>
  )
}
