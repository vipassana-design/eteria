/** Contenido de la plantilla Terrazas (PLAN.md §16).
 *
 *  Sitio institucional de una inmobiliaria. Registro cálido y
 *  aspiracional: bronce sobre piedra, fotos grandes de propiedades.
 *  Contrasta con la Clínica —que es luminosa y verde— y con Márquez,
 *  que es sobria y gris.
 *
 *  Lo que hace creíble un sitio inmobiliario son los datos de la ficha:
 *  metros cubiertos y totales por separado, expensas, antigüedad,
 *  orientación, y el código de referencia de la propiedad. Una grilla
 *  con "3 ambientes · $200.000" se lee como plantilla.
 */

export const terrazas = {
  marca: { nombre: 'Terrazas', bajada: 'Propiedades' },

  nav: [
    { t: 'Comprar' },
    { t: 'Alquilar' },
    { t: 'Emprendimientos' },
    { t: 'Tasaciones' },
    { t: 'Nosotros' },
  ],
  cta: 'Publicar mi propiedad',

  hero: {
    volanta: 'Zona norte y corredor oeste',
    titulo: 'Encontrá la propiedad\nque estabas buscando',
    bajada: '412 propiedades publicadas, con visitas coordinadas en el día.',
    foto: '/plantillas/terrazas/hero.webp',
    fotoAlt: 'Frente de una casa al atardecer',
    /** El buscador del hero: es lo primero que se usa en estos sitios. */
    buscador: {
      operacion: ['Comprar', 'Alquilar'],
      tipos: ['Departamento', 'Casa', 'PH', 'Local', 'Terreno'],
      zonas: ['Belgrano', 'Núñez', 'Vicente López', 'Olivos', 'San Isidro'],
      ambientes: ['1 ambiente', '2 ambientes', '3 ambientes', '4 o más'],
      cta: 'Buscar',
      etiquetas: {
        operacion: 'Operación',
        tipo: 'Tipo',
        zona: 'Zona',
        ambientes: 'Ambientes',
      },
    },
  },

  destacadas: {
    volanta: 'Selección de la semana',
    titulo: 'Propiedades destacadas',
    enlace: 'Ver las 412 propiedades',
    /** Las fichas. Cada una con datos distintos y ninguna redonda: es
     *  lo que separa un listado real de una demostración. */
    items: [
      {
        ref: 'BEL-2841',
        titulo: 'Departamento de 3 ambientes',
        zona: 'Belgrano R',
        calle: 'Superí al 1600',
        precio: 'US$ 189.000',
        expensas: '$142.000 de expensas',
        cubierta: 78,
        total: 86,
        ambientes: 3,
        banos: 2,
        cochera: true,
        antiguedad: '12 años',
        orientacion: 'Frente, al norte',
        etiqueta: 'Apto crédito',
        foto: '/plantillas/terrazas/prop-1.webp',
        alt: 'Living de un departamento luminoso',
      },
      {
        ref: 'VLO-1177',
        titulo: 'Casa de 4 ambientes con jardín',
        zona: 'Vicente López',
        calle: 'Pelliza al 2400',
        precio: 'US$ 345.000',
        expensas: 'Sin expensas',
        cubierta: 164,
        total: 320,
        ambientes: 4,
        banos: 3,
        cochera: true,
        antiguedad: '28 años',
        orientacion: 'Contrafrente',
        etiqueta: null,
        foto: '/plantillas/terrazas/prop-2.webp',
        alt: 'Interior de una casa con escalera',
      },
      {
        ref: 'NUÑ-0932',
        titulo: 'PH de 2 ambientes reciclado',
        zona: 'Núñez',
        calle: 'Cabildo al 4100',
        precio: 'US$ 124.500',
        expensas: '$38.000 de expensas',
        cubierta: 52,
        total: 61,
        ambientes: 2,
        banos: 1,
        cochera: false,
        antiguedad: 'A estrenar',
        orientacion: 'Interno, muy luminoso',
        etiqueta: 'Recién publicada',
        foto: '/plantillas/terrazas/prop-3.webp',
        alt: 'Ambiente reciclado con muebles claros',
      },
    ],
    /** Las etiquetas de la ficha, para no repetirlas en el JSX. */
    ficha: {
      cubierta: 'm² cubiertos',
      total: 'm² totales',
      ambientes: 'ambientes',
      banos: 'baños',
      /** El singular. Un PH con "1 baños" es el error que delata que la
       *  ficha se armó concatenando y nadie la leyó. */
      bano: 'baño',
      cochera: 'Cochera',
      sinCochera: 'Sin cochera',
      ver: 'Ver la ficha',
    },
  },

  zonas: {
    volanta: 'Dónde trabajamos',
    titulo: 'Zonas y valores',
    bajada:
      'El valor del metro cuadrado se actualiza con las operaciones cerradas del último trimestre.',
    items: [
      { z: 'Belgrano', n: 96, valor: 'US$ 2.480', var: '+3,1%' },
      { z: 'Núñez', n: 71, valor: 'US$ 2.310', var: '+2,4%' },
      { z: 'Vicente López', n: 88, valor: 'US$ 2.190', var: '+1,8%' },
      { z: 'Olivos', n: 64, valor: 'US$ 2.050', var: '+2,9%' },
      { z: 'San Isidro', n: 93, valor: 'US$ 2.640', var: '+4,2%' },
    ],
    encabezados: { zona: 'Zona', n: 'Publicadas', valor: 'Valor del m²', var: 'Trimestre' },
  },

  servicios: {
    volanta: 'Cómo acompañamos',
    titulo: 'Más que publicar el aviso',
    items: [
      {
        t: 'Tasación en 48 horas',
        d: 'Visitamos la propiedad y entregamos un informe con las operaciones comparables de la zona.',
      },
      {
        t: 'Visitas coordinadas',
        d: 'Agendamos las visitas y acompañamos cada una. El propietario no tiene que estar.',
      },
      {
        t: 'Escritura acompañada',
        d: 'Trabajamos con dos escribanías de la zona y seguimos el trámite hasta la firma.',
      },
    ],
  },

  cifras: {
    titulo: 'La inmobiliaria',
    items: [
      { n: 412, s: '', t: 'propiedades publicadas' },
      { n: 24, s: '', t: 'años en la zona' },
      { n: 186, s: '', t: 'operaciones el año pasado' },
      { n: 9, s: ' días', t: 'promedio hasta la primera visita' },
    ],
  },

  contacto: {
    titulo: '¿Querés tasar tu propiedad?',
    bajada:
      'Dejanos los datos y coordinamos una visita. La tasación no tiene costo ni compromiso.',
    campos: { nombre: 'Nombre y apellido', tel: 'Teléfono', zona: 'Zona de la propiedad' },
    cta: 'Solicitar tasación',
    nota: 'Te respondemos dentro del día hábil siguiente.',
    oficina: {
      t: 'Oficina',
      dir: 'Av. Cabildo 2580, piso 3',
      hora: 'Lunes a viernes de 9 a 18, sábados de 10 a 13',
      tel: '011 4783 5500',
    },
  },

  pie: {
    columnas: [
      { t: 'Operaciones', items: ['Comprar', 'Alquilar', 'Emprendimientos', 'Tasaciones'] },
      { t: 'Zonas', items: ['Belgrano', 'Núñez', 'Vicente López', 'Olivos', 'San Isidro'] },
      { t: 'Terrazas', items: ['Nosotros', 'El equipo', 'Trabajá con nosotros', 'Contacto'] },
    ],
    legal: '© 2026 Terrazas Propiedades. Matrícula CUCICBA 7412.',
  },
}
