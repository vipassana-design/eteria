/** Contenido de la plantilla Márquez & Asociados (PLAN.md §16).
 *
 *  Sitio de un estudio jurídico. Es la plantilla **seria** del set:
 *  registro institucional sobrio, jerarquía por tipografía y
 *  espaciado, cero animación decorativa. Contrasta con la Clínica
 *  —luminosa y verde— y con Terrazas, que es cálida y aspiracional.
 *
 *  Sobria no es apagada: el bronce aparece en las volantas, los filetes
 *  y los datos, y la franja de trayectoria va sobre el azul petróleo.
 *
 *  Lo que hace creíble un sitio de abogados es exactamente lo que una
 *  plantilla genérica no tiene: la matrícula del CPACF de cada socio,
 *  el año de fundación, las áreas de práctica nombradas como las nombra
 *  el fuero y no como las nombraría un folleto, y una dirección de
 *  microcentro con piso. "Soluciones legales integrales" no es ninguna
 *  de esas cosas.
 */

export const marquez = {
  marca: {
    nombre: 'Márquez & Asociados',
    bajada: 'Abogados',
  },

  /** El teléfono va visible en la barra. En un estudio jurídico la
   *  primera consulta se hace por teléfono, no por formulario: quien
   *  tiene una audiencia el martes no espera un mail. */
  contactoBarra: {
    etiqueta: 'Consultas',
    tel: '011 4331 7280',
  },

  nav: [
    { t: 'El estudio' },
    { t: 'Áreas de práctica' },
    { t: 'Socios' },
    { t: 'Publicaciones' },
    { t: 'Contacto' },
  ],
  cta: 'Solicitar una consulta',

  hero: {
    volanta: 'Estudio jurídico · Ciudad de Buenos Aires',
    titulo: 'Asesoramiento jurídico\npara empresas y familias',
    bajada:
      'Trabajamos en derecho societario, laboral y tributario, y en los procesos de familia y sucesiones. Cada expediente lo sigue un socio del estudio.',
    cta: 'Solicitar una consulta',
    secundario: 'Ver áreas de práctica',
    foto: '/plantillas/marquez/hero.webp',
    fotoAlt: 'Sala de reuniones del estudio',
    /** Los tres datos de la firma, bajo el titular. */
    datos: [
      { t: 'Fundado en', d: '1987' },
      { t: 'Socios', d: 'Cuatro' },
      { t: 'Sede', d: 'Microcentro' },
    ],
  },

  areas: {
    volanta: 'Qué hacemos',
    titulo: 'Áreas de práctica',
    bajada:
      'Seis áreas, con un socio responsable en cada una. Las consultas que quedan fuera se derivan a colegas de confianza.',
    /** Las seis áreas. `icono` elige el trazo SVG que dibuja cada una:
     *  los iconos se dibujan a mano en la parte, sin librería. Dos
     *  líneas de texto por área —qué incluye y en qué etapa se
     *  interviene— porque una sola línea obliga a resumir en un
     *  adjetivo y ahí se pierde la información. */
    items: [
      {
        t: 'Derecho societario',
        icono: 'societario',
        d1: 'Constitución de sociedades, aumentos de capital, actas y reformas de estatuto.',
        d2: 'Acuerdos de socios y conflictos entre accionistas.',
      },
      {
        t: 'Derecho laboral',
        icono: 'laboral',
        d1: 'Representación del empleador en reclamos individuales y ante el SECLO.',
        d2: 'Auditoría de contratos, liquidaciones finales y desvinculaciones.',
      },
      {
        t: 'Derecho tributario',
        icono: 'tributario',
        d1: 'Determinaciones de oficio, planes de pago y recursos ante AFIP y ARBA.',
        d2: 'Planificación fiscal de la operación y del grupo familiar.',
      },
      {
        t: 'Derecho de familia',
        icono: 'familia',
        d1: 'Divorcios, convenios de alimentos y régimen de comunicación.',
        d2: 'Acuerdos previos a la instancia judicial cuando el caso lo permite.',
      },
      {
        t: 'Sucesiones',
        icono: 'sucesiones',
        d1: 'Trámites sucesorios, declaratoria de herederos y partición de bienes.',
        d2: 'Testamentos, donaciones y planificación patrimonial.',
      },
      {
        t: 'Litigios y arbitraje',
        icono: 'litigios',
        d1: 'Juicios comerciales, cobros ejecutivos y daños en fuero civil y comercial.',
        d2: 'Arbitrajes ante el Tribunal de Arbitraje General de la Bolsa.',
      },
    ],
  },

  socios: {
    volanta: 'Quiénes somos',
    titulo: 'Los socios',
    bajada:
      'La matrícula es pública: se verifica en el padrón del Colegio Público de Abogados de la Capital Federal.',
    /** La matrícula con el formato real del CPACF: tomo y folio. Es el
     *  dato verificable que ninguna plantilla de estudio incluye, y el
     *  que un cliente corporativo efectivamente chequea. */
    items: [
      {
        n: 'Eduardo Márquez',
        e: 'Derecho societario y litigios comerciales',
        m: 'T° 42 F° 118 CPACF',
        d: 'Socio fundador. Universidad de Buenos Aires, 1984.',
        foto: '/plantillas/marquez/socio-1.webp',
        alt: 'Retrato de Eduardo Márquez',
      },
      {
        n: 'Silvia Ferreyra',
        e: 'Derecho laboral',
        m: 'T° 68 F° 903 CPACF',
        d: 'Especialista en derecho del trabajo, UBA. En el estudio desde 1998.',
        foto: '/plantillas/marquez/socio-2.webp',
        alt: 'Retrato de Silvia Ferreyra',
      },
      {
        n: 'Ignacio Bustos',
        e: 'Derecho tributario',
        m: 'T° 98 F° 412 CPACF',
        d: 'Contador público y abogado. Posgrado en tributación, Universidad Austral.',
        foto: '/plantillas/marquez/socio-3.webp',
        alt: 'Retrato de Ignacio Bustos',
      },
      {
        n: 'Laura Recalde',
        e: 'Familia y sucesiones',
        m: 'T° 87 F° 254 CPACF',
        d: 'Mediadora inscripta en el Ministerio de Justicia de la Nación.',
        foto: '/plantillas/marquez/socio-4.webp',
        alt: 'Retrato de Laura Recalde',
      },
    ],
  },

  /** La franja sobre el azul petróleo. Rompe el blanco de la página y
   *  concentra lo verificable: años, expedientes, socios, clientes con
   *  asesoramiento permanente. Nada de porcentajes de éxito, que en
   *  ejercicio profesional no se pueden publicitar. */
  trayectoria: {
    volanta: 'Desde 1987',
    titulo: 'Treinta y nueve años de ejercicio',
    bajada:
      'El estudio abrió en 1987 en Lavalle y Uruguay. Desde 2004 funciona en la sede actual de San Martín 483.',
    items: [
      { n: 39, s: '', t: 'años de ejercicio' },
      { n: 1240, s: '', t: 'expedientes tramitados' },
      { n: 4, s: '', t: 'socios y 11 abogados' },
      { n: 62, s: '', t: 'empresas con asesoramiento permanente' },
    ],
  },

  publicaciones: {
    volanta: 'Publicaciones',
    titulo: 'Novedades y comentarios de fallos',
    enlace: 'Ver todas las publicaciones',
    items: [
      {
        fecha: '18 de agosto de 2026',
        area: 'Derecho laboral',
        t: 'El nuevo tope indemnizatorio y su aplicación a despidos anteriores',
        d: 'La Cámara volvió sobre el criterio de Vizzoti en dos fallos de junio. Qué cambia en la práctica para las liquidaciones en curso.',
        firma: 'Silvia Ferreyra',
      },
      {
        fecha: '3 de julio de 2026',
        area: 'Derecho societario',
        t: 'Registro de sociedades por acciones simplificadas: qué queda de la SAS en la Ciudad',
        d: 'Balance de las resoluciones de la Inspección General de Justicia de los últimos dos años y alternativas de estructura societaria.',
        firma: 'Eduardo Márquez',
      },
    ],
  },

  consulta: {
    volanta: 'Contacto',
    titulo: 'Solicitar una consulta',
    bajada:
      'La primera reunión es de treinta minutos y sirve para definir si el estudio es el indicado para el caso. Se coordina por teléfono o por este formulario.',
    campos: {
      nombre: 'Nombre y apellido',
      correo: 'Correo electrónico',
      tel: 'Teléfono',
      tipo: 'Tipo de consulta',
      detalle: 'Motivo de la consulta',
    },
    /** El `<select>` del formulario: las opciones son las áreas de
     *  práctica más "otra", que es la que evita que alguien con un caso
     *  fuera de la lista abandone el formulario. */
    tipos: [
      'Derecho societario',
      'Derecho laboral',
      'Derecho tributario',
      'Derecho de familia',
      'Sucesiones',
      'Litigios y arbitraje',
      'Otra consulta',
    ],
    cta: 'Enviar la consulta',
    nota: 'La consulta no genera relación profesional hasta que se firme el convenio de honorarios.',
  },

  pie: {
    sede: {
      t: 'Sede',
      dir: 'San Martín 483, piso 6',
      detalle: 'C1004AAI, Ciudad Autónoma de Buenos Aires',
    },
    horario: {
      t: 'Horario de atención',
      d: 'Lunes a viernes de 9 a 18. Reuniones con turno previo.',
    },
    contacto: {
      t: 'Contacto',
      tel: '011 4331 7280',
      correo: 'consultas@marquez-demo.test',
    },
    columnas: [
      {
        t: 'Áreas',
        items: ['Societario', 'Laboral', 'Tributario', 'Familia', 'Sucesiones', 'Litigios'],
      },
      {
        t: 'El estudio',
        items: ['Historia', 'Socios', 'Publicaciones', 'Trabajá con nosotros'],
      },
    ],
    legal:
      '© 2026 Márquez & Asociados. Matriculados en el Colegio Público de Abogados de la Capital Federal.',
  },
}
