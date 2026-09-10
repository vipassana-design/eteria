import Link from 'next/link'
import { marca } from '@/content/marca'

/** Logo tipográfico (PLAN.md §4.1).
 *  Clash Display 600: la primera mitad en --text-hi, la segunda con el
 *  degradé de marca.
 *
 *  `onClick` es opcional y lo usa solo el header, para subir al tope
 *  con scroll suave cuando ya estamos en la home en vez de re-navegar.
 *  El componente sigue siendo de servidor: recibe el handler ya armado
 *  desde el header, que es cliente. El del footer no lo pasa —desde el
 *  pie el logo es un enlace a la home como cualquier otro. */
export default function Logo({
  className = '',
  onClick,
}: {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`font-display text-h3 font-semibold leading-none tracking-tight ${className}`}
    >
      {/* Sin aria-label: el nombre accesible sale del texto visible.
          Un aria-label que no contiene el texto visible rompe el
          control por voz (decir "Eteria" no activaria el enlace). */}
      <span className="text-hi">{marca.nombre.inicio}</span>
      <span className="texto-degrade">{marca.nombre.fin}</span>
    </Link>
  )
}
