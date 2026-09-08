import Hero from '@/components/home/Hero'
import QueHacemos from '@/components/home/QueHacemos'
import Servicios from '@/components/home/Servicios'
import Proceso from '@/components/home/Proceso'
import Soluciones from '@/components/home/Soluciones'
import Stack from '@/components/home/Stack'
import Contacto from '@/components/home/Contacto'

/** Home. Todas las secciones construidas (Fases 4 a 7). */
export default function Home() {
  return (
    <>
      <Hero />
      <QueHacemos />
      <Servicios />
      <Proceso />
      <Soluciones />
      <Stack />
      <Contacto />
    </>
  )
}
