import type { DatoHero } from '@/types'

/** Sección "Sobre nosotros" (PLAN.md §4.3).
 *  Sin card: texto grande sobre el fondo, dos columnas asimétricas. */
export const queHacemos = {
  titulo: 'Sobre',
  tituloDegrade: 'nosotros',
  parrafos: [
    'Somos un equipo de desarrollo. No revendemos plantillas ni tercerizamos el trabajo: el código lo escribimos nosotros y lo mantenemos después de entregarlo.',
    'Trabajamos con empresas que ya tienen un sistema funcionando y necesitan ampliarlo o reemplazarlo, y con equipos que están armando la primera versión de un producto. En los dos casos empezamos por definir qué tiene que hacer el sistema y con qué se integra.',
  ],
  /** Los valores van en Clash Display grande con degradé, el label
   *  debajo en --text-low. */
  datos: [
    { valor: '+20', etiqueta: 'años construyendo software' },
    { valor: '+100', etiqueta: 'proyectos entregados' },
    // Tercer dato propuesto: habla de la continuidad con el cliente,
    // que es lo que diferencia a un equipo chico de una agencia grande.
    // El número es tentativo, pendiente de confirmación.
    { valor: '9 de 10', etiqueta: 'clientes siguen con nosotros' },
  ] satisfies DatoHero[] as DatoHero[],
}
