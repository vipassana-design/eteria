import { ImageResponse } from 'next/og'
import { SITIO } from '@/content/sitio'

/** Imagen de Open Graph, generada en build (PLAN.md §8.5).
 *
 *  Se genera en vez de diseñarse a mano para que no quede desactualizada
 *  respecto de la marca, y para no depender de un PNG que habría que
 *  rehacer al definir el nombre definitivo.
 *
 *  Usa fuentes de sistema: cargar Clash Display acá suma peso al build
 *  por cada ruta que genere una imagen, y a 1200×630 la diferencia
 *  tipográfica no justifica el costo.
 */
export const runtime = 'nodejs'
export const alt = `${SITIO.nombre} — Desarrollo de software a medida`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Imagen() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0C0A18',
          padding: 72,
          position: 'relative',
        }}
      >
        {/* Glow de marca */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0) 70%)',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
          <span style={{ color: '#F4F2FF' }}>Eter</span>
          <span
            style={{
              background: 'linear-gradient(100deg,#C4B5FD 0%,#8B5CF6 45%,#3B82F6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            ia
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2.4,
              lineHeight: 1.05,
              color: '#F4F2FF',
            }}
          >
            <span>Desarrollo de software</span>
            <span
              style={{
                background: 'linear-gradient(100deg,#C4B5FD 0%,#8B5CF6 45%,#3B82F6 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              a medida
            </span>
          </div>

          <div style={{ display: 'flex', marginTop: 28, fontSize: 26, color: '#B9B3D6' }}>
            Ecommerce · Plataformas de gestión · Sitios institucionales
          </div>
        </div>
      </div>
    ),
    size,
  )
}
