import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { plantillas } from '@/content/plantillas'
import { PLANTILLAS } from '@/components/plantillas/registro'
import MarcoPlantilla from '@/components/plantillas/MarcoPlantilla'
import type { SlugPlantilla } from '@/types'

/** Una plantilla de muestra (PLAN.md §16).
 *
 *  Se sirve para embeberla en el modal de "Soluciones digitales", pero
 *  también se puede abrir directo para revisarla —ahí el puente de
 *  `MarcoPlantilla` se desactiva solo.
 */

export function generateStaticParams() {
  // Solo las que ya tienen componente: las demás darían 404 igual, y
  // prerenderizarlas produciría páginas vacías en el build.
  return plantillas
    .filter((p) => PLANTILLAS[p.slug])
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const plantilla = plantillas.find((p) => p.slug === slug)

  return {
    title: plantilla ? `${plantilla.titulo} · ${plantilla.rubro}` : 'Plantilla',
    // El layout ya lo declara, pero cada página lo repite: si alguna vez
    // se sirve fuera del route group, no queda indexable por descuido.
    robots: { index: false, follow: false },
  }
}

export default async function PaginaPlantilla({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const plantilla = plantillas.find((p) => p.slug === slug)
  const Componente = plantilla ? PLANTILLAS[plantilla.slug as SlugPlantilla] : undefined

  if (!plantilla || !Componente) {
    notFound()
  }

  return (
    <MarcoPlantilla>
      <Componente />
    </MarcoPlantilla>
  )
}
