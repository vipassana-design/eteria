'use client'

import dynamic from 'next/dynamic'
import { LAB_ACTIVO } from '@/lib/laboratorio'

/** Monta el laboratorio solo si está activo (PLAN.md §15).
 *
 *  El `dynamic()` se resuelve contra el flag en el mismo momento en que
 *  se define, no dentro del render: `LAB_ACTIVO` es una constante que
 *  Next reemplaza literalmente al compilar, así que con el flag apagado
 *  el `import()` queda inalcanzable y el bundler no genera el chunk del
 *  panel. Declararlo fuera de la condición lo generaba igual —eran 40K
 *  en `/static/chunks` que ningún visitante descargaba pero quedaban
 *  publicados.
 *
 *  Sin SSR porque el panel lee las variables computadas del documento:
 *  no tiene nada que renderizar en el servidor.
 */
const Laboratorio = LAB_ACTIVO
  ? dynamic(() => import('./Laboratorio'), { ssr: false })
  : () => null

export default function MontarLaboratorio() {
  return <Laboratorio />
}
