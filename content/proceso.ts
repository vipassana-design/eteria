import type { EtapaProceso } from '@/types'

/** Sección "Proceso" (PLAN.md §4.5).
 *  Cuatro etapas con ilustración SVG y línea conectora. */
export const seccionProceso = {
  titulo: 'Cómo',
  tituloDegrade: 'trabajamos',
  bajada: 'Cuatro etapas, cada una con su entregable.',
}

export const proceso: EtapaProceso[] = [
  {
    numero: '01',
    titulo: 'Relevamiento',
    descripcion:
      'Definimos qué tiene que hacer el sistema, con qué se integra y qué casos cubre. El entregable es el documento de alcance.',
    ilustracion: 'documento',
  },
  {
    numero: '02',
    titulo: 'Diseño',
    descripcion:
      'Estructura, pantallas y flujos de navegación antes de programar. El entregable son los prototipos de las pantallas principales.',
    ilustracion: 'wireframe',
  },
  {
    numero: '03',
    titulo: 'Desarrollo',
    descripcion:
      'Programación sobre el alcance acordado, con entregas parciales en un entorno de prueba para revisar el avance durante el desarrollo.',
    ilustracion: 'codigo',
  },
  {
    numero: '04',
    titulo: 'Entrega',
    descripcion:
      'Publicación, pruebas en producción y acompañamiento durante las primeras semanas de uso.',
    ilustracion: 'check',
  },
]
