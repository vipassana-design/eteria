/** Contenido de la ruta temporal /fondos.
 *
 *  Cuatro fondos animados para el hero, cada uno con el hero completo
 *  encima para ver cómo conviven. Misma paleta que el sitio.
 */

export type FondoId = 'mesh' | 'grilla' | 'halo' | 'flujo'

export interface PropuestaFondo {
  id: FondoId
  numero: string
  nombre: string
  linea: string
  /** Cómo está implementado y qué hace en mobile. */
  tecnica: string
}

export const fondos: PropuestaFondo[] = [
  {
    id: 'mesh',
    numero: '1',
    nombre: 'Mesh',
    linea:
      'Manchas de gradiente grandes y difusas que derivan lento y se solapan. El movimiento es casi imperceptible frame a frame pero el fondo nunca es el mismo.',
    tecnica:
      'CSS: cuatro divs con radial-gradient y blur, animados con GSAP sobre x/y/scale. En mobile quedan tres, estáticas.',
  },
  {
    id: 'grilla',
    numero: '2',
    nombre: 'Grilla',
    linea:
      'Retícula fina de líneas hairline donde algunas celdas se encienden un instante y se apagan, como actividad de un sistema.',
    tecnica:
      'La retícula es un background CSS repetido; los destellos son divs posicionados que GSAP enciende al azar. En mobile la retícula queda y los destellos se reducen a la mitad.',
  },
  {
    id: 'halo',
    numero: '3',
    nombre: 'Halo',
    linea:
      'Un patrón de puntos apagado en toda la superficie, que solo se revela donde pasa el cursor. El halo lo sigue con retardo.',
    tecnica:
      'Canvas con el patrón dibujado una vez y una máscara radial que sigue al mouse con quickTo. En mobile no hay cursor: el halo queda fijo en el centro.',
  },
  {
    id: 'flujo',
    numero: '4',
    nombre: 'Flujo',
    linea:
      'Trazos finos que recorren el hero de un lado al otro dejando una estela corta que se desvanece. Sugiere datos moviéndose.',
    tecnica:
      'Canvas con estela por acumulación: en vez de limpiar el frame se pinta un velo semitransparente encima. En mobile la mitad de trazos y más lentos.',
  },
]

export const fondosUi = {
  titulo: 'Fondos para el hero',
  bajada:
    'Cuatro fondos animados con el hero completo encima, para ver cómo conviven. Misma paleta que el sitio.',
  aviso: 'Ruta temporal de comparación. No forma parte del sitio.',
  volver: 'Ver todos',
  siguiente: 'Siguiente',
  anterior: 'Anterior',
  volverAlSitio: 'Volver al sitio',
}
