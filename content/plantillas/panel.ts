/** Contenido de la plantilla Panel (PLAN.md §16).
 *
 *  Panel de gestión comercial: back office de una distribuidora. Es una
 *  de las dos plantillas one page, así que no hay secciones que se
 *  recorran: todo entra en el viewport y el scroll vive dentro de la
 *  tabla y del panel de actividad.
 *
 *  **El filtro de período manda sobre los datos.** Los tres rangos
 *  —7d, 30d, 90d— traen su propio juego de KPIs, su propia serie del
 *  gráfico y su propio recuento de pedidos. Un dashboard donde el
 *  filtro cambia el label pero no los números es el detalle que lo
 *  delata como maqueta, y es lo primero que mira alguien que usa
 *  software de gestión todos los días.
 *
 *  Los importes van en pesos con separador de miles argentino y ninguno
 *  es redondo. Los deltas tienen signo y dos de ellos son negativos: un
 *  panel donde las cuatro métricas suben no se cree.
 */

/** Un KPI de la fila superior. */
export interface Kpi {
  /** Qué mide. Sentence case, como el resto del sitio. */
  etiqueta: string
  valor: number
  /** `$` para importes, vacío para recuentos. */
  prefijo?: string
  sufijo?: string
  /** Variación porcentual contra el período anterior. Con signo. */
  delta: number
  /** Cuando el KPI baja pero eso es bueno —tiempo de entrega, por
   *  ejemplo—, el color se invierte. */
  bajarEsBueno?: boolean
  /** La línea chica de abajo, con el valor de referencia. */
  pie: string
}

/** Un punto de la serie del gráfico. */
export interface PuntoFacturacion {
  /** Label del eje X. */
  x: string
  /** Serie principal: facturado en el período. */
  facturado: number
  /** Serie de comparación: el mismo tramo del período anterior. */
  anterior: number
}

export type EstadoPedido =
  | 'Entregado'
  | 'En preparación'
  | 'En reparto'
  | 'Demorado'
  | 'Cancelado'

export interface Pedido {
  /** Número de pedido, con el prefijo del año. */
  codigo: string
  cliente: string
  /** Localidad, que es lo que un operador usa para ubicar el pedido. */
  zona: string
  /** Iniciales del avatar y el color del círculo. */
  iniciales: string
  color: string
  importe: number
  items: number
  estado: EstadoPedido
  cuando: string
}

/** Una entrada del panel de actividad de la derecha. */
export interface Actividad {
  quien: string
  iniciales: string
  color: string
  /** Qué hizo. El objeto del verbo va en `objeto` para poder
   *  destacarlo sin partir el string en el JSX. */
  accion: string
  objeto: string
  cuando: string
  /** Marca el tipo de evento con un color en el punto de la línea. */
  tipo: 'alta' | 'cobro' | 'aviso' | 'stock'
}

