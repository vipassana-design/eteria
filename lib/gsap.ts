/** Registro centralizado de GSAP y sus plugins.
 *
 *  Se importa desde acá y en ningún otro lado se llama a
 *  gsap.registerPlugin(). Registrar plugins dentro de cada
 *  componente es la causa más común de comportamiento raro
 *  (PLAN.md §8.2).
 */
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { Flip } from 'gsap/Flip'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip, useGSAP)
}

export { gsap, ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip, useGSAP }
