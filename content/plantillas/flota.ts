/** Contenido de la plantilla Flota (PLAN.md §16).
 *
 *  Panel de logística: seguimiento de reparto en tiempo real. Es la
 *  única de las nueve en modo oscuro, y la segunda one page.
 *
 *  **El mapa es esquemático y dibujado en SVG, no un mapa real.** Es
 *  una decisión, no una limitación: un mapa de verdad necesita un
 *  proveedor de tiles, una clave y una dependencia, y las tres cosas
 *  están fuera de alcance para una demostración. Un esquema de calles
 *  con vehículos posicionados comunica lo mismo —que el producto ubica
 *  una flota— sin cargar 200 KB de librería ni depender de un servicio
 *  ajeno. Las coordenadas van en el sistema del viewBox del SVG.
 *
 *  Las patentes son del formato argentino vigente —AB 123 CD, dos
 *  letras, tres números, dos letras— y no del viejo ABC 123. Un panel
 *  de logística argentino con patentes de tres letras se lee como
 *  traducción de un producto ajeno.
 */

export type EstadoVehiculo = 'ruta' | 'demorado' | 'incidencia' | 'planta'

/** Un vehículo de la flota. Aparece a la vez en el mapa y en la lista
 *  lateral, así que los datos de los dos lugares viven en un solo
 *  objeto: si estuvieran duplicados se desincronizarían al primer
 *  cambio. */
export interface Vehiculo {
  /** El id que usa el estado de React para el resaltado. */
  id: string
  patente: string
  chofer: string
  /** Iniciales del chofer, para el círculo de color. */
  iniciales: string
  estado: EstadoVehiculo
  /** A dónde va. */
  destino: string
  eta: string
  /** Paradas entregadas sobre el total de la hoja de ruta. */
  entregadas: number
  paradas: number
  /** Posición en el viewBox del mapa, en unidades del SVG. */
  x: number
  y: number
  /** Rumbo en grados, para orientar el triangulito del vehículo. */
  rumbo: number
}

export interface Evento {
  hora: string
  /** Qué pasó. */
  titulo: string
  detalle: string
  /** Con qué vehículo, para poder cruzarlo con la lista. */
  patente: string
  tipo: EstadoVehiculo | 'entrega'
}

