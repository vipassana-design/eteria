import type { MockupHero } from '@/types'

/** Contenido del hero (PLAN.md §4.2). */
export const hero = {
  /** El título se parte para que el degradé tome solo el tramo final.
   *  SplitText lo divide por líneas al animar.
   *
   *  El corte de línea es deliberado y no queda librado al ancho: a 76px
   *  de cuerpo "Desarrollamos" ocupa casi la columna entera, y sin marcar
   *  el corte la segunda línea quedaba con "software" sola. */
  titulo: {
    antes: ['Desarrollamos el', 'software'],
    degrade: ['que tu negocio', 'necesita.'],
  },
  bajada:
    'Ecommerce, plataformas y sitios a medida. Construidos desde cero, sin plantillas ni limitaciones.',
  ctaPrimario: { etiqueta: 'Cotizar mi proyecto', href: '/#contacto' },
  ctaSecundario: { etiqueta: 'Ver ejemplos', href: '/#ejemplos' },
  /** Prueba social. Sin conteo de proyectos (§1). */
  prueba: '+20 años construyendo software',

  /** Las tres ventanas, de la de atrás a la de adelante. */
  mockups: [
    {
      id: 'sitio',
      url: 'estudio-legal.com',
      alt: 'Mockup de un sitio institucional para un estudio de servicios profesionales',
    },
    {
      id: 'panel',
      url: 'app.gestion.com/panel',
      alt: 'Mockup de un panel de administración con métricas y tabla de pedidos',
    },
    {
      id: 'tienda',
      url: 'tienda-indumentaria.com',
      alt: 'Mockup de una tienda online de indumentaria con grilla de productos',
    },
  ] satisfies MockupHero[] as MockupHero[],
}
