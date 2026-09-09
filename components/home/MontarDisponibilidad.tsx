'use client'

import dynamic from 'next/dynamic'
import { contactoSeccion } from '@/content/contacto'

/** Monta el indicador de disponibilidad sin SSR.
 *
 *  El indicador depende del reloj del visitante, y el servidor está en
 *  otro huso: renderizarlo en el servidor daría un HTML que no coincide
 *  con lo que el navegador calcula. Sin SSR el cálculo pasa a ser del
 *  cliente y no hay nada que reconciliar.
 *
 *  Mientras carga se muestra el horario a secas, que es verdadero en
 *  cualquier momento y ocupa el mismo alto: así no salta el layout.
 */
const Disponibilidad = dynamic(() => import('./Disponibilidad'), {
  ssr: false,
  loading: () => (
    <p className="text-label text-low">{contactoSeccion.directo.notaWhatsapp}</p>
  ),
})

export default function MontarDisponibilidad() {
  return <Disponibilidad />
}
