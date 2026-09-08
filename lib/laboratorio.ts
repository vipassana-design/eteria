/** Interruptor del laboratorio de paleta (PLAN.md §15).
 *
 *  Se enciende con `NEXT_PUBLIC_LAB=1` en `.env.local`, o cambiando
 *  este valor a `true` a mano.
 *
 *  Es una constante y no una lectura en runtime porque Next la
 *  reemplaza literalmente al compilar: apagada, el `if` queda en
 *  `false` y el tree-shaking elimina el panel del bundle. Un flag
 *  dinámico lo dejaría dentro aunque nunca se muestre.
 */
export const LAB_ACTIVO = process.env.NEXT_PUBLIC_LAB === '1'
