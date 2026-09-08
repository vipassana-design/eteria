'use client'

import FondoMesh from './FondoMesh'
import FondoFlujo from './FondoFlujo'

/** Fondo animado del hero (PLAN.md §2.5, §13).
 *
 *  Dos capas: las manchas de gradiente de Mesh como base, que dan el
 *  color y la profundidad, y los trazos de Flujo encima, que aportan el
 *  movimiento puntual. Elegido entre las cinco propuestas de /fondos.
 *
 *  Apilarlas no es montar los dos componentes tal cual. Dos cosas
 *  tapaban la base:
 *
 *  1. Los velos opacos propios de cada uno, encimados, oscurecían todo.
 *     Acá Mesh va sin su velo y Flujo sin su desvanecido de bordes: los
 *     pone esta capa, una sola vez.
 *
 *  2. El velo que borra la estela. Flujo lo pinta sobre **todo** el
 *     canvas cada frame, y ese canvas está encima de las manchas: por
 *     eso el fondo se veía brillante al cargar y se iba oscureciendo a
 *     medida que el loop acumulaba velo. Se resuelve con
 *     `modoBorrado="borrar"`, que baja el alfa de lo pintado en vez de
 *     pintar encima, así el canvas queda transparente donde no hay
 *     trazo.
 *
 *  Cada capa maneja su propio mobile y su propio `prefers-reduced-motion`.
 */
export default function FondoHero() {
  return (
    <div
      aria-hidden="true"
      // `isolate` crea un contexto de apilado propio: el z-index de las
      // capas no compite con el del header ni con el del contenido.
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
    >
      {/* Base: las manchas, sin su velo. */}
      <FondoMesh conVelo={false} />

      {/* Trazos encima. En modo 'borrar' el canvas no pinta color, así
          que no hace falta un velo entre las capas: la base se ve con
          su brillo pleno. */}
      <FondoFlujo modoBorrado="borrar" conDesvanecido={false} />

      {/* Desvanecido de bordes, una sola vez y al final: cierra las dos
          capas contra el límite del hero para que no corten en seco
          contra la sección siguiente. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 96% 90% at 50% 45%, transparent 34%, #0C0A18 100%)',
        }}
      />
    </div>
  )
}
