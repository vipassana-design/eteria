'use client'

import dynamic from 'next/dynamic'
import { LAB_ACTIVO } from '@/lib/laboratorio'

/** Monta el laboratorio solo si está activo (PLAN.md §15).
 *
 *  El panel entra con `dynamic` y sin SSR: es una herramienta que lee
 *  las variables computadas del documento, así que no tiene nada que
 *  renderizar en el servidor, y así tampoco pesa en el primer HTML.
 */
const Laboratorio = dynamic(() => import('./Laboratorio'), { ssr: false })

export default function MontarLaboratorio() {
  if (!LAB_ACTIVO) return null
  return <Laboratorio />
}
