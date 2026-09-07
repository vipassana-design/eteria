import Link from 'next/link'
import { marca, ui } from '@/content/marca'

/** Logo tipográfico (PLAN.md §4.1).
 *  Clash Display 600: la primera mitad en --text-hi, la segunda con el
 *  degradé de marca. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={ui.irAlInicio}
      className={`font-display text-h3 font-semibold leading-none tracking-tight ${className}`}
    >
      <span className="text-hi">{marca.nombre.inicio}</span>
      <span className="texto-degrade">{marca.nombre.fin}</span>
    </Link>
  )
}
