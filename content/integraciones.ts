/** El mapa de "Sobre nosotros" (PLAN.md §4.3).
 *
 *  Los seis nodos son lo que el equipo hace, no los sistemas con los
 *  que se integra: el diagrama dice "esto abarcamos" y no "así se
 *  conecta tu operación". Fue una decisión del cliente sobre la
 *  versión anterior, que nombraba facturación, pagos y stock.
 *
 *  Cada uno es un servicio concreto y ninguno se pisa con otro.
 *  `Soporte` y `Mantenimiento` refuerzan el argumento del párrafo que
 *  está al lado —quien construyó es quien mantiene— y son el único
 *  lugar visual donde aparece esa idea.
 *
 *  Se descartaron: "Soluciones", que es la palabra más genérica del
 *  rubro; "Web", que deja afuera todo lo que no es un sitio; y
 *  "Diseño", que no se menciona en ninguna parte del copy.
 *
 *  Son seis y no más: con ocho el círculo se llena y las etiquetas
 *  empiezan a chocar.
 */
export interface Integracion {
  nombre: string
}

export const integraciones: Integracion[] = [
  { nombre: 'Desarrollo' },
  { nombre: 'Arquitectura' },
  { nombre: 'Integraciones' },
  { nombre: 'Infraestructura' },
  { nombre: 'Mantenimiento' },
  { nombre: 'Soporte' },
]

export const mapaUi = {
  /** El centro va en dos líneas del mismo tamaño: partirlo en un
   *  título y una nota más chica hacía que "a medida" se leyera como
   *  un pie y no como parte del nombre. */
  centro: ['El sistema', 'a medida'],
}
