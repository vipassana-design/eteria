import type { Tecnologia } from '@/types'

/** Sección "Stack" (PLAN.md §4.7). */
export const seccionStack = {
  titulo: 'Stack',
  tituloDegrade: 'de trabajo',
  bajada: 'Las tecnologías con las que desarrollamos.',
}

export const stack: Tecnologia[] = [
  { id: 'nextjs', nombre: 'Next.js', color: '#FFFFFF' },
  { id: 'react', nombre: 'React', color: '#61DAFB' },
  { id: 'typescript', nombre: 'TypeScript', color: '#3178C6' },
  { id: 'nodejs', nombre: 'Node.js', color: '#5FA04E' },
  { id: 'postgresql', nombre: 'PostgreSQL', color: '#4169E1' },
]
