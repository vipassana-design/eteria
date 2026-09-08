'use client'

import Hero from '@/components/home/Hero'
import { fondos, type FondoId } from '@/content/fondos'
import FondoMesh from '@/components/bg/FondoMesh'
import FondoGrilla from './FondoGrilla'
import FondoHalo from './FondoHalo'
import FondoFlujo from '@/components/bg/FondoFlujo'
import FondoMeshFlujo from '@/components/bg/FondoHero'

const FONDOS = {
  mesh: FondoMesh,
  grilla: FondoGrilla,
  halo: FondoHalo,
  flujo: FondoFlujo,
  'mesh-flujo': FondoMeshFlujo,
} as const

/** El hero real de la home con uno de los fondos detrás.
 *
 *  Usa el componente `Hero` sin modificar, no una copia: la comparación
 *  tiene que ser contra el hero que está en producción, incluido su
 *  ciclo de ventanas y sus propios glows.
 *
 *  El fondo va en una capa aparte, debajo del hero pero sobre el color
 *  base de la página.
 */
export default function HeroConFondo({ fondo }: { fondo: FondoId }) {
  const Fondo = FONDOS[fondo]
  const propuesta = fondos.find((f) => f.id === fondo)

  return (
    <div className="relative">
      {/* El fondo cubre el alto del hero. `isolate` crea un contexto de
          apilado propio, así el z-index del fondo no compite con el del
          header ni con los glows del hero. */}
      <div className="pointer-events-none absolute inset-0 isolate overflow-hidden">
        <Fondo />
      </div>

      <div className="relative">
        {/* Sin su fondo propio: el que se compara es el de esta ruta. */}
        <Hero conFondo={false} />
      </div>

      {/* Nota técnica al pie del hero, fuera de la zona que se evalúa. */}
      {propuesta ? (
        <div className="contenedor relative pb-24">
          <p className="text-label medida text-low">{propuesta.tecnica}</p>
        </div>
      ) : null}
    </div>
  )
}
