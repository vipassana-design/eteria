/** Capa de grano (PLAN.md §2.5).
 *
 *  Overlay de ruido a 3%. Evita el banding de los degradés en
 *  pantallas grandes y le quita el aspecto plástico al dark.
 *  Es estático, así que no necesita ser client component.
 */
export default function Grano() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] mix-blend-overlay"
      style={{
        // El multiplicador del laboratorio (§15). Sin él queda en 0.03.
        opacity: 'calc(0.03 * var(--lab-grano, 1))',
        backgroundImage: 'url(/grano.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}
