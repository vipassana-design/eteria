# Eteria

Sitio de agencia de desarrollo a medida. Next.js (App Router) + TypeScript + Tailwind + GSAP.

Marca provisional: **Eteria**. Se reemplaza globalmente cuando se defina el nombre final.

---

## Antes de trabajar

Leé `PLAN.md`. Es la fuente de verdad de diseño, arquitectura, contenido y orden de construcción.

Si algo no está definido ahí, preguntá antes de resolverlo por tu cuenta. No inventes decisiones de diseño.

---

## Cómo trabajamos

El plan tiene 9 fases (sección 9 de `PLAN.md`). Vamos una por vez, con revisión del cliente entre cada una. No avances a la siguiente fase sin que te lo pida.

Al terminar cada fase, informá:

1. Qué quedó hecho
2. Qué decisiones tomaste que no estaban en el plan
3. Si encontraste algo del plan que no cierra o conviene cambiar

Después de cada fase, hacé commit con un mensaje descriptivo (`Fase 3: header, menú mobile y capas de fondo`).

---

## Mantener la documentación viva

Estos dos archivos tienen que reflejar el estado real del proyecto en todo momento.

**Actualizá `PLAN.md` cuando:**

- El cliente cambie una decisión de diseño, contenido, estructura o alcance
- Tomes una decisión técnica que no estaba prevista y afecte al resto del proyecto
- Descubras que algo del plan no es viable y haya que reemplazarlo
- Se resuelva alguno de los pendientes de la sección 1

**Actualizá `CLAUDE.md` cuando:**

- Cambie una regla de trabajo o una convención de código
- Se sumen o quiten dependencias
- Cambien los comandos del proyecto

No esperes a que te lo pidan. Si una directiva cambia en la conversación, dejala escrita en el archivo que corresponda antes de seguir, y avisá qué actualizaste. Una decisión que solo vive en el chat se pierde en la sesión siguiente.

Cuando actualices un archivo, editá la parte que corresponde. No lo reescribas entero ni le agregues un changelog al final.

---

## Reglas de código

- Todo el texto visible sale de `/content`. Nada hardcodeado en JSX.
- Los objetos de `/content` se tipan contra las interfaces de `/types/index.ts`.
- Sentence case en toda la interfaz. Nunca mayúsculas para labels.
- Sin `localStorage` ni `sessionStorage`.
- Animaciones GSAP dentro de `useGSAP()` con scope, nunca `useEffect`.
- Los plugins de GSAP se registran una sola vez en `/lib/gsap.ts`.
- Componentes con GSAP o estado del cliente llevan `'use client'`.
- `prefers-reduced-motion` respetado en toda animación.
- No instalar dependencias nuevas sin avisar primero.
- Los tokens de diseño viven en el bloque `@theme` de `app/globals.css`. Tailwind 4 no usa `tailwind.config.js`: no lo crees.
- Las variantes condicionales de animación van con `gsap.matchMedia()`, no con `window.matchMedia` a mano. Se revierte solo al desmontar.
- El loop de cualquier animación por frame va en `gsap.ticker`, no en un `requestAnimationFrame` propio: así hay un solo rAF compartido con Lenis y ScrollTrigger.
- Los nombres de componentes, props, variables y archivos de contenido van en español, igual que el copy.
- Antes de cerrar una fase con trabajo visual, mirar el resultado en el navegador. Que compile no es que se vea bien.
- Para ocultar o mostrar un `Boton` por breakpoint, envolverlo en un div con la clase de display. Pasarle `hidden` por `className` no funciona: compite con el `inline-flex` de sus clases base y gana el orden de la hoja generada, no el del atributo.

## Stack instalado

Next 16.3 (App Router, Turbopack) · React 19 · TypeScript estricto · Tailwind 4 · GSAP 3.15 con `@gsap/react` · Lenis.

Fuentes variables de Fontshare self-hosted en `/public/fonts`.

---

## Comandos

```bash
npm run dev
npm run build
npm run lint
```

_(completar si se agregan scripts propios)_
