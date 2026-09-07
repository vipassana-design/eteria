'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { marca, ui } from '@/content/marca'

/** WhatsApp flotante (PLAN.md §4.10).
 *  Abajo a la derecha, siempre visible, z-index por debajo del modal.
 *  Círculo con el degradé de marca y glow suave. Abre chat directo sin
 *  mensaje precargado. */
export default function WhatsappFab() {
  const raiz = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    const el = raiz.current
    if (!el) return

    // Visible desde el arranque: llega tráfico de ads y hay gente que
    // consulta sin leer la página. Lo único que se anima es la entrada,
    // al final de la secuencia del hero, para no pisarla.
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(el, {
        opacity: 0,
        scale: 0.8,
        duration: 0.45,
        delay: 1.3,
        ease: 'back.out(1.6)',
      })
    })
  })

  return (
    <a
      ref={raiz}
      href={`https://wa.me/${marca.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.escribinosPorWhatsapp}
      // Marca de flotante: globals.css lo aparta cuando el menú mobile
      // está abierto.
      data-flotante
      className="fixed bottom-4 right-4 z-40 flex size-12 items-center justify-center rounded-(--radius-pill) bg-(image:--grad-brand) shadow-[0_6px_28px_-6px_rgba(139,92,246,0.6)] transition-transform duration-300 ease-(--ease-suave) hover:scale-105 lg:bottom-8 lg:right-8 lg:size-14"
    >
      {/* Glow suave detrás del círculo. */}
      <span
        aria-hidden="true"
        className="absolute -z-10 size-20 rounded-full blur-xl"
        style={{ backgroundImage: 'var(--glow-violet)' }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-6 text-base lg:size-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.058-.52-.115-.148-.66-1.595-.905-2.18-.24-.573-.482-.497-.66-.505-.174-.008-.372-.01-.57-.01a1.1 1.1 0 0 0-.795.372c-.273.298-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
      </svg>
    </a>
  )
}
