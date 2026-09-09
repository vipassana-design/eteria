'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

/** Fondo 1 — Mesh.
 *
 *  Manchas de gradiente grandes y difusas que derivan lento y se
 *  solapan. Ninguna es protagonista: lo que cambia es la mezcla.
 *
 *  Va con CSS y no con canvas: son cuatro radiales con blur alto, y el
 *  compositor las mueve con `transform` sin repintar nada. En canvas
 *  habría que redibujar gradientes de ese tamaño en cada frame.
 *
 *  En mobile quedan tres y estáticas: el blur de 100px sobre superficies
 *  grandes es lo que más cuesta en GPU móvil.
 */

/** Las manchas, con su color y su posición de reposo.
 *
 *  **Van en violeta, no en el azul del acento principal.** Es lo que
 *  justifica que `--color-acento-2` exista: el azul lleva títulos,
 *  botones y enlaces, y el violeta queda para los datos y el fondo. Con
 *  el fondo en azul el segundo acento aparecía en dos números y no se
 *  leía como parte del sistema.
 *
 *  Ojo con los nombres de los tokens: `--color-violet-*` quedó con
 *  nombre violeta pero **valor azul** cuando se aplicó la paleta final
 *  (renombrarlos tocaba las utilidades de Tailwind en ~20 archivos). El
 *  violeta real es `--color-acento-2`.
 *
 *  La variación tonal se mantiene con los dos violetas de la paleta y
 *  distintos porcentajes: con un solo color y una sola opacidad el
 *  fondo queda plano. */
const MANCHAS = [
  {
    color: 'color-mix(in srgb, var(--color-acento-2) 42%, transparent)',
    x: '8%', y: '12%', tamano: 620, soloDesktop: false,
  },
  {
    color: 'color-mix(in srgb, var(--color-acento-2-claro) 22%, transparent)',
    x: '62%', y: '-6%', tamano: 560, soloDesktop: false,
  },
  {
    color: 'color-mix(in srgb, var(--color-acento-2) 26%, transparent)',
    x: '34%', y: '52%', tamano: 500, soloDesktop: false,
  },
  {
    color: 'color-mix(in srgb, var(--color-acento-2) 34%, transparent)',
    x: '78%', y: '46%', tamano: 540, soloDesktop: true,
  },
]

export default function FondoMesh({ conVelo = true }: { conVelo?: boolean } = {}) {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Solo desktop y con movimiento permitido: en mobile las manchas
      // quedan donde están.
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-mancha]', raiz.current)

        const tweens = items.map((mancha, i) =>
          // Cada una tiene su propio recorrido y duración, así la mezcla
          // no se repite con un período corto.
          gsap.to(mancha, {
            x: gsap.utils.random(-160, 160),
            y: gsap.utils.random(-110, 110),
            scale: gsap.utils.random(0.85, 1.25),
            duration: gsap.utils.random(14, 22),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 1.4,
          }),
        )

        return () => {
          for (const t of tweens) t.kill()
        }
      })
    },
    { scope: raiz },
  )

  return (
    <div ref={raiz} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {MANCHAS.map((m) => (
        <div
          key={m.color}
          data-mancha
          className={`absolute rounded-full blur-[100px] will-change-transform ${
            m.soloDesktop ? 'hidden lg:block' : ''
          }`}
          // El multiplicador del laboratorio (§15). Sin él, 1.
          style={{
            left: m.x,
            top: m.y,
            width: m.tamano,
            height: m.tamano,
            backgroundImage: `radial-gradient(circle, ${m.color} 0%, transparent 70%)`,
            opacity: 'var(--lab-mesh, 1)',
          }}
        />
      ))}

      {/* Velo: sin esto las manchas suben demasiado el fondo y el texto
          pierde contraste. Se puede apagar cuando otro fondo se apila
          encima y aporta el suyo, para no oscurecer dos veces. */}
      {conVelo ? <div className="absolute inset-0 bg-base/45" /> : null}
    </div>
  )
}
