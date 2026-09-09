'use client'

import { useState } from 'react'
import { panel } from '@/content/plantillas/panel'
import Lateral from './partes/Lateral'
import Superior from './partes/Superior'
import Indicadores from './partes/Indicadores'
import Facturacion from './partes/Facturacion'
import Pedidos from './partes/Pedidos'
import Costado from './partes/Costado'

/** Panel — gestión comercial (PLAN.md §16).
 *
 *  Back office de una distribuidora. Registro de software de gestión:
 *  densidad alta, hairlines, tipografía chica y cifras en
 *  `tabular-nums`. Es lo opuesto a Atelier a propósito: si un panel de
 *  administración tuviera la densidad baja de un ecommerce editorial se
 *  leería como landing, no como herramienta de trabajo.
 *
 *  Los tokens van como variables CSS locales y los colores como hex
 *  literales, igual que en Atelier. Es la excepción documentada en
 *  `plan.md` §15: con los tokens de `@theme` las nueve plantillas
 *  dejarían de leerse como sitios ajenos. Cada una escribe sus propias
 *  cards, badges y botones aunque eso duplique.
 *
 *  **Es one page: el documento no scrollea.** La app ocupa el viewport
 *  con `h-[100dvh]` y el scroll vive dentro de la tabla de pedidos y
 *  del panel de actividad, que son los dos únicos contenedores con
 *  `overflow-y-auto`. Es lo que hace que se lea como aplicación y no
 *  como página: en un panel real la cabecera y los KPIs no se van de
 *  pantalla cuando mirás una fila de abajo.
 *
 *  El `dvh` y no `vh` es por mobile: con `100vh` la barra de
 *  direcciones de iOS deja el último bloque abajo del pliegue y el
 *  documento termina scrolleando igual.
 *
 *  **No hay fotos.** Un panel interno no las tiene: los avatares son
 *  iniciales en círculos de color, que es lo que hace cualquier
 *  herramienta de gestión.
 *
 *  **Restricción de la Etapa 0:** con `prefers-reduced-motion` el
 *  `!important` de `globals.css` anula toda `transition` CSS y se
 *  hereda al iframe. Ningún hover de esta plantilla es la única vía de
 *  acceso a información.
 */

/** El sistema de la plantilla, en un solo lugar. */
const TOKENS = {
  '--fondo': '#F7F8FA',
  '--superficie': '#FFFFFF',
  '--texto': '#111827',
  '--texto-medio': '#4B5563',
  '--texto-tenue': '#9CA3AF',
  '--linea': '#E5E7EB',
  '--linea-suave': '#F3F4F6',
  '--acento': '#2563EB',
  '--acento-suave': '#EFF6FF',
  '--positivo': '#059669',
  '--negativo': '#DC2626',
  /** La sidebar es oscura: le da al panel el contraste que un tablero
   *  todo claro no tiene, y es la convención del rubro. */
  '--lateral': '#111827',
  '--lateral-texto': '#9CA3AF',
  '--sans': "Inter, 'Segoe UI', ui-sans-serif, system-ui, sans-serif",
} as React.CSSProperties

export default function Panel() {
  // El período seleccionado. Vive en la raíz porque manda sobre los
  // KPIs, el gráfico y el recuento de la tabla a la vez.
  const [periodo, setPeriodo] = useState<'7d' | '30d' | '90d'>('7d')
  const datos = panel.datos[periodo]

  return (
    <div
      style={{
        ...TOKENS,
        background: 'var(--fondo)',
        color: 'var(--texto)',
        fontFamily: 'var(--sans)',
      }}
      // `h-[100dvh]` + `overflow-hidden`: el documento no scrollea, y
      // los dos paneles internos se encargan de su propio scroll.
      className="flex h-[100dvh] overflow-hidden antialiased"
    >
      <Lateral />

      <div className="flex min-w-0 flex-1 flex-col">
        <Superior />

        {/* La zona de trabajo. En mobile es una sola columna que
            scrollea acá adentro —no el documento—; en desktop se parte
            en la grilla principal más el panel de la derecha. */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 lg:min-h-0 lg:overflow-hidden lg:p-5">
            <Indicadores
              periodo={periodo}
              alCambiarPeriodo={setPeriodo}
              datos={datos}
            />
            <Facturacion serie={datos.serie} comparado={datos.comparado} />
            <Pedidos total={datos.totalPedidos} />
          </div>

          <Costado />
        </div>
      </div>

      {/* El aviso de que es una demostración va fuera del diseño, para
          no ensuciarlo, pero tiene que existir. */}
      <p className="sr-only">
        {panel.producto.nombre} es un panel de demostración. Los pedidos,
        los clientes y los importes son ficticios.
      </p>
    </div>
  )
}
