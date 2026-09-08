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
  /** Los valores van en Clash Display grande con degradé, el label
   *  debajo en --text-low. */
  datos: [
    { valor: '+20', etiqueta: 'años acompañando clientes' },
    // Los dos últimos no son cifras: van a cuerpo más chico, que el
    // tamaño de número grande queda para las que sí lo son.
    { valor: 'End to end', etiqueta: 'del relevamiento al lanzamiento', esTexto: true },
    { valor: 'Soporte', etiqueta: 'asistencia post lanzamiento', esTexto: true },
  ] satisfies DatoHero[] as DatoHero[],
}
