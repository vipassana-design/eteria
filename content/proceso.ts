import type { EtapaProceso } from '@/types'

/** Sección "Proceso" (PLAN.md §4.5).
 *  Cuatro etapas con ilustración SVG y línea conectora. */
export const seccionProceso = {
  titulo: 'Cómo',
  tituloDegrade: 'trabajamos',
  bajada: 'Cuatro etapas, con un entregable claro en cada una.',
}

export const proceso: EtapaProceso[] = [
  {
    numero: '01',
    titulo: 'Relevamiento',
    descripcion:
      'Entendemos qué tiene que hacer el sistema, con quién se integra y qué problema resuelve. De acá sale el alcance real.',
    ilustracion: 'documento',
  },
  {
    numero: '02',
    titulo: 'Diseño',
    descripcion:
      'Definimos estructura, pantallas y flujos antes de programar. Vas a ver cómo se usa el sistema antes de que exista.',
    ilustracion: 'wireframe',
  },
  {
    numero: '03',
    titulo: 'Desarrollo',
    descripcion:
      'Construimos sobre lo acordado, con entregas parciales para que veas el avance y corrijas a tiempo.',
    ilustracion: 'codigo',
  },
  {
    numero: '04',
    titulo: 'Entrega',
    descripcion:
      'Publicación, pruebas en producción y acompañamiento durante las primeras semanas.',
    ilustracion: 'check',
  },
]
