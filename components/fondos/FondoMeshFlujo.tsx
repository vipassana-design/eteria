'use client'

import FondoMesh from './FondoMesh'
import FondoFlujo from './FondoFlujo'

/** Fondo 5 — Mesh + Flujo.
 *
 *  Las manchas de gradiente de Mesh como base, y los trazos de Flujo
 *  encima. La base da el color y la profundidad; los trazos, el
 *  movimiento puntual.
 *
 *  Apilar los dos no es sumar los componentes tal cual: cada uno traía
 *  su propio velo opaco para separarse del fondo de la página, y dos
 *  velos encimados oscurecían todo. Acá:
 *
 *  - Mesh va **sin** su velo: el que corresponde lo pone esta capa, una
 *    sola vez y sobre las manchas.
 *  - Flujo va **sin** su desvanecido de bordes, que es opaco y taparía
 *    las manchas, y con un velo de estela transparente en vez del color
 *    base: si pintara el color opaco en cada frame borraría la base.
 */

/** El velo que borra la estela: negro con alfa, no el color base. Así
 *  apaga los trazos sin tapar las manchas de abajo. */
const VELO_TRANSPARENTE = 'rgba(0,0,0,0.28)'

export default function FondoMeshFlujo() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Base: las manchas, sin su velo. */}
      <FondoMesh conVelo={false} />

      {/* Velo único, sobre las manchas y debajo de los trazos: baja el
          brillo de la base para que el texto del hero se lea. */}
      <div className="absolute inset-0 bg-base/40" />

      {/* Trazos encima, sin desvanecido propio. */}
      <FondoFlujo colorVelo={VELO_TRANSPARENTE} conDesvanecido={false} />

      {/* Desvanecido de bordes, una sola vez y al final: cierra las dos
          capas contra el límite del hero. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 96% 90% at 50% 45%, transparent 32%, #0C0A18 100%)',
        }}
      />
    </div>
  )
}
