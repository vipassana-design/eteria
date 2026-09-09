/** Contenido de la plantilla Legajos (PLAN.md §16).
 *
 *  Sistema de recursos humanos: dotación, licencias y organigrama. A
 *  diferencia de las otras dos de software a medida, esta scrollea —es
 *  un sistema de gestión con varias vistas apiladas, no un tablero de
 *  monitoreo.
 *
 *  El registro es administrativo pero cálido: el fondo tira a hueso y
 *  el acento es índigo. Un sistema de RR. HH. en gris frío se lee como
 *  software de los 2000, y el rubro es el que más trato con personas
 *  tiene de las tres.
 *
 *  **El área de cada persona filtra la tabla.** El filtro no es
 *  decorativo: recorta las filas y recalcula el recuento. Es la
 *  interacción que más rápido comunica que hay datos abajo y no una
 *  captura.
 *
 *  Las antigüedades salen de la fecha de ingreso, no van escritas
 *  aparte: así no se contradicen. Los cumpleaños y los vencimientos son
 *  del mes en curso —septiembre— para que el panel se lea como algo que
 *  está corriendo hoy.
 */

export type EstadoPersona = 'Activo' | 'Licencia' | 'Vacaciones' | 'Ingreso'

export interface Persona {
  /** Número de legajo. Es el identificador que usa RR. HH. */
  legajo: string
  nombre: string
  iniciales: string
  /** Color del círculo de iniciales. */
  color: string
  puesto: string
  area: string
  /** Fecha de ingreso, en formato argentino. */
  ingreso: string
  /** Antigüedad ya calculada, para no hacer aritmética de fechas en el
   *  render. */
  antiguedad: string
  estado: EstadoPersona
  /** Modalidad de trabajo: un dato que todo sistema de RR. HH. de 2026
   *  tiene y que ubica la plantilla en el presente. */
  modalidad: 'Presencial' | 'Híbrido' | 'Remoto'
}

/** Un tramo de licencia en el calendario del mes. */
export interface TramoLicencia {
  /** A quién corresponde. Cruza con `Persona.nombre`. */
  quien: string
  iniciales: string
  color: string
  /** Día del mes en el que empieza, de 1 a 30. */
  desde: number
  /** Día del mes en el que termina, inclusive. */
  hasta: number
  tipo: 'Vacaciones' | 'Médica' | 'Estudio' | 'Maternidad' | 'Gremial'
}

