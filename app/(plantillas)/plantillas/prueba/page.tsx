/** Ruta de verificación del aislamiento (PLAN.md §16, Etapa 0).
 *
 *  No es una plantilla: es el banco de pruebas. Contiene a propósito un
 *  ejemplar de cada cosa que `globals.css` contamina, para poder
 *  confirmar una por una que la neutralización funciona antes de
 *  escribir nueve plantillas.
 *
 *  Se borra al cerrar la Etapa 0.
 *
 *  Los 14 puntos a verificar están numerados en la propia página, así
 *  la revisión se hace mirando y no cruzando con una lista aparte.
 */
export default function PaginaPrueba() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <div className="mx-auto max-w-3xl px-8 py-16">
        <p className="text-sm text-neutral-500">Banco de pruebas · Etapa 0</p>

        {/* 1 y 2 — tipografía y color de los títulos. Sin la
            neutralización salen en Clash Display color #ededed. */}
        <h1 className="mt-2 text-4xl font-semibold text-neutral-900">
          1 · Este h1 no debe estar en Clash Display
        </h1>
        <h2 className="mt-8 text-2xl font-semibold text-neutral-900">
          2 · Este h2 tampoco, y su color no debe ser #ededed
        </h2>

        {/* 3 — el cuerpo. Sin neutralizar hereda #b8b8b8, Satoshi y
            line-height 1.65. */}
        <p className="mt-4 max-w-prose text-neutral-700">
          3 · Este párrafo debe leerse en gris oscuro sobre blanco, con
          una tipografía de sistema. Si sale gris claro, en Satoshi, o
          con demasiado interlineado, la herencia del sitio sigue
          entrando. El texto tiene que tener contraste suficiente para
          leerse cómodo.
        </p>

        {/* 4 — el borde. Sin neutralizar sale translúcido blanco, o sea
            invisible sobre fondo claro. */}
        <div className="mt-8 border p-4 text-neutral-700">
          4 · Este div tiene <code>border</code> sin color declarado. El
          borde tiene que verse.
        </div>

        {/* 5, 6 y 7 — los controles nativos. Es la colisión menos obvia:
            `color-scheme: dark` los pinta oscuros y no se arregla con
            clases de Tailwind. */}
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <label className="flex flex-col gap-1 text-sm text-neutral-700">
            5 · Select
            <select className="rounded border border-neutral-300 px-3 py-2">
              <option>Debe verse claro</option>
              <option>No oscuro</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox" defaultChecked />
            6 · Checkbox
          </label>

          <label className="flex flex-col gap-1 text-sm text-neutral-700">
            7 · Fecha
            <input
              type="date"
              className="rounded border border-neutral-300 px-3 py-2"
            />
          </label>
        </div>

        {/* 8 — el foco. Sin neutralizar el outline es azul de 2px y el
            border-radius: 4px pisa el del control. */}
        <button
          type="button"
          className="mt-8 rounded-none bg-neutral-900 px-5 py-3 text-white"
        >
          8 · Enfocame con Tab: el anillo no debe ser azul, y las
          esquinas deben seguir en ángulo recto
        </button>

        {/* 9 — la transición. Con prefers-reduced-motion el !important
            de globals.css:452 la anula y no hay CSS que le gane. Hay que
            documentar el resultado, no arreglarlo. */}
        <div className="mt-8">
          <p className="text-sm text-neutral-500">
            9 · Pasá el mouse: la transición dura 700ms. Con
            reduced-motion forzado debería ser instantánea.
          </p>
          <div className="mt-2 h-16 w-48 bg-neutral-200 transition-colors duration-700 hover:bg-neutral-900" />
        </div>

        {/* 10 — la selección de texto. */}
        <p className="mt-8 text-neutral-700">
          10 · Seleccioná este texto con el mouse: el resaltado no debe
          ser el azul del sitio.
        </p>

        {/* 11 a 14 — lo que no debe aparecer. */}
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm font-semibold text-neutral-900">
            Lo que NO debe verse en esta página
          </p>
          <ul className="mt-3 space-y-1 text-sm text-neutral-600">
            <li>11 · El header del sitio</li>
            <li>12 · El footer del sitio</li>
            <li>13 · El botón flotante de WhatsApp</li>
            <li>
              14 · Las capas de fondo: el grano (textura de ruido) y las
              partículas
            </li>
          </ul>
        </div>

        {/* Alto suficiente para que aparezca la scrollbar y se pueda
            verificar que no tiene el thumb azul ni el track negro. */}
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-500">
            Scrolleá: la barra no debe tener el thumb azul ni el track
            negro del sitio.
          </p>
        </div>
        <div style={{ height: '2400px' }} />
        <p className="pb-16 text-neutral-700">
          Fin del banco de pruebas.
        </p>
      </div>
    </div>
  )
}
