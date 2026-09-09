/** Contenido de la plantilla Feria (PLAN.md §16).
 *
 *  Marketplace de varios vendedores. Es el tercer ecommerce del set y
 *  se diferencia de los otros dos por lo que **solo un marketplace
 *  tiene**: cada producto pertenece a una tienda distinta, con su
 *  reputación, su tiempo de despacho y sus ventas acumuladas. Atelier
 *  vende lo propio y Vértice también; acá el sitio es la plaza, no el
 *  comerciante.
 *
 *  Ese es el detalle que hace creíble el rubro: sin el nombre del
 *  vendedor y su puntaje, un marketplace es una tienda cualquiera con
 *  más productos.
 */

export const feria = {
  marca: { nombre: 'Feria', bajada: 'Comprá y vendé' },

  nav: [
    { t: 'Categorías' },
    { t: 'Ofertas' },
    { t: 'Vender' },
    { t: 'Ayuda' },
  ],

  /** Las categorías del menú horizontal, con su cantidad. */
  categorias: [
    { t: 'Hogar', n: 12480 },
    { t: 'Deportes', n: 8215 },
    { t: 'Herramientas', n: 6902 },
    { t: 'Jardín', n: 4137 },
    { t: 'Mascotas', n: 3568 },
    { t: 'Bazar', n: 9741 },
  ],

  hero: {
    titulo: 'Todo lo que buscás,\nde vendedores con reputación',
    bajada:
      '48.000 productos de 1.240 tiendas. Con protección de compra y devolución sin cargo.',
    buscador: { campo: 'Buscar entre 48.000 productos', cta: 'Buscar' },
    /** Las búsquedas frecuentes: dicen que hay gente usando el sitio. */
    frecuentes: ['taladro percutor', 'silla de escritorio', 'pelota nº5', 'maceta grande'],
  },

  /** Las tres señales de confianza. En un marketplace son lo que
   *  reemplaza a la marca propia: quien compra no conoce al vendedor. */
  señales: [
    { t: 'Protección de compra', d: 'Si no llega o no es lo que esperabas, te devolvemos el dinero' },
    { t: 'Vendedores verificados', d: 'Validamos identidad y domicilio fiscal de cada tienda' },
    { t: 'Devolución sin cargo', d: '10 días desde que lo recibís, con etiqueta de retiro' },
  ],

  listado: {
    volanta: 'Lo más buscado esta semana',
    titulo: 'Destacados de la semana',
    enlace: 'Ver todo',
    /** Los seis productos. Cada uno de una tienda distinta y con
     *  reputación, despacho y ventas propios: eso es lo que solo un
     *  marketplace muestra. */
    items: [
      {
        nombre: 'Taladro percutor 750 W con maletín',
        precio: 189900,
        antes: 234000,
        cuotas: '6 cuotas sin interés',
        envio: 'Llega gratis mañana',
        tienda: { n: 'Herramientas del Sur', rep: 4.8, ventas: 3412, oficial: true },
        etiqueta: '-19%',
        vistas: 84,
      },
      {
        nombre: 'Silla de escritorio ergonómica con apoyabrazos',
        precio: 312500,
        antes: null,
        cuotas: '12 cuotas sin interés',
        envio: 'Llega gratis el viernes',
        tienda: { n: 'Mobiliario Norte', rep: 4.6, ventas: 1289, oficial: false },
        etiqueta: null,
        vistas: 41,
      },
      {
        nombre: 'Set de 3 macetas de cemento alisado',
        precio: 47800,
        antes: 56000,
        cuotas: '3 cuotas sin interés',
        envio: 'Envío $4.200',
        tienda: { n: 'Vivero Las Lomas', rep: 4.9, ventas: 786, oficial: false },
        etiqueta: '-15%',
        vistas: 23,
      },
      {
        nombre: 'Pelota de fútbol nº 5 cosida a máquina',
        precio: 38400,
        antes: null,
        cuotas: '3 cuotas sin interés',
        envio: 'Llega gratis mañana',
        tienda: { n: 'Deportes Almagro', rep: 4.7, ventas: 5601, oficial: true },
        etiqueta: 'Más vendido',
        vistas: 132,
      },
      {
        nombre: 'Juego de sábanas king de percal 180 hilos',
        precio: 94200,
        antes: 118000,
        cuotas: '6 cuotas sin interés',
        envio: 'Llega gratis el jueves',
        tienda: { n: 'Blanquería Central', rep: 4.4, ventas: 2074, oficial: false },
        etiqueta: '-20%',
        vistas: 57,
      },
      {
        nombre: 'Comedero automático para mascotas 4 L',
        precio: 72600,
        antes: null,
        cuotas: '6 cuotas sin interés',
        envio: 'Envío $5.800',
        tienda: { n: 'Mundo Mascota', rep: 4.5, ventas: 943, oficial: false },
        etiqueta: 'Recién llegado',
        vistas: 19,
      },
    ],
    ui: {
      oficial: 'Tienda oficial',
      ventas: (n: number) => `${n.toLocaleString('es-AR')} ventas`,
      viendo: (n: number) => `${n} personas lo están viendo`,
      agregar: 'Agregar al carrito',
    },
  },

  /** El bloque de vendedores: el otro lado del marketplace. */
  vender: {
    volanta: 'Para vendedores',
    titulo: 'Vendé en Feria',
    bajada:
      'Publicás gratis y pagás una comisión solo cuando vendés. Nosotros nos ocupamos del cobro y del envío.',
    pasos: [
      { n: '01', t: 'Publicá', d: 'Cargás el producto con fotos y precio. No hay costo de publicación.' },
      { n: '02', t: 'Vendé', d: 'Cobramos por vos y acreditamos a los 10 días de la entrega.' },
      { n: '03', t: 'Despachá', d: 'Imprimís la etiqueta y lo dejás en cualquier sucursal del correo.' },
    ],
    cifras: [
      { n: 1240, t: 'tiendas activas' },
      { n: 48, s: '.000', t: 'productos publicados' },
      { n: 12, s: '%', t: 'de comisión promedio' },
    ],
    cta: 'Empezar a vender',
  },

  pie: {
    columnas: [
      { t: 'Comprar', items: ['Categorías', 'Ofertas', 'Medios de pago', 'Envíos'] },
      { t: 'Vender', items: ['Empezar a vender', 'Comisiones', 'Tiendas oficiales'] },
      { t: 'Ayuda', items: ['Centro de ayuda', 'Devoluciones', 'Protección de compra', 'Contacto'] },
    ],
    legal: '© 2026 Feria. Los precios incluyen IVA y pueden variar según el vendedor.',
  },
}
