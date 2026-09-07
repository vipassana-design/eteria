import type { MockupHero } from '@/types'
import { PANTALLAS } from './PantallasMockup'

/** Ventana de navegador que enmarca una pantalla de mockup.
 *  Barra de título con los tres puntos y la URL, y la pantalla debajo. */
export default function VentanaMockup({ mockup }: { mockup: MockupHero }) {
  const Pantalla = PANTALLAS[mockup.id]

  return (
    <div
      role="img"
      aria-label={mockup.alt}
      className="overflow-hidden rounded-(--radius-card) border border-white/10 bg-elevated shadow-[0_24px_70px_-12px_rgba(0,0,0,0.65)]"
    >
      {/* Barra de la ventana */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.07] bg-[#211C3D] px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-[#4A4370]" />
          <span className="size-2 rounded-full bg-[#4A4370]" />
          <span className="size-2 rounded-full bg-[#4A4370]" />
        </span>
        <span className="flex-1 truncate rounded-(--radius-pill) bg-black/25 px-3 py-1 text-[11px] leading-none text-low">
          {mockup.url}
        </span>
      </div>

      <Pantalla />
    </div>
  )
}
