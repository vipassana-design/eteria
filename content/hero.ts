
/** Contenido del hero (PLAN.md §4.2). */
export const hero = {
  /** El título se parte en líneas para que cada una entre con su propia
   *  máscara.
   *
   *  El corte de línea es deliberado y no queda librado al ancho: a 76px
   *  de cuerpo las palabras largas ocupan casi la columna entera, y sin
   *  marcar el corte quedaban líneas con una sola palabra.
   *
   *  El último tramo rota entre las cuatro variantes que definió el
   *  cliente. */
  titulo: {
    antes: ['Desarrollo', 'de software'],
    /** Rotan en este orden. La primera es la que queda en el estado
     *  base y la que leen los lectores de pantalla. */
    rotantes: ['a medida', 'end-to-end', 'para empresas', 'integral'],
  },
  bajada:
    'Ecommerce, plataformas de gestión y sitios institucionales. Cada proyecto se escribe desde cero, sobre el alcance que definimos con el cliente.',
  ctaPrimario: { etiqueta: 'Cotizar mi proyecto', href: '/#contacto' },
  ctaSecundario: { etiqueta: 'Ver ejemplos', href: '/#ejemplos' },
  /** Prueba social. Sin conteo de proyectos (§1). */
  prueba: '+20 años construyendo software',
}

/** Etapas del ciclo del hero (PLAN.md §4.2).
 *
 *  El ciclo arranca con la terminal levantando un proyecto y sigue con
 *  las tres pantallas armándose una tras otra. La etapa de terminal se
 *  representa con null en el ciclo del componente. */
export const etapasHero = [
  {
    pantalla: 'tienda' as const,
    url: 'tienda-atelier.com',
    etiqueta: 'Ecommerce',
  },
  {
    pantalla: 'panel' as const,
    url: 'app.gestion.com/panel',
    etiqueta: 'Panel de administración',
  },
  {
    pantalla: 'corporativo' as const,
    url: 'norvex.com',
    etiqueta: 'Sitio institucional',
  },
]

/** Sesión de terminal del hero: entra en ~5s, que es lo que dura antes
 *  de pasar a las ventanas. */
export const sesionHero = [
  { tipo: 'comando', texto: 'npx create-next-app tienda' },
  { tipo: 'ok', texto: 'Success! Created tienda' },
  { tipo: 'comando', texto: 'npm i @mercadopago/sdk-react' },
  { tipo: 'salida', texto: 'added 24 packages in 3s' },
  { tipo: 'comando', texto: 'npm run build' },
  { tipo: 'ok', texto: 'Deployed to production' },
] as const

/** Etiqueta de la etapa de terminal en el indicador. */
export const etiquetaTerminal = 'Desarrollo'