export const panel = {
  producto: {
    nombre: 'Cavia',
    modulo: 'Gestión comercial',
    /** Va en el logo, en el cuadrado de acento. */
    sigla: 'C',
  },

  /** La cuenta que está usando el panel. Un dashboard sin usuario
   *  identificado se lee como captura de plantilla. */
  usuario: {
    nombre: 'Sofía Aguirre',
    rol: 'Administración',
    iniciales: 'SA',
  },

  nav: {
    titulo: 'Operaciones',
    items: [
      { t: 'Resumen', icono: 'resumen' as const, activo: true },
      { t: 'Pedidos', icono: 'pedidos' as const, pendientes: 14 },
      { t: 'Clientes', icono: 'clientes' as const },
      { t: 'Productos', icono: 'productos' as const },
      { t: 'Facturación', icono: 'facturacion' as const, pendientes: 3 },
      { t: 'Informes', icono: 'informes' as const },
      { t: 'Configuración', icono: 'config' as const },
    ],
  },

  /** El título de la vista. Va aparte y no se toma del nav: indexar ese
   *  array para sacar un string obliga a un chequeo de `undefined` en
   *  el render —el proyecto compila con `noUncheckedIndexedAccess`— y
   *  además acopla el encabezado al orden del menú. */
  vista: 'Resumen',

  topbar: {
    /** El breadcrumb ubica la vista dentro del producto. */
    ruta: ['Operaciones', 'Resumen'],
    buscador: 'Buscar pedido, cliente o producto',
    /** Atajo del buscador, que todo panel real muestra. */
    atajo: '/',
    avisos: 5,
  },

  /** El filtro de período. El primero es el que arranca activo. */
  periodos: [
    { id: '7d' as const, t: '7 días' },
    { id: '30d' as const, t: '30 días' },
    { id: '90d' as const, t: '90 días' },
  ],

  /** Los datos por período. Cambiar el filtro cambia todo esto. */
  datos: {
    '7d': {
      /** Va al lado del título, para que se lea qué rango se está
       *  mirando y no solo el label del botón. */
      rango: '2 al 8 de septiembre',
      comparado: 'vs. 26 de ago al 1 de sep',
      kpis: [
        {
          etiqueta: 'Facturación',
          valor: 4382900,
          prefijo: '$',
          delta: 8.4,
          pie: 'Período anterior $4.043.100',
        },
        {
          etiqueta: 'Pedidos',
          valor: 186,
          delta: 5.1,
          pie: 'Período anterior 177',
        },
        {
          etiqueta: 'Ticket promedio',
          valor: 23564,
          prefijo: '$',
          delta: 3.2,
          pie: 'Período anterior $22.843',
        },
        {
          etiqueta: 'Entregas demoradas',
          valor: 11,
          delta: 22.2,
          bajarEsBueno: true,
          pie: 'Período anterior 9',
        },
      ] as Kpi[],
      serie: [
        { x: 'Mié', facturado: 512400, anterior: 486200 },
        { x: 'Jue', facturado: 648300, anterior: 571800 },
        { x: 'Vie', facturado: 894600, anterior: 812400 },
        { x: 'Sáb', facturado: 738200, anterior: 764900 },
        { x: 'Dom', facturado: 214700, anterior: 198300 },
        { x: 'Lun', facturado: 692800, anterior: 642100 },
        { x: 'Mar', facturado: 681900, anterior: 567400 },
      ] as PuntoFacturacion[],
      /** El resumen de la tabla: cuántos pedidos hay en el período. */
      totalPedidos: 186,
    },

    '30d': {
      rango: '10 de agosto al 8 de septiembre',
      comparado: 'vs. 11 de jul al 9 de ago',
      kpis: [
        {
          etiqueta: 'Facturación',
          valor: 18274600,
          prefijo: '$',
          delta: 12.7,
          pie: 'Período anterior $16.213.400',
        },
        {
          etiqueta: 'Pedidos',
          valor: 812,
          delta: 9.3,
          pie: 'Período anterior 743',
        },
        {
          etiqueta: 'Ticket promedio',
          valor: 22505,
          prefijo: '$',
          delta: 3.1,
          pie: 'Período anterior $21.821',
        },
        {
          etiqueta: 'Entregas demoradas',
          valor: 38,
          delta: -14.6,
          bajarEsBueno: true,
          pie: 'Período anterior 44',
        },
      ] as Kpi[],
      serie: [
        { x: 'Sem 32', facturado: 3842700, anterior: 3521400 },
        { x: 'Sem 33', facturado: 4126800, anterior: 3894600 },
        { x: 'Sem 34', facturado: 3968400, anterior: 4012800 },
        { x: 'Sem 35', facturado: 4514200, anterior: 3721900 },
        { x: 'Sem 36', facturado: 4382900, anterior: 4043100 },
      ] as PuntoFacturacion[],
      totalPedidos: 812,
    },

    '90d': {
      rango: '11 de junio al 8 de septiembre',
      comparado: 'vs. 13 de mar al 10 de jun',
      kpis: [
        {
          etiqueta: 'Facturación',
          valor: 51936200,
          prefijo: '$',
          delta: 6.2,
          pie: 'Período anterior $48.903.700',
        },
        {
          etiqueta: 'Pedidos',
          valor: 2417,
          delta: -2.4,
          pie: 'Período anterior 2.476',
        },
        {
          etiqueta: 'Ticket promedio',
          valor: 21487,
          prefijo: '$',
          delta: 8.8,
          pie: 'Período anterior $19.751',
        },
        {
          etiqueta: 'Entregas demoradas',
          valor: 143,
          delta: -9.5,
          bajarEsBueno: true,
          pie: 'Período anterior 158',
        },
      ] as Kpi[],
      serie: [
        { x: 'Jun', facturado: 15842600, anterior: 16104300 },
        { x: 'Jul', facturado: 16218900, anterior: 15872400 },
        { x: 'Ago', facturado: 17492100, anterior: 16927000 },
      ] as PuntoFacturacion[],
      totalPedidos: 2417,
    },
  },

  grafico: {
    titulo: 'Facturación',
    /** La leyenda de las dos series. */
    series: [
      { id: 'facturado' as const, t: 'Facturado' },
      { id: 'anterior' as const, t: 'Período anterior' },
    ],
    /** El eje Y va en millones para que las etiquetas no midan 12
     *  caracteres. */
    sufijoEje: 'M',
  },

  tabla: {
    titulo: 'Pedidos recientes',
    /** El label del recuento se arma con el total del período. */
    contador: (n: number) => `${n.toLocaleString('es-AR')} en el período`,
    columnas: [
      { t: 'Pedido', clave: 'codigo' },
      { t: 'Cliente', clave: 'cliente' },
      { t: 'Importe', clave: 'importe', derecha: true },
      { t: 'Estado', clave: 'estado' },
      { t: 'Actualizado', clave: 'cuando' },
    ],
    /** Los pedidos alcanzan para desbordar el alto de la tabla: es lo
     *  que hace que el scroll interno tenga sentido. */
    filas: [
      {
        codigo: '#26-4812',
        cliente: 'Almacén Don Vito',
        zona: 'Villa Crespo',
        iniciales: 'DV',
        color: '#2563EB',
        importe: 184600,
        items: 24,
        estado: 'En reparto',
        cuando: 'hace 12 min',
      },
      {
        codigo: '#26-4811',
        cliente: 'Supermercado La Rueda',
        zona: 'Caseros',
        iniciales: 'LR',
        color: '#7C3AED',
        importe: 412800,
        items: 63,
        estado: 'En preparación',
        cuando: 'hace 34 min',
      },
      {
        codigo: '#26-4810',
        cliente: 'Kiosco Estrella',
        zona: 'Flores',
        iniciales: 'KE',
        color: '#059669',
        importe: 48200,
        items: 9,
        estado: 'Entregado',
        cuando: 'hace 1 h',
      },
      {
        codigo: '#26-4809',
        cliente: 'Distribuidora Peralta',
        zona: 'San Justo',
        iniciales: 'DP',
        color: '#DC2626',
        importe: 736400,
        items: 118,
        estado: 'Demorado',
        cuando: 'hace 2 h',
      },
      {
        codigo: '#26-4808',
        cliente: 'Panadería Los Tilos',
        zona: 'Ramos Mejía',
        iniciales: 'LT',
        color: '#D97706',
        importe: 96700,
        items: 17,
        estado: 'Entregado',
        cuando: 'hace 3 h',
      },
      {
        codigo: '#26-4807',
        cliente: 'Autoservicio Cheng',
        zona: 'Almagro',
        iniciales: 'AC',
        color: '#0891B2',
        importe: 268300,
        items: 41,
        estado: 'En reparto',
        cuando: 'hace 4 h',
      },
      {
        codigo: '#26-4806',
        cliente: 'Fiambrería Nápoli',
        zona: 'Boedo',
        iniciales: 'FN',
        color: '#DB2777',
        importe: 127900,
        items: 22,
        estado: 'Entregado',
        cuando: 'hace 5 h',
      },
      {
        codigo: '#26-4805',
        cliente: 'Mayorista Sur',
        zona: 'Lanús',
        iniciales: 'MS',
        color: '#4F46E5',
        importe: 1284500,
        items: 214,
        estado: 'En preparación',
        cuando: 'hace 6 h',
      },
      {
        codigo: '#26-4804',
        cliente: 'Rotisería El Fogón',
        zona: 'Palermo',
        iniciales: 'EF',
        color: '#65A30D',
        importe: 58400,
        items: 11,
        estado: 'Cancelado',
        cuando: 'ayer 18:42',
      },
      {
        codigo: '#26-4803',
        cliente: 'Almacén Godoy',
        zona: 'Chacarita',
        iniciales: 'AG',
        color: '#0D9488',
        importe: 142600,
        items: 26,
        estado: 'Entregado',
        cuando: 'ayer 17:10',
      },
      {
        codigo: '#26-4802',
        cliente: 'Despensa Marcela',
        zona: 'Barracas',
        iniciales: 'DM',
        color: '#9333EA',
        importe: 73800,
        items: 14,
        estado: 'Entregado',
        cuando: 'ayer 15:28',
      },
      {
        codigo: '#26-4801',
        cliente: 'Provisiones Belgrano',
        zona: 'Belgrano',
        iniciales: 'PB',
        color: '#2563EB',
        importe: 328200,
        items: 52,
        estado: 'Demorado',
        cuando: 'ayer 11:04',
      },
    ] as Pedido[],
    /** Qué color lleva cada estado. Los cinco estados tienen el suyo:
     *  es la forma más rápida de leer una tabla larga. */
    estados: {
      Entregado: { fondo: '#ECFDF5', texto: '#047857', punto: '#059669' },
      'En reparto': { fondo: '#EFF6FF', texto: '#1D4ED8', punto: '#2563EB' },
      'En preparación': { fondo: '#F5F3FF', texto: '#6D28D9', punto: '#7C3AED' },
      Demorado: { fondo: '#FFFBEB', texto: '#B45309', punto: '#D97706' },
      Cancelado: { fondo: '#FEF2F2', texto: '#B91C1C', punto: '#DC2626' },
    } as Record<EstadoPedido, { fondo: string; texto: string; punto: string }>,
    /** El pie de la tabla, con el detalle de la fila. */
    detalleItems: (n: number) => `${n} ítems`,
  },

  actividad: {
    titulo: 'Actividad',
    /** El label del filtro que trae todo el historial. */
    enlace: 'Ver todo',
    items: [
      {
        quien: 'Sofía Aguirre',
        iniciales: 'SA',
        color: '#2563EB',
        accion: 'confirmó el pago de',
        objeto: '#26-4810',
        cuando: 'hace 8 min',
        tipo: 'cobro',
      },
      {
        quien: 'Sistema',
        iniciales: 'SY',
        color: '#6B7280',
        accion: 'marcó stock bajo en',
        objeto: 'Aceite girasol 900 ml',
        cuando: 'hace 21 min',
        tipo: 'stock',
      },
      {
        quien: 'Martín Rey',
        iniciales: 'MR',
        color: '#7C3AED',
        accion: 'cargó el pedido',
        objeto: '#26-4812',
        cuando: 'hace 34 min',
        tipo: 'alta',
      },
      {
        quien: 'Sistema',
        iniciales: 'SY',
        color: '#6B7280',
        accion: 'reportó demora en',
        objeto: '#26-4809',
        cuando: 'hace 2 h',
        tipo: 'aviso',
      },
      {
        quien: 'Carla Benítez',
        iniciales: 'CB',
        color: '#059669',
        accion: 'emitió la factura A de',
        objeto: '#26-4806',
        cuando: 'hace 5 h',
        tipo: 'cobro',
      },
      {
        quien: 'Martín Rey',
        iniciales: 'MR',
        color: '#7C3AED',
        accion: 'dio de alta al cliente',
        objeto: 'Mayorista Sur',
        cuando: 'hace 6 h',
        tipo: 'alta',
      },
      {
        quien: 'Sistema',
        iniciales: 'SY',
        color: '#6B7280',
        accion: 'canceló por falta de stock',
        objeto: '#26-4804',
        cuando: 'ayer 18:42',
        tipo: 'aviso',
      },
      {
        quien: 'Carla Benítez',
        iniciales: 'CB',
        color: '#059669',
        accion: 'conciló el pago de',
        objeto: '#26-4803',
        cuando: 'ayer 17:22',
        tipo: 'cobro',
      },
    ] as Actividad[],
    /** El color del punto de la línea, por tipo de evento. */
    tipos: {
      alta: '#2563EB',
      cobro: '#059669',
      aviso: '#DC2626',
      stock: '#D97706',
    } as Record<Actividad['tipo'], string>,
  },

  /** El bloque de abajo del panel derecho: lo que hay que resolver hoy.
   *  Un panel de gestión sin pendientes se lee como demo. */
  pendientes: {
    titulo: 'Para hoy',
    items: [
      { t: 'Facturas por emitir', n: 3, urgente: true },
      { t: 'Pagos a conciliar', n: 7, urgente: false },
      { t: 'Productos sin stock', n: 4, urgente: true },
      { t: 'Clientes sin límite de crédito', n: 2, urgente: false },
    ],
  },
}
