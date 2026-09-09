'use client'

import { useState } from 'react'
import { contactoSeccion } from '@/content/contacto'

/** Estado de disponibilidad, al lado de los datos de contacto.
 *
 *  Es lo primero que quiere saber alguien que va a delegar un sistema:
 *  si hay alguien del otro lado. Un formulario sin esto es un buzón.
 *
 *  El cálculo usa el reloj del visitante, no el del servidor: alguien
 *  que entra a las 10 desde España vería "respondemos en el día" cuando
 *  acá son las 5. Es una aproximación honesta —no sabemos su huso— y el
 *  mensaje nunca promete más de lo que dice el horario publicado.
 *
 *  Se monta sin SSR (ver `MontarDisponibilidad`): así el valor del
 *  reloj puede resolverse en el primer render, sin un HTML del servidor
 *  calculado en otro huso con el que después haya que reconciliar.
 */

type Estado = 'abierto' | 'cerrado' | 'finDeSemana'

/** Resuelve el estado con el reloj local. Fuera del componente porque
 *  no depende de nada de React. */
function estadoAhora(dias: readonly number[], desde: number, hasta: number): Estado {
  const ahora = new Date()
  if (!dias.includes(ahora.getDay())) return 'finDeSemana'
  const hora = ahora.getHours()
  return hora >= desde && hora < hasta ? 'abierto' : 'cerrado'
}

export default function Disponibilidad() {
  const { horario, disponibilidad } = contactoSeccion

  /** El estado se calcula en el inicializador, no en un efecto: es un
   *  valor derivado del reloj, no una sincronización con un sistema
   *  externo. */
  const [estado] = useState<Estado>(() =>
    estadoAhora(horario.dias, horario.desde, horario.hasta),
  )

  const abierto = estado === 'abierto'

  return (
    <p className="text-label flex items-center gap-2 text-low">
      <span aria-hidden="true" className="relative flex size-2 shrink-0">
        {/* El halo pulsa solo cuando hay alguien: un punto animado
            fuera de horario diría lo contrario que el texto. */}
        {abierto ? (
          <span
            className="absolute inset-0 animate-ping rounded-full"
            style={{ background: 'var(--verde-whatsapp)' }}
          />
        ) : null}
        <span
          className="relative size-2 rounded-full"
          style={{ background: abierto ? 'var(--verde-whatsapp)' : 'var(--color-low)' }}
        />
      </span>
      {disponibilidad[estado]}
    </p>
  )
}
