import { ImageResponse } from 'next/og'

/** Favicon generado (PLAN.md §9).
 *  La "E" de la marca sobre el degradé, en vez de un .ico que habría
 *  que rehacer al definir el nombre definitivo. */
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icono() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#C4B5FD 0%,#8B5CF6 50%,#3B82F6 100%)',
          borderRadius: 7,
          color: '#0C0A18',
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        E
      </div>
    ),
    size,
  )
}
