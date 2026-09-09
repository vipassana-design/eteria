/** Contenido de la plantilla Vértice (PLAN.md §16).
 *
 *  Ecommerce de tecnología. Registro denso y técnico: es el opuesto de
 *  Atelier, que es editorial y con densidad baja. Acá la información
 *  manda —specs, stock por sucursal, comparador— porque es lo que un
 *  comprador de tecnología busca antes de decidir.
 *
 *  Lo que hace creíble una tienda de tecnología: precio de lista y
 *  precio con transferencia (que es como se vende en Argentina), cuotas
 *  con el nombre del banco, stock discriminado por sucursal, y specs
 *  que se puedan comparar entre modelos.
 */

export const vertice = {
  marca: { nombre: 'Vértice', bajada: 'Tecnología' },

  /** La franja de envíos y pagos: en tecnología es decisiva. */
  aviso: {
    items: [
      'Envío gratis en compras desde $250.000',
      '12 cuotas sin interés con bancos seleccionados',
      'Retiro en sucursal en 2 horas',
    ],
  },

  nav: [
    { t: 'Notebooks', n: 84 },
    { t: 'Celulares', n: 112 },
    { t: 'Monitores', n: 47 },
    { t: 'Componentes', n: 236 },
    { t: 'Periféricos', n: 158 },
  ],

  hero: {
    volanta: 'Semana de la tecnología',
    titulo: 'Notebooks para trabajar',
    bajada: 'Hasta 25% off y 12 cuotas sin interés en modelos seleccionados.',
    cta: 'Ver la selección',
    contador: { t: 'Termina en', v: '2 días 14:22' },
    foto: '/plantillas/vertice/hero.webp',
    fotoAlt: 'Notebook abierta sobre un escritorio',
  },

  /** Los cuatro productos del listado, con specs comparables.
   *
   *  Uno sin stock en una sucursal, uno con descuento, uno recién
   *  llegado, uno con reseñas altas: cada uno tiene un estado distinto
   *  y ninguno es redondo. */
  productos: [
    {
      sku: 'NB-14X-512',
      marca: 'Kryon',
      nombre: 'Notebook 14" Ryzen 5 · 16 GB · 512 GB SSD',
      lista: 1249000,
      transferencia: 1086000,
      cuotas: { n: 12, monto: 104083 },
      etiqueta: '-13%',
      estrellas: 4.6,
      opiniones: 214,
      specs: [
        { t: 'Procesador', v: 'Ryzen 5 7530U' },
        { t: 'Memoria', v: '16 GB DDR4' },
        { t: 'Almacenamiento', v: '512 GB NVMe' },
        { t: 'Pantalla', v: '14" IPS 1920×1080' },
        { t: 'Batería', v: 'Hasta 9 horas' },
      ],
      stock: [
        { s: 'Once', hay: true },
        { s: 'Belgrano', hay: true },
        { s: 'Morón', hay: false },
      ],
    },
    {
      sku: 'NB-15P-1TB',
      marca: 'Kryon',
      nombre: 'Notebook 15,6" Core i7 · 16 GB · 1 TB SSD',
      lista: 1874000,
      transferencia: 1630000,
      cuotas: { n: 12, monto: 156166 },
      etiqueta: null,
      estrellas: 4.8,
      opiniones: 96,
      specs: [
        { t: 'Procesador', v: 'Core i7-1355U' },
        { t: 'Memoria', v: '16 GB DDR5' },
        { t: 'Almacenamiento', v: '1 TB NVMe' },
        { t: 'Pantalla', v: '15,6" IPS 1920×1080' },
        { t: 'Batería', v: 'Hasta 11 horas' },
      ],
      stock: [
        { s: 'Once', hay: true },
        { s: 'Belgrano', hay: false },
        { s: 'Morón', hay: true },
      ],
    },
    {
      sku: 'NB-13A-256',
      marca: 'Nubel',
      nombre: 'Notebook 13,3" Celeron · 8 GB · 256 GB SSD',
      lista: 698000,
      transferencia: 607000,
      cuotas: { n: 6, monto: 116333 },
      etiqueta: 'Ideal estudio',
      estrellas: 4.1,
      opiniones: 341,
      specs: [
        { t: 'Procesador', v: 'Celeron N4500' },
        { t: 'Memoria', v: '8 GB DDR4' },
        { t: 'Almacenamiento', v: '256 GB SSD' },
        { t: 'Pantalla', v: '13,3" TN 1366×768' },
        { t: 'Batería', v: 'Hasta 7 horas' },
      ],
      stock: [
        { s: 'Once', hay: true },
        { s: 'Belgrano', hay: true },
        { s: 'Morón', hay: true },
      ],
    },
    {
      sku: 'NB-16G-2TB',
      marca: 'Kryon',
      nombre: 'Notebook 16" Ryzen 9 · 32 GB · 2 TB SSD · RTX 4060',
      lista: 3480000,
      transferencia: 3027600,
      cuotas: { n: 12, monto: 290000 },
      etiqueta: 'Recién llegada',
      estrellas: 4.9,
      opiniones: 18,
      specs: [
        { t: 'Procesador', v: 'Ryzen 9 7940HS' },
        { t: 'Memoria', v: '32 GB DDR5' },
        { t: 'Almacenamiento', v: '2 TB NVMe' },
        { t: 'Pantalla', v: '16" IPS 2560×1600 165 Hz' },
        { t: 'Batería', v: 'Hasta 6 horas' },
      ],
      stock: [
        { s: 'Once', hay: true },
        { s: 'Belgrano', hay: false },
        { s: 'Morón', hay: false },
      ],
    },
  ],

  listado: {
    volanta: 'Notebooks',
    titulo: '84 modelos disponibles',
    orden: ['Más vendidos', 'Menor precio', 'Mayor precio', 'Mejor puntuados'],
    filtros: {
      titulo: 'Filtrar',
      grupos: [
        {
          t: 'Marca',
          items: [
            { v: 'Kryon', n: 41, on: true },
            { v: 'Nubel', n: 28, on: false },
            { v: 'Ardor', n: 15, on: false },
          ],
        },
        {
          t: 'Memoria RAM',
          items: [
            { v: '8 GB', n: 22, on: false },
            { v: '16 GB', n: 39, on: true },
            { v: '32 GB', n: 23, on: false },
          ],
        },
        {
          t: 'Almacenamiento',
          items: [
            { v: '256 GB', n: 14, on: false },
            { v: '512 GB', n: 36, on: false },
            { v: '1 TB o más', n: 34, on: false },
          ],
        },
      ],
      precio: { t: 'Precio', min: '$600.000', max: '$3.500.000' },
      limpiar: 'Limpiar filtros',
    },
    ui: {
      lista: 'Precio de lista',
      transferencia: 'con transferencia',
      cuotas: (n: number, monto: string) => `${n} cuotas de ${monto}`,
      comparar: 'Comparar',
      comparando: 'En comparación',
      verFicha: 'Ver la ficha',
      stock: 'Stock por sucursal',
      sinStock: 'Sin stock',
      opiniones: (n: number) => `${n} opiniones`,
      agregar: 'Agregar al carrito',
    },
  },

  /** El comparador: la interacción que más "vende" que la tienda es
   *  real. Se eligen productos y se comparan sus specs lado a lado. */
  comparador: {
    titulo: 'Comparar modelos',
    bajada: 'Elegí hasta tres notebooks y mirá las especificaciones lado a lado.',
    vacio: 'Marcá "Comparar" en los productos que quieras contrastar.',
    quitar: 'Quitar',
  },

  sucursales: {
    volanta: 'Tres sucursales',
    titulo: 'Retirá en el día',
    bajada:
      'Comprás en línea y retirás en dos horas. El stock que ves es el de cada local, actualizado cada 15 minutos.',
    items: [
      { s: 'Once', dir: 'Av. Corrientes 2840', hora: 'Lunes a sábados de 9 a 19' },
      { s: 'Belgrano', dir: 'Av. Cabildo 1970', hora: 'Lunes a sábados de 10 a 20' },
      { s: 'Morón', dir: 'Av. Rivadavia 17650', hora: 'Lunes a viernes de 9 a 18' },
    ],
  },

  garantia: {
    items: [
      { t: 'Garantía oficial', d: '12 meses en todos los productos, con servicio en el país' },
      { t: 'Cambios', d: '10 días corridos desde la entrega, sin uso' },
      { t: 'Asesoramiento', d: 'Te ayudamos a elegir por WhatsApp antes de comprar' },
    ],
  },

  pie: {
    columnas: [
      { t: 'Categorías', items: ['Notebooks', 'Celulares', 'Monitores', 'Componentes'] },
      { t: 'Comprar', items: ['Medios de pago', 'Envíos', 'Retiro en sucursal', 'Garantía'] },
      { t: 'Vértice', items: ['Sucursales', 'Venta mayorista', 'Trabajá con nosotros'] },
    ],
    legal: '© 2026 Vértice Tecnología. Precios en pesos argentinos, IVA incluido.',
  },
}
