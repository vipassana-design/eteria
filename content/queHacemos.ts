import type { DatoHero } from '@/types'

/** Sección "Qué hacemos" (PLAN.md §4.3).
 *  Sin card: texto grande sobre el fondo, dos columnas asimétricas. */
export const queHacemos = {
  titulo: 'Desarrollo',
  tituloDegrade: 'a medida',
  parrafos: [
    'Cada proyecto arranca en cero: escribimos el código que la operación necesita, con la estructura que va a soportar lo que se agregue después.',
    'Trabajamos con empresas que ya tienen un sistema funcionando y necesitan ampliarlo o reemplazarlo, y con equipos que están armando la primera versión de un producto. En los dos casos el punto de partida es definir qué tiene que hacer el sistema antes de escribir código.',
  ],
  /** Los valores van en Clash Display grande con degradé, el label
   *  debajo en --text-low. */
  datos: [
    { valor: '+20', etiqueta: 'años construyendo software' },
    {
      valor: 'Ecommerce · Plataformas · Sitios',
      etiqueta: 'lo que desarrollamos',
      esTexto: true,
    },
    { valor: '24h', etiqueta: 'tiempo de respuesta' },
  ] satisfies DatoHero[] as DatoHero[],
}