export const legajos = {
  producto: {
    nombre: 'Nómina',
    modulo: 'Legajos y licencias',
    sigla: 'N',
  },

  usuario: {
    nombre: 'Andrea Villalba',
    rol: 'Recursos humanos',
    iniciales: 'AV',
  },

  topbar: {
    buscador: 'Buscar por nombre, legajo o área',
    /** El período que se está mirando. */
    periodo: 'Septiembre 2026',
    acciones: [{ t: 'Nuevo legajo', principal: true }, { t: 'Exportar' }],
    avisos: 4,
  },

  nav: [
    { t: 'Panel', activo: true },
    { t: 'Personal' },
    { t: 'Licencias' },
    { t: 'Estructura' },
    { t: 'Documentación' },
  ],

  cabecera: {
    titulo: 'Panel de personal',
    bajada: 'Dotación, licencias del mes y vencimientos de documentación.',
  },

  /** Las cuatro tarjetas de resumen. Cada una lleva su color: es lo que
   *  le saca el gris al panel sin recurrir a fotos. */
  resumen: [
    {
      etiqueta: 'Dotación',
      valor: 148,
      pie: '6 altas en el trimestre',
      color: '#4F46E5',
      fondo: '#EEF2FF',
      icono: 'personas' as const,
    },
    {
      etiqueta: 'Licencias activas',
      valor: 11,
      pie: '4 médicas, 7 vacaciones',
      color: '#0891B2',
      fondo: '#ECFEFF',
      icono: 'licencia' as const,
    },
    {
      etiqueta: 'Ingresos del mes',
      valor: 3,
      pie: 'Dos en sistemas, uno en ventas',
      color: '#059669',
      fondo: '#ECFDF5',
      icono: 'alta' as const,
    },
    {
      etiqueta: 'Cumpleaños del mes',
      valor: 7,
      pie: 'El próximo es el 12 de septiembre',
      color: '#D97706',
      fondo: '#FFFBEB',
      icono: 'torta' as const,
    },
  ],

  tabla: {
    titulo: 'Personal',
    /** El filtro por área. `todas` viene primero y arranca activo. */
    filtroTitulo: 'Área',
    areas: ['Todas', 'Sistemas', 'Ventas', 'Administración', 'Operaciones', 'RR. HH.'],
    contador: (n: number, total: number) =>
      n === total
        ? `${total} personas`
        : `${n} de ${total} personas`,
    /** El aviso de cuando el filtro no deja nada. No debería pasar con
     *  estos datos, pero un sistema sin estado vacío está a medio
     *  hacer. */
    vacio: 'No hay personal en esa área.',
    columnas: [
      { t: 'Persona' },
      { t: 'Área' },
      { t: 'Ingreso' },
      { t: 'Antigüedad' },
      { t: 'Estado' },
    ],
    personas: [
      {
        legajo: '1042',
        nombre: 'Ramiro Etchegaray',
        iniciales: 'RE',
        color: '#4F46E5',
        puesto: 'Líder de desarrollo',
        area: 'Sistemas',
        ingreso: '14/03/2019',
        antiguedad: '7 años',
        estado: 'Activo',
        modalidad: 'Híbrido',
      },
      {
        legajo: '1188',
        nombre: 'Julieta Brizuela',
        iniciales: 'JB',
        color: '#0891B2',
        puesto: 'Analista de datos',
        area: 'Sistemas',
        ingreso: '02/08/2021',
        antiguedad: '5 años',
        estado: 'Vacaciones',
        modalidad: 'Remoto',
      },
      {
        legajo: '1291',
        nombre: 'Facundo Ledesma',
        iniciales: 'FL',
        color: '#059669',
        puesto: 'Jefe de ventas',
        area: 'Ventas',
        ingreso: '25/01/2018',
        antiguedad: '8 años',
        estado: 'Activo',
        modalidad: 'Presencial',
      },
      {
        legajo: '1305',
        nombre: 'Marina Kowalczyk',
        iniciales: 'MK',
        color: '#DB2777',
        puesto: 'Ejecutiva de cuentas',
        area: 'Ventas',
        ingreso: '11/09/2023',
        antiguedad: '3 años',
        estado: 'Licencia',
        modalidad: 'Híbrido',
      },
      {
        legajo: '1044',
        nombre: 'Osvaldo Peralta',
        iniciales: 'OP',
        color: '#D97706',
        puesto: 'Contador',
        area: 'Administración',
        ingreso: '03/05/2016',
        antiguedad: '10 años',
        estado: 'Activo',
        modalidad: 'Presencial',
      },
      {
        legajo: '1367',
        nombre: 'Ailén Sosa',
        iniciales: 'AS',
        color: '#7C3AED',
        puesto: 'Analista de liquidaciones',
        area: 'Administración',
        ingreso: '18/06/2024',
        antiguedad: '2 años',
        estado: 'Activo',
        modalidad: 'Híbrido',
      },
      {
        legajo: '1129',
        nombre: 'Emiliano Tessari',
        iniciales: 'ET',
        color: '#0D9488',
        puesto: 'Supervisor de depósito',
        area: 'Operaciones',
        ingreso: '07/11/2020',
        antiguedad: '5 años',
        estado: 'Activo',
        modalidad: 'Presencial',
      },
      {
        legajo: '1412',
        nombre: 'Rocío Maidana',
        iniciales: 'RM',
        color: '#DC2626',
        puesto: 'Operaria de depósito',
        area: 'Operaciones',
        ingreso: '01/09/2026',
        antiguedad: '8 días',
        estado: 'Ingreso',
        modalidad: 'Presencial',
      },
      {
        legajo: '1073',
        nombre: 'Andrea Villalba',
        iniciales: 'AV',
        color: '#4F46E5',
        puesto: 'Responsable de RR. HH.',
        area: 'RR. HH.',
        ingreso: '22/02/2017',
        antiguedad: '9 años',
        estado: 'Activo',
        modalidad: 'Híbrido',
      },
      {
        legajo: '1398',
        nombre: 'Nicolás Vergara',
        iniciales: 'NV',
        color: '#2563EB',
        puesto: 'Desarrollador',
        area: 'Sistemas',
        ingreso: '05/09/2026',
        antiguedad: '4 días',
        estado: 'Ingreso',
        modalidad: 'Remoto',
      },
      {
        legajo: '1256',
        nombre: 'Gabriela Ruiz Díaz',
        iniciales: 'GR',
        color: '#9333EA',
        puesto: 'Diseñadora de producto',
        area: 'Sistemas',
        ingreso: '30/10/2022',
        antiguedad: '3 años',
        estado: 'Activo',
        modalidad: 'Remoto',
      },
      {
        legajo: '1201',
        nombre: 'Sebastián Arrúa',
        iniciales: 'SA',
        color: '#65A30D',
        puesto: 'Vendedor de mostrador',
        area: 'Ventas',
        ingreso: '16/04/2022',
        antiguedad: '4 años',
        estado: 'Vacaciones',
        modalidad: 'Presencial',
      },
    ] as Persona[],
    /** Color por estado. Los cuatro estados tienen el suyo. */
    estados: {
      Activo: { fondo: '#ECFDF5', texto: '#047857', punto: '#059669' },
      Licencia: { fondo: '#FEF2F2', texto: '#B91C1C', punto: '#DC2626' },
      Vacaciones: { fondo: '#ECFEFF', texto: '#0E7490', punto: '#0891B2' },
      Ingreso: { fondo: '#EEF2FF', texto: '#4338CA', punto: '#4F46E5' },
    } as Record<EstadoPersona, { fondo: string; texto: string; punto: string }>,
  },

  organigrama: {
    titulo: 'Estructura',
    bajada: 'Tres niveles de reporte. La dotación de cada área está entre paréntesis.',
    /** Un organigrama de tres niveles. Las coordenadas son del viewBox
     *  del SVG: dibujarlo con divs y líneas absolutas se rompe al
     *  primer cambio de ancho, y un SVG con viewBox escala solo. */
    raiz: { t: 'Dirección general', quien: 'Elsa Bustamante', x: 470, y: 34 },
    nivel2: [
      { t: 'Sistemas', quien: 'Ramiro Etchegaray', n: 34, x: 128, y: 148, color: '#4F46E5' },
      { t: 'Comercial', quien: 'Facundo Ledesma', n: 41, x: 356, y: 148, color: '#059669' },
      { t: 'Administración', quien: 'Osvaldo Peralta', n: 22, x: 584, y: 148, color: '#D97706' },
      { t: 'Operaciones', quien: 'Emiliano Tessari', n: 51, x: 812, y: 148, color: '#0D9488' },
    ],
    nivel3: [
      { t: 'Desarrollo', n: 19, padre: 0, x: 60, y: 262 },
      { t: 'Datos', n: 8, padre: 0, x: 196, y: 262 },
      { t: 'Ventas', n: 28, padre: 1, x: 332, y: 262 },
      { t: 'Posventa', n: 13, padre: 1, x: 468, y: 262 },
      { t: 'Contable', n: 14, padre: 2, x: 604, y: 262 },
      { t: 'Compras', n: 8, padre: 2, x: 740, y: 262 },
      { t: 'Depósito', n: 51, padre: 3, x: 876, y: 262 },
    ],
  },

  calendario: {
    titulo: 'Licencias de septiembre',
    bajada: 'Cada barra es una licencia aprobada. El día de hoy va marcado.',
    /** Cuántos días tiene el mes que se muestra. */
    dias: 30,
    /** El día de hoy, para la línea vertical. */
    hoy: 9,
    /** Qué día de la semana cae el 1. 0 es lunes: septiembre de 2026
     *  arranca martes. */
    primerDia: 1,
    /** Las iniciales de los días, para la fila de encabezado. */
    semana: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    /** Color por tipo de licencia. */
    tipos: {
      Vacaciones: '#0891B2',
      Médica: '#DC2626',
      Estudio: '#7C3AED',
      Maternidad: '#DB2777',
      Gremial: '#D97706',
    } as Record<TramoLicencia['tipo'], string>,
    tramos: [
      {
        quien: 'Julieta Brizuela',
        iniciales: 'JB',
        color: '#0891B2',
        desde: 1,
        hasta: 14,
        tipo: 'Vacaciones',
      },
      {
        quien: 'Sebastián Arrúa',
        iniciales: 'SA',
        color: '#65A30D',
        desde: 7,
        hasta: 21,
        tipo: 'Vacaciones',
      },
      {
        quien: 'Marina Kowalczyk',
        iniciales: 'MK',
        color: '#DB2777',
        desde: 4,
        hasta: 11,
        tipo: 'Médica',
      },
      {
        quien: 'Lucas Arizmendi',
        iniciales: 'LA',
        color: '#7C3AED',
        desde: 15,
        hasta: 17,
        tipo: 'Estudio',
      },
      {
        quien: 'Carolina Nieto',
        iniciales: 'CN',
        color: '#DB2777',
        desde: 1,
        hasta: 30,
        tipo: 'Maternidad',
      },
      {
        quien: 'Hugo Damiani',
        iniciales: 'HD',
        color: '#D97706',
        desde: 22,
        hasta: 24,
        tipo: 'Gremial',
      },
      {
        quien: 'Verónica Alcaraz',
        iniciales: 'VA',
        color: '#0891B2',
        desde: 18,
        hasta: 30,
        tipo: 'Vacaciones',
      },
    ] as TramoLicencia[],
  },

  vencimientos: {
    titulo: 'Vencimientos de documentación',
    bajada: 'Ordenados por fecha. Los vencidos van primero.',
    /** El label del enlace de cada fila. */
    accion: 'Ver legajo',
    items: [
      {
        quien: 'Emiliano Tessari',
        iniciales: 'ET',
        color: '#0D9488',
        doc: 'Libreta sanitaria',
        vence: '28/08/2026',
        estado: 'Vencido',
        dias: -12,
      },
      {
        quien: 'Rubén Ocampo',
        iniciales: 'RO',
        color: '#DC2626',
        doc: 'Licencia de conducir profesional',
        vence: '11/09/2026',
        estado: 'Por vencer',
        dias: 2,
      },
      {
        quien: 'Rocío Maidana',
        iniciales: 'RM',
        color: '#DC2626',
        doc: 'Examen preocupacional',
        vence: '15/09/2026',
        estado: 'Por vencer',
        dias: 6,
      },
      {
        quien: 'Facundo Ledesma',
        iniciales: 'FL',
        color: '#059669',
        doc: 'Curso de seguridad e higiene',
        vence: '30/09/2026',
        estado: 'Por vencer',
        dias: 21,
      },
      {
        quien: 'Ailén Sosa',
        iniciales: 'AS',
        color: '#7C3AED',
        doc: 'Matrícula profesional',
        vence: '19/11/2026',
        estado: 'Al día',
        dias: 71,
      },
      {
        quien: 'Gabriela Ruiz Díaz',
        iniciales: 'GR',
        color: '#9333EA',
        doc: 'Constancia de CUIL',
        vence: '02/02/2027',
        estado: 'Al día',
        dias: 146,
      },
    ],
    /** Color por estado del vencimiento. */
    estados: {
      Vencido: { fondo: '#FEF2F2', texto: '#B91C1C', barra: '#DC2626' },
      'Por vencer': { fondo: '#FFFBEB', texto: '#B45309', barra: '#D97706' },
      'Al día': { fondo: '#ECFDF5', texto: '#047857', barra: '#059669' },
    } as Record<string, { fondo: string; texto: string; barra: string }>,
    /** Cómo se lee la columna de días. Negativo es vencido. */
    leyendaDias: (d: number) =>
      d < 0 ? `${Math.abs(d)} días vencido` : d === 0 ? 'Vence hoy' : `En ${d} días`,
  },

  pie: {
    legal: 'Nómina · Sistema de demostración. Los datos del personal son ficticios.',
  },
}
