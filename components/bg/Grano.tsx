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
      className="pointer-events-none fixed inset-0 z-[2] opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: 'url(/grano.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}
