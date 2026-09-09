'use client'

import { useState } from 'react'
import { flota } from '@/content/plantillas/flota'
import Iconos from './partes/Iconos'
import Cabecera from './partes/Cabecera'
import Mapa from './partes/Mapa'
import Unidades from './partes/Unidades'
import Eventos from './partes/Eventos'
import Totales from './partes/Totales'

/** Flota — panel de logística (PLAN.md §16).
 *
 *  Seguimiento de reparto en tiempo real, y **la única de las nueve en
 *  modo oscuro**. Que sea oscura no es variedad por variedad: un panel
 *  de monitoreo se mira durante horas y con un mapa como pieza central,
 *  y ese es el único caso donde el oscuro es la decisión correcta y no
 *  una moda. Las otras dos de software a medida son claras justamente
 *  para que esta se lea como un producto distinto.
 *
 *  **Oscuro sin quedar apagado.** Es lo más fácil de arruinar: un panel
 *  oscuro con todo en gris medio se ve muerto. Tres cosas lo evitan acá
 *  —el fondo `#0A0F1A` es bien oscuro, así que las superficies
 *  `#151C2C` se separan solas; los cuatro colores de estado son
 *  saturados y se usan al 100% en los puntos del mapa; y hay glow real
 *  (`filter: drop-shadow`) en el vehículo resaltado y en el halo
 *  pulsante, que es lo que le da la profundidad que un panel plano no
 *  tiene.
 *
 *  El violeta de acento es `#7C6BF5` y no un azul: el sitio anfitrión
 *  usa `#0076fd`, y con dos azules la plantilla se leería como una
 *  sección de Eteria en vez de un producto ajeno.
 *
 *  Los tokens van como variables CSS locales y los colores como hex
 *  literales (`plan.md` §15), igual que las otras.
 *
 *  **Es one page: el documento no scrollea.** `h-[100dvh]` más
 *  `overflow-hidden`, y el scroll vive dentro de la lista de vehículos
 *  y del timeline de eventos.
 *
 *  **Restricción de la Etapa 0:** con `prefers-reduced-motion` el
 *  `!important` de `globals.css` anula toda `transition` CSS y se
 *  hereda al iframe. Ningún hover es la única vía de acceso a
 *  información: el resaltado del mapa se dispara con click y deja
 *  estado, no con hover.
 */

/** El sistema de la plantilla, en un solo lugar. */
const TOKENS = {
  '--fondo': '#0A0F1A',
  '--superficie': '#151C2C',
  /** Un tercer nivel, para lo que va sobre una superficie. */
  '--superficie-alta': '#1D2537',
  '--borde': '#25304A',
  '--texto': '#E8ECF4',
  '--texto-medio': '#95A1BA',
  '--texto-tenue': '#5F6D8A',
  '--acento': '#7C6BF5',
  '--acento-suave': 'rgba(124, 107, 245, 0.16)',
  '--ruta': '#22D3A5',
  '--demorado': '#FBBF24',
  '--incidencia': '#F87171',
  '--sans': "Inter, 'Segoe UI', ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Flota() {
  // El vehículo resaltado. Vive en la raíz porque el mapa y la lista lo
  // consumen a la vez: es la interacción de la plantilla.
  const [elegido, setElegido] = useState<string | null>(null)

  return (
    <div
      style={{
        ...TOKENS,
        background: 'var(--fondo)',
        color: 'var(--texto)',
        fontFamily: 'var(--sans)',
      }}
      className="flex h-[100dvh] overflow-hidden antialiased"
    >
      <Iconos />

      <div className="flex min-w-0 flex-1 flex-col">
        <Cabecera />

        {/* La zona de trabajo. En mobile scrollea acá adentro y se
            apila: mapa, lista, eventos. En desktop es mapa + columna
            derecha, sin scroll de documento. */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 lg:min-h-0 lg:overflow-hidden lg:p-4">
            <Mapa elegido={elegido} alElegir={setElegido} />
            <Totales />
          </div>

          <div className="flex shrink-0 flex-col gap-3 p-3 pt-0 lg:min-h-0 lg:w-[330px] lg:p-4 lg:pl-0 xl:w-[360px]">
            <Unidades elegido={elegido} alElegir={setElegido} />
            <Eventos />
          </div>
        </div>
      </div>

      <p className="sr-only">
        {flota.producto.nombre} es un panel de demostración. Los vehículos,
        los choferes y las patentes son ficticios.
      </p>
    </div>
  )
}
