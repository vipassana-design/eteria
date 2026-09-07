import Reveal from './Reveal'

interface Props {
  /** Texto plano del título, o el tramo previo al degradé. */
  children: React.ReactNode
  /** Tramo final con el degradé de marca. Solo títulos de sección
   *  principal, nunca subtítulos ni cuerpo (§2.1). */
  degrade?: string
  bajada?: string
  /** Nivel semántico. El visual siempre es el de H2 de sección. */
  as?: 'h1' | 'h2' | 'h3'
  /** Id para el scroll desde la navegación. */
  id?: string
  className?: string
}

export default function TituloSeccion({
  children,
  degrade,
  bajada,
  as: Etiqueta = 'h2',
  id,
  className = '',
}: Props) {
  return (
    <div id={id} className={`${className} scroll-mt-32`}>
      <Reveal variante="mascara">
        <Etiqueta className="text-h2 font-semibold">
          {children}
          {degrade ? (
            <>
              {' '}
              <span className="texto-degrade inline-block">{degrade}</span>
            </>
          ) : null}
        </Etiqueta>
      </Reveal>

      {bajada ? (
        <Reveal delay={0.12}>
          <p className="text-cuerpo-lg medida mt-5 text-mid">{bajada}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
