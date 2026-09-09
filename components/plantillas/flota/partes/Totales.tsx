'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { flota } from '@/content/plantillas/flota'

/** La barra inferior con los totales del turno.
 *
 *  **Por qué no usa `Cifra`.** El componente compartido cuenta con un
 *  `ScrollTrigger` en `top 90%` y `once: true`, o sea que espera a que
 *  el número entre en viewport por scroll. Esta plantilla es one page:
 *  el documento **no scrollea**, así que ScrollTrigger nunca refresca
 *  contra un movimiento y los cinco totales se quedaban en cero a la
 *  vista. Medido en `/plantillas/flota` a 1440px: "0 de 8", "0 de 107",
 *  "0 km".
 *
 *  La solución es contar al montar, sin trigger: en un panel que ocupa
 *  el viewport, "entrar en pantalla" y "montarse" son el mismo momento.
 *  Lo que sí se copia de `Cifra` es lo que importa —`tabular-nums` y
 *  animar una propiedad de un objeto en vez del `textContent`, para que
 *  el valor sea siempre un entero y el ancho no baile mientras cuenta.
 *
 *  El valor final va escrito en el HTML: si el JS no corre, o con
 *  `prefers-reduced-motion`, el número está igual.
 *
 *  En mobile los cinco totales van en dos columnas y no en una fila con
 *  scroll horizontal: a 390px una fila de cinco obliga a arrastrar para
 *  ver el último.
 */
export default function Totales() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Sin movimiento: el número ya está escrito en el HTML, no hay
      // nada que hacer. Va como rama explícita para no dejar que la
      // otra corra.
      mm.add('(prefers-reduced-motion: reduce)', () => {})

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const nodos = gsap.utils.toArray<HTMLElement>('[data-total]')

        const tws = nodos.map((el) => {
          const hasta = Number(el.dataset.hasta ?? 0)
          const separador = el.dataset.separador === '1'
          const contador = { valor: 0 }

          return gsap.to(contador, {
            valor: hasta,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              const n = Math.round(contador.valor)
              el.textContent = separador ? n.toLocaleString('es-AR') : String(n)
            },
          })
        })

        return () => tws.forEach((t) => t.kill())
      })
    },
    { scope: raiz },
  )

  return (
    <section
      ref={raiz}
      style={{ background: 'var(--superficie)', borderColor: 'var(--borde)' }}
      className="grid shrink-0 grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-3 lg:grid-cols-5"
      aria-label="Totales del turno"
    >
      {flota.barra.map((t) => {
        const separador = 'separador' in t ? t.separador : false

        return (
          <div
            key={t.t}
            style={{ background: 'var(--superficie)' }}
            className="px-3 py-2.5"
          >
            <p
              style={{ color: 'var(--texto-tenue)' }}
              className="truncate text-[10px]"
            >
              {t.t}
            </p>
            <p className="mt-0.5 flex items-baseline gap-0.5">
              <span
                data-total
                data-hasta={t.valor}
                data-separador={separador ? '1' : '0'}
                // Sin esto el ancho del número cambia en cada frame y
                // el bloque de al lado se mueve mientras cuenta.
                style={{ fontVariantNumeric: 'tabular-nums' }}
                className="text-[17px] font-semibold leading-none"
              >
                {separador ? t.valor.toLocaleString('es-AR') : t.valor}
              </span>
              {t.sufijo ? (
                <span
                  style={{ color: 'var(--texto-medio)' }}
                  className="text-[11px] font-medium tabular-nums"
                >
                  {t.sufijo}
                </span>
              ) : null}
            </p>
          </div>
        )
      })}
    </section>
  )
}
