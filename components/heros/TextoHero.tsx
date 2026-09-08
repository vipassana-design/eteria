import Boton from '@/components/ui/Boton'
import { copyComun } from '@/content/heros'

/** Bloque de texto del hero, idéntico en las cinco propuestas.
 *
 *  Se comparte para que la comparación sea de dirección visual: si cada
 *  propuesta tuviera su propio texto, no se sabría qué se está
 *  comparando.
 */
export default function TextoHero({
  className = '',
  compacto = false,
}: {
  /** Clases del contenedor, para que cada propuesta lo ubique. */
  className?: string
  /** Versión con menos aire, para las propuestas donde el texto
   *  comparte el viewport con una franja o una grilla. */
  compacto?: boolean
}) {
  return (
    <div className={className}>
      <h1
        data-hero-titulo
        className={`font-semibold ${compacto ? 'text-h2' : 'text-hero'} [text-wrap:nowrap]`}
      >
        {copyComun.titulo.antes.map((linea) => (
          <span key={linea} className="block">
            {linea}
          </span>
        ))}
        {copyComun.titulo.degrade.map((linea) => (
          <span key={linea} className="texto-degrade block">
            {linea}
          </span>
        ))}
      </h1>

      <p
        data-hero-texto
        className={`medida text-mid ${compacto ? 'text-cuerpo mt-5' : 'text-cuerpo-lg mt-7'}`}
      >
        {copyComun.bajada}
      </p>

      <div
        data-hero-texto
        className={`flex flex-wrap items-center gap-3 sm:gap-4 ${compacto ? 'mt-7' : 'mt-10'}`}
      >
        <Boton href={copyComun.ctaPrimario.href} tamano={compacto ? 'chico' : 'base'}>
          {copyComun.ctaPrimario.etiqueta}
        </Boton>
        <Boton
          href={copyComun.ctaSecundario.href}
          variante="secundario"
          tamano={compacto ? 'chico' : 'base'}
        >
          {copyComun.ctaSecundario.etiqueta}
        </Boton>
      </div>

      <p data-hero-texto className={`text-label text-low ${compacto ? 'mt-7' : 'mt-10'}`}>
        {copyComun.prueba}
      </p>
    </div>
  )
}
