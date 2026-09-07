import Link from 'next/link'

/** Variantes de botón (PLAN.md §2.1).
 *
 *  Regla de uso: un solo botón con degradé + glow por pantalla.
 *  Los secundarios van con borde y fondo transparente.
 */
export type VarianteBoton = 'primario' | 'secundario' | 'enlace'
export type TamanoBoton = 'base' | 'chico'

const BASE =
  'relative inline-flex items-center justify-center gap-2 font-sans font-medium ' +
  'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ' +
  'ease-(--ease-suave) disabled:pointer-events-none disabled:opacity-50 ' +
  'active:translate-y-px'

const VARIANTES: Record<VarianteBoton, string> = {
  // El degradé va en background-image para poder animar el glow aparte.
  primario:
    'text-base font-semibold rounded-(--radius-control) bg-(image:--grad-brand) ' +
    'shadow-[0_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_8px_32px_-4px_rgba(139,92,246,0.55)] ' +
    'hover:-translate-y-0.5',
  secundario:
    'text-hi rounded-(--radius-control) border border-hairline bg-transparent ' +
    'hover:border-hairline-hover hover:bg-white/[0.03] hover:-translate-y-0.5',
  enlace:
    'text-violet-300 hover:text-hi px-0 py-0 ' +
    // La flecha del "Ver más →" se desplaza en hover.
    '[&>[data-flecha]]:transition-transform [&>[data-flecha]]:duration-300 ' +
    'hover:[&>[data-flecha]]:translate-x-1',
}

const TAMANOS: Record<TamanoBoton, string> = {
  base: 'text-cuerpo px-6 py-3.5',
  chico: 'text-label px-5 py-2.5',
}

interface Comun {
  children: React.ReactNode
  variante?: VarianteBoton
  tamano?: TamanoBoton
  className?: string
}

type Props = Comun &
  (
    | ({ href: string; externo?: boolean } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'href' | 'className' | 'children'
      >)
    | ({ href?: undefined } & Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'className' | 'children'
      >)
  )

export default function Boton({
  children,
  variante = 'primario',
  tamano = 'base',
  className = '',
  ...resto
}: Props) {
  const clases = [
    BASE,
    VARIANTES[variante],
    variante === 'enlace' ? '' : TAMANOS[tamano],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in resto && resto.href !== undefined) {
    const { href, externo, ...anchor } = resto

    // Anchors internos (#seccion) y externos no pasan por el router.
    if (externo || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          className={clases}
          {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...anchor}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={clases} {...anchor}>
        {children}
      </Link>
    )
  }

  const { type = 'button', ...boton } = resto as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} className={clases} {...boton}>
      {children}
    </button>
  )
}