export const flota = {
  producto: {
    nombre: 'Rumbo',
    modulo: 'Control de flota',
    sigla: 'R',
  },

  usuario: {
    nombre: 'Diego Ferreyra',
    rol: 'Jefe de logística',
    iniciales: 'DF',
  },

  /** La sidebar de esta plantilla es de iconos, sin texto: es lo que
   *  hace un panel de monitoreo, donde el mapa se lleva el ancho. El
   *  label va en el `title` y en el `aria-label`, así que la
   *  información no depende del hover (restricción de la Etapa 0). */
  nav: [
    { id: 'mapa', t: 'Mapa', icono: 'mapa' as const, activo: true },
    { id: 'rutas', t: 'Hojas de ruta', icono: 'rutas' as const },
    { id: 'flota', t: 'Vehículos', icono: 'camion' as const },
    { id: 'choferes', t: 'Choferes', icono: 'chofer' as const },
    { id: 'avisos', t: 'Incidencias', icono: 'alerta' as const, avisos: 2 },
    { id: 'informes', t: 'Informes', icono: 'informe' as const },
  ],

  cabecera: {
    titulo: 'Reparto en curso',
    /** El turno que se está mirando. */
    turno: 'Turno mañana · 9 de septiembre',
    /** El chip de "en vivo" con el punto pulsante. */
    envivo: 'En vivo',
    actualizado: 'Actualizado hace 40 s',
    /** Los dos controles de la derecha del encabezado. */
    acciones: [{ t: 'Centrar mapa' }, { t: 'Exportar' }],
  },

  mapa: {
    /** Zona que representa el esquema. Va escrito porque un mapa
     *  esquemático sin nombre no ubica a nadie. */
    zona: 'Zona oeste · CABA y primer cordón',
    /** El label de la referencia de estados, arriba a la derecha. */
    referencia: 'Estado',
    /** Nombres sobre el esquema, en los cruces principales. Le dan al
     *  dibujo la lectura de mapa: sin toponimia son solo líneas. */
    puntos: [
      { t: 'Planta Morón', x: 148, y: 306, base: true },
      { t: 'Centro de cruce', x: 470, y: 214, base: true },
      { t: 'Haedo', x: 296, y: 116, base: false },
      { t: 'Ramos Mejía', x: 620, y: 122, base: false },
      { t: 'Ciudadela', x: 700, y: 320, base: false },
      { t: 'Villa Luro', x: 396, y: 386, base: false },
    ],
    /** Las avenidas del esquema, con nombre. */
    avenidas: [
      { t: 'Av. Rivadavia', x: 336, y: 200, rot: -12 },
      { t: 'Acceso Oeste', x: 560, y: 292, rot: 14 },
    ],
  },

  lista: {
    titulo: 'Vehículos',
    /** El contador del encabezado de la lista. */
    contador: (activos: number, total: number) => `${activos} de ${total} en calle`,
    /** La pista de la interacción. Va escrita: que un click resalte en
     *  el mapa no se descubre solo. */
    pista: 'Elegí un vehículo para ubicarlo en el mapa',
    /** El label del progreso de la hoja de ruta. */
    progreso: (hechas: number, total: number) => `${hechas} de ${total} paradas`,
    vehiculos: [
      {
        id: 'v1',
        patente: 'AE 412 KJ',
        chofer: 'Rubén Ocampo',
        iniciales: 'RO',
        estado: 'ruta',
        destino: 'Ramos Mejía',
        eta: '11:20',
        entregadas: 7,
        paradas: 12,
        x: 566,
        y: 152,
        rumbo: 42,
      },
      {
        id: 'v2',
        patente: 'AD 908 LM',
        chofer: 'Nadia Salvatierra',
        iniciales: 'NS',
        estado: 'ruta',
        destino: 'Villa Luro',
        eta: '11:05',
        entregadas: 9,
        paradas: 14,
        x: 372,
        y: 344,
        rumbo: 128,
      },
      {
        id: 'v3',
        patente: 'AF 233 PT',
        chofer: 'Hernán Quiroga',
        iniciales: 'HQ',
        estado: 'demorado',
        destino: 'Ciudadela',
        eta: '12:40',
        entregadas: 4,
        paradas: 15,
        x: 676,
        y: 276,
        rumbo: 96,
      },
      {
        id: 'v4',
        patente: 'AC 517 RD',
        chofer: 'Vanina Pérez',
        iniciales: 'VP',
        estado: 'incidencia',
        destino: 'Haedo',
        eta: 'Sin estimar',
        entregadas: 2,
        paradas: 11,
        x: 262,
        y: 148,
        rumbo: 310,
      },
      {
        id: 'v5',
        patente: 'AG 145 BN',
        chofer: 'Mauro Cardozo',
        iniciales: 'MC',
        estado: 'ruta',
        destino: 'Ciudad Jardín',
        eta: '11:35',
        entregadas: 6,
        paradas: 13,
        x: 452,
        y: 238,
        rumbo: 18,
      },
      {
        id: 'v6',
        patente: 'AB 764 XF',
        chofer: 'Estela Molina',
        iniciales: 'EM',
        estado: 'ruta',
        destino: 'Castelar',
        eta: '11:58',
        entregadas: 5,
        paradas: 16,
        x: 218,
        y: 246,
        rumbo: 214,
      },
      {
        id: 'v7',
        patente: 'AE 039 TQ',
        chofer: 'Gonzalo Britos',
        iniciales: 'GB',
        estado: 'demorado',
        destino: 'Liniers',
        eta: '12:15',
        entregadas: 8,
        paradas: 12,
        x: 614,
        y: 382,
        rumbo: 74,
      },
      {
        id: 'v8',
        patente: 'AD 621 HV',
        chofer: 'Paula Cabrera',
        iniciales: 'PC',
        estado: 'planta',
        destino: 'Planta Morón',
        eta: 'En carga',
        entregadas: 0,
        paradas: 14,
        x: 152,
        y: 330,
        rumbo: 0,
      },
    ] as Vehiculo[],
    /** El nombre, el color y el color de fondo de cada estado. Se usa
     *  en el mapa, en la lista y en la referencia: un solo lugar. */
    estados: {
      ruta: { t: 'En ruta', color: '#22D3A5', fondo: 'rgba(34, 211, 165, 0.14)' },
      demorado: { t: 'Demorado', color: '#FBBF24', fondo: 'rgba(251, 191, 36, 0.14)' },
      incidencia: { t: 'Incidencia', color: '#F87171', fondo: 'rgba(248, 113, 113, 0.14)' },
      planta: { t: 'En planta', color: '#7C6BF5', fondo: 'rgba(124, 107, 245, 0.16)' },
    } as Record<EstadoVehiculo, { t: string; color: string; fondo: string }>,
  },

  timeline: {
    titulo: 'Eventos del día',
    eventos: [
      {
        hora: '10:42',
        titulo: 'Rotura de cadena de frío',
        detalle: 'El sensor del acoplado pasó de 4 a 11 grados. Se avisó al cliente.',
        patente: 'AC 517 RD',
        tipo: 'incidencia',
      },
      {
        hora: '10:28',
        titulo: 'Demora en Acceso Oeste',
        detalle: 'Corte de carril por obra entre Ciudadela y Liniers.',
        patente: 'AE 039 TQ',
        tipo: 'demorado',
      },
      {
        hora: '10:06',
        titulo: 'Entrega firmada',
        detalle: 'Supermercado La Rueda, 63 bultos. Remito 26-4811.',
        patente: 'AE 412 KJ',
        tipo: 'entrega',
      },
      {
        hora: '09:51',
        titulo: 'Demora en carga',
        detalle: 'La unidad salió 35 minutos después de lo previsto.',
        patente: 'AF 233 PT',
        tipo: 'demorado',
      },
      {
        hora: '09:34',
        titulo: 'Entrega firmada',
        detalle: 'Autoservicio Cheng, 41 bultos. Remito 26-4807.',
        patente: 'AD 908 LM',
        tipo: 'entrega',
      },
      {
        hora: '09:12',
        titulo: 'Salida de planta',
        detalle: 'Seis unidades cargadas y despachadas al reparto.',
        patente: 'AG 145 BN',
        tipo: 'ruta',
      },
    ] as Evento[],
    /** El color del punto de cada tipo de evento. `entrega` es el único
     *  que no viene de un estado de vehículo. */
    colorEntrega: '#22D3A5',
  },

  /** La barra de abajo, con los totales del turno. Es lo que un jefe de
   *  logística mira sin dejar de ver el mapa. */
  barra: [
    { t: 'Unidades en calle', valor: 7, sufijo: ' de 8' },
    { t: 'Paradas entregadas', valor: 41, sufijo: ' de 107' },
    { t: 'Bultos repartidos', valor: 1284, separador: true },
    { t: 'Kilómetros del turno', valor: 612, separador: true, sufijo: ' km' },
    { t: 'Cumplimiento de ETA', valor: 87, sufijo: '%' },
  ],
}
