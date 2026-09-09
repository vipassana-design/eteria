/** Contenido de la plantilla Atelier (PLAN.md §16).
 *
 *  Ecommerce de indumentaria, registro editorial premium. Todo el texto
 *  vive acá y no en el JSX, igual que el resto del sitio.
 *
 *  El realismo lo dan los datos, no la técnica: precios con separador
 *  de miles, talles con stock por talle, un producto agotado, otro con
 *  descuento y su precio anterior, reseñas con nombre y fecha. Un
 *  catálogo con cuatro productos redondos y todos disponibles se lee
 *  como demostración.
 */

export const atelier = {
  marca: {
    nombre: 'Atelier',
    /** Va bajo el logo, en tracking amplio. */
    bajada: 'Buenos Aires',
  },

  nav: [
    { t: 'Nuevo', destacado: true },
    { t: 'Prendas' },
    { t: 'Abrigos' },
    { t: 'Accesorios' },
    { t: 'Editorial' },
  ],

  /** La franja de arriba, que toda tienda usa para envíos y cuotas. */
  aviso: 'Envío sin cargo desde $180.000 · 3 cuotas sin interés',

  hero: {
    volanta: 'Otoño invierno 2026',
    titulo: 'La colección\nde entretiempo',
    bajada:
      'Prendas de lana, lino y algodón peinado, en una paleta de tierras y grises.',
    cta: 'Ver la colección',
    secundario: 'Lookbook',
    foto: '/plantillas/atelier/hero.webp',
    fotoAlt: 'Silueta con abrigo largo a contraluz, al atardecer',
  },

  categorias: {
    titulo: 'Por categoría',
    items: [
      {
        t: 'Prendas de punto',
        n: 34,
        foto: '/plantillas/atelier/cat-1.webp',
        alt: 'Perchero con prendas de punto en varios colores',
      },
      {
        t: 'Abrigos y gabardinas',
        n: 18,
        foto: '/plantillas/atelier/cat-2.webp',
        alt: 'Gabardinas beige colgadas en un perchero',
      },
      {
        t: 'Básicos',
        n: 52,
        foto: '/plantillas/atelier/cat-3.webp',
        alt: 'Interior del local con prendas expuestas',
      },
    ],
  },

  grilla: {
    volanta: 'Recién llegado',
    titulo: 'Nuevo esta semana',
    enlace: 'Ver los 34 productos',
    items: [
      {
        nombre: 'Remera de algodón peinado',
        detalle: 'Rosa viejo',
        precio: 38900,
        antes: null,
        etiqueta: null,
        talles: [
          { t: 'S', hay: true },
          { t: 'M', hay: true },
          { t: 'L', hay: true },
          { t: 'XL', hay: false },
        ],
        colores: ['#C99A9A', '#F2EDE4', '#2B2B2B'],
        foto: '/plantillas/atelier/prod-1.webp',
        alt: 'Remera de algodón color rosa viejo',
      },
      {
        nombre: 'Campera de jean forrada',
        detalle: 'Azul medio',
        precio: 128000,
        antes: 164000,
        etiqueta: '-22%',
        talles: [
          { t: 'S', hay: false },
          { t: 'M', hay: true },
          { t: 'L', hay: true },
          { t: 'XL', hay: true },
        ],
        colores: ['#6B8CAE', '#2B3B4E'],
        foto: '/plantillas/atelier/prod-2.webp',
        alt: 'Campera de jean con interior de corderito',
      },
      {
        nombre: 'Camisa de lino lavado',
        detalle: 'Rosa seco',
        precio: 86400,
        antes: null,
        etiqueta: 'Últimas unidades',
        talles: [
          { t: 'S', hay: true },
          { t: 'M', hay: true },
          { t: 'L', hay: false },
          { t: 'XL', hay: false },
        ],
        colores: ['#D9A9A0', '#E8E2D8', '#8C9A8E'],
        foto: '/plantillas/atelier/prod-3.webp',
        alt: 'Camisa de lino color rosa seco',
      },
      {
        nombre: 'Remera de jersey pesado',
        detalle: 'Blanco',
        precio: 42800,
        antes: null,
        etiqueta: 'Nuevo',
        talles: [
          { t: 'S', hay: true },
          { t: 'M', hay: true },
          { t: 'L', hay: true },
          { t: 'XL', hay: true },
        ],
        colores: ['#F5F3EE', '#1A1A1A', '#8A8F96'],
        foto: '/plantillas/atelier/prod-4.webp',
        alt: 'Remera de jersey color blanco',
      },
    ],
  },

  editorial: {
    volanta: 'Editorial',
    titulo: 'Cómo se hace\nuna prenda que dura',
    parrafos: [
      'Trabajamos con tres talleres de Buenos Aires y una hilandería de Trelew. Las prendas de punto se tejen en máquina rectilínea y se terminan a mano, una por una.',
      'Cada temporada sale de una paleta corta —seis colores— para que las prendas de años distintos se puedan combinar entre sí.',
    ],
    firma: 'Lucía Ferrari · Dirección de producto',
    cta: 'Leer la nota completa',
    foto: '/plantillas/atelier/editorial.webp',
    fotoAlt: 'Vestido largo rojo en una escalera de piedra',
  },

  /** La franja de servicios. Tres columnas, sin cards: en un sitio
   *  editorial las cards ensucian. */
  servicios: [
    { t: 'Envíos', d: 'A todo el país en 3 a 5 días hábiles' },
    { t: 'Cambios', d: '30 días desde la compra, sin costo' },
    { t: 'Cuotas', d: '3 y 6 pagos sin interés con bancos adheridos' },
  ],

  resenas: {
    titulo: 'Lo que dicen',
    items: [
      {
        texto:
          'La camisa de lino llegó en dos días y el talle es exacto al del cuadro de medidas. La tela no se arruga tanto como esperaba.',
        quien: 'Malena R.',
        cuando: 'hace 3 días',
        estrellas: 5,
      },
      {
        texto:
          'Segunda compra. Pedí un cambio de talle y lo resolvieron en la semana, sin vueltas.',
        quien: 'Joaquín T.',
        cuando: 'hace 1 semana',
        estrellas: 5,
      },
      {
        texto:
          'La remera es tal cual la foto. Le saco una estrella porque tardó 6 días en llegar a Córdoba.',
        quien: 'Pilar M.',
        cuando: 'hace 2 semanas',
        estrellas: 4,
      },
    ],
  },

  boletin: {
    titulo: 'Enterate primero',
    bajada: 'Una vez por mes: la colección nueva y las notas del editorial.',
    campo: 'Tu correo',
    cta: 'Suscribirme',
    nota: 'Podés darte de baja cuando quieras.',
  },

  pie: {
    columnas: [
      {
        t: 'Tienda',
        items: ['Nuevo', 'Prendas', 'Abrigos', 'Accesorios', 'Outlet'],
      },
      {
        t: 'Ayuda',
        items: ['Cuadro de talles', 'Envíos', 'Cambios y devoluciones', 'Contacto'],
      },
      {
        t: 'Atelier',
        items: ['Editorial', 'Los talleres', 'Locales', 'Trabajá con nosotros'],
      },
    ],
    local: {
      t: 'Local',
      dir: 'Gurruchaga 1284, Palermo',
      hora: 'Lunes a sábados de 11 a 20',
    },
    legal: '© 2026 Atelier. Todos los derechos reservados.',
  },
}
