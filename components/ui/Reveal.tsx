'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { dur, ease } from '@/lib/motion'

/** Variantes de entrada.
 *
 *  Hay más de una a propósito: el fade+slide en absolutamente todas
 *  las secciones es el default genérico que el plan pide evitar
 *  (§2.4). Cada sección elige la que le corresponde.
 */
export type VarianteReveal =
  /** Fade + 24px desde abajo. El default contenido. */
  | 'subir'
  /** Escala 0.96 → 1 con fade. Para cards. */
  | 'escala'
  /** Máscara vertical: el contenido se descubre desde abajo. Para títulos. */
  | 'mascara'
  /** Fade + desplazamiento horizontal. Para filas con stagger. */
  | 'lateral'

interface Props {
  children: React.ReactNode
  variante?: VarianteReveal
  /** Retardo en segundos. */
  delay?: number
  /** Anima los hijos directos en secuencia en vez del bloque entero. */
  stagger?: number
  /** Etiqueta HTML del contenedor. */
  as?: 'div' | 'section' | 'li' | 'span'
  className?: string
}

export default function Reveal({
  children,
  variante = 'subir',
  delay = 0,
  stagger,
  as: Etiqueta = 'div',
  className,
}: Props) {
  const contenedor = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const raiz = contenedor.current
      if (!raiz) return

      // Con stagger animamos los hijos directos; sin stagger, el bloque.
      const objetivos: Element[] = stagger ? Array.from(raiz.children) : [raiz]
      if (objetivos.length === 0) return

      const desde: Record<VarianteReveal, gsap.TweenVars> = {
        subir: { opacity: 0, y: 24 },
        escala: { opacity: 0, scale: 0.96 },
        mascara: { yPercent: 100 },
        lateral: { opacity: 0, x: -32 },
      }

      const comun: gsap.TweenVars = {
        duration: dur.base,
        ease: ease.out,
        delay,
        stagger,
        scrollTrigger: { trigger: raiz, start: 'top 85%', once: true },
      }

      // Con reduced-motion todo pasa a opacidad simple (§2.4).
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from(objetivos, { ...comun, opacity: 0, duration: dur.fast, ease: 'none' })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (variante === 'mascara') {
          // La máscara necesita el clip en el contenedor, no en el objetivo.
          gsap.set(raiz, { overflow: 'hidden' })
        }
        gsap.from(objetivos, { ...comun, ...desde[variante] })
      })
    },
    { scope: contenedor, dependencies: [variante, delay, stagger] },
  )

  return (
    <Etiqueta ref={contenedor as React.Ref<never>} className={className}>
      {children}
    </Etiqueta>
  )
}
