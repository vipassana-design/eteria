import type { DatoHero } from '@/types'

/** Sección "Sobre nosotros" (PLAN.md §4.3).
 *  Sin card: texto grande sobre el fondo, dos columnas asimétricas. */
export const queHacemos = {
  titulo: 'Sobre',
  tituloDegrade: 'nosotros',
  parrafos: [
    'Somos un equipo de desarrollo especializado en software para empresas. Cada proyecto tiene un equipo asignado y un responsable técnico que lo sigue de principio a fin.',
    'Trabajamos con empresas que ya tienen un sistema funcionando y necesitan ampliarlo o reemplazarlo, y con equipos que están armando la primera versión de un producto. En los dos casos empezamos por definir qué tiene que hacer el sistema y con qué se integra.',
  ],
  /** Los tres van al mismo tamaño y en la franja que cierra la
   *  sección. Solo el primero es una cifra, así que es el único que
   *  cuenta al entrar en viewport. */
  datos: [
    { valor: '+20', etiqueta: 'años acompañando clientes', cuenta: { hasta: 20, prefijo: '+' } },
    { valor: 'End to end', etiqueta: 'del relevamiento al lanzamiento' },
    { valor: 'Soporte', etiqueta: 'asistencia post lanzamiento' },
  ] satisfies DatoHero[] as DatoHero[],
}
