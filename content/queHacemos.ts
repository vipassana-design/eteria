import type { DatoHero } from '@/types'

/** Sección "Qué hacemos" (PLAN.md §4.3).
 *  Sin card: texto grande sobre el fondo, dos columnas asimétricas. */
export const queHacemos = {
  titulo: 'Software a medida,',
  tituloDegrade: 'sin atajos',
  parrafos: [
    'Cada proyecto arranca en cero. No adaptamos plantillas ni forzamos un sistema que no encaja: escribimos el código que tu operación necesita, con la estructura que va a soportar lo que viene después.',
    'Trabajamos con empresas que ya tienen algo funcionando y necesitan que funcione mejor, y con equipos que están armando la primera versión de un producto. En los dos casos el punto de partida es el mismo: entender qué tiene que hacer el sistema antes de escribir una línea.',
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
