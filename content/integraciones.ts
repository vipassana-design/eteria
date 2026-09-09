/** El mapa de integraciones de "Sobre nosotros" (PLAN.md §4.3).
 *
 *  Los nombres son los que aparecen de verdad en un proyecto acá, y
 *  salen del copy que ya está en las landings: "facturación, stock, CRM
 *  o APIs propias" en software a medida, "Mercado Pago, Stripe o la
 *  pasarela que la empresa ya tenga" y "Andreani, OCA o el operador que
 *  corresponda" en ecommerce.
 *
 *  Son seis y no más: con ocho el círculo se llena y las etiquetas
 *  empiezan a chocar.
 */
export interface Integracion {
  nombre: string
}

export const integraciones: Integracion[] = [
  { nombre: 'Facturación' },
  { nombre: 'Pagos' },
  { nombre: 'Stock' },
  { nombre: 'Logística' },
  { nombre: 'CRM' },
  { nombre: 'Planillas' },
]

export const mapaUi = {
  centro: 'El sistema',
  centroNota: 'a medida',
}
