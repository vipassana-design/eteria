'use client'

import { useEffect } from 'react'

/** Puente entre la plantilla embebida y el modal que la contiene.
 *
 *  El modal escucha `keydown` en su propio `document`, y las teclas
 *  presionadas dentro de un iframe **no llegan ahí**: el foco está en
 *  otro documento. Sin este puente, con el cursor dentro de la
 *  plantilla, `Escape` no cierra y las flechas no navegan.
 *
 *  Cada plantilla lo monta una vez. Si la ruta se abre directo en el
 *  navegador —para revisarla— `window.parent === window` y no hace
 *  nada.
 *
 *  El `targetOrigin` es explícito, nunca `'*'`: con `'*'` el mensaje se
 *  entrega a cualquier página que llegue a embeber esta ruta.
 */
export default function MarcoPlantilla({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Abierta directo, no embebida: no hay a quién avisarle.
    if (window.parent === window) return

    const avisar = (tipo: 'cerrar' | 'anterior' | 'siguiente') => {
      window.parent.postMessage({ fuente: 'plantilla', tipo }, window.location.origin)
    }

    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        avisar('cerrar')
        return
      }
      // Las flechas solo navegan si el foco no está en un control que
      // las usa: un `<select>` abierto o un input de texto.
      const activo = document.activeElement
      const enControl =
        activo instanceof HTMLElement &&
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(activo.tagName)
      if (enControl) return

      if (e.key === 'ArrowLeft') avisar('anterior')
      else if (e.key === 'ArrowRight') avisar('siguiente')
    }

    document.addEventListener('keydown', alTeclado)
    return () => document.removeEventListener('keydown', alTeclado)
  }, [])

  return <>{children}</>
}
