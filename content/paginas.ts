import { marca } from './marca'

/** Contenido de las páginas de cierre: 404 y privacidad (PLAN.md §9). */

export const noEncontrada = {
  codigo: '404',
  titulo: 'Esta página',
  tituloDegrade: 'no existe',
  texto: 'El enlace puede estar mal escrito o la página puede haberse movido.',
  volver: 'Ir al inicio',
  verServicios: 'Ver servicios',
}

/** Última actualización del texto de privacidad. Se cambia a mano
 *  cuando cambia la política. */
export const PRIVACIDAD_ACTUALIZADA = '7 de septiembre de 2026'

export const privacidad = {
  titulo: 'Política de',
  tituloDegrade: 'privacidad',
  actualizada: `Última actualización: ${PRIVACIDAD_ACTUALIZADA}`,
  meta: {
    title: 'Política de privacidad',
    description: 'Qué datos recibimos a través del sitio, para qué los usamos y cómo pedir su eliminación.',
  },
  secciones: [
    {
      titulo: 'Qué datos recibimos',
      parrafos: [
        `Los que se completan en el formulario de contacto: nombre, dirección de correo, empresa (opcional), tipo de proyecto y el mensaje. No pedimos ningún otro dato personal.`,
        'El servidor registra la dirección IP y el navegador de las visitas, como hace cualquier servidor web. Ese registro se usa para diagnosticar problemas técnicos y detectar abuso.',
      ],
    },
    {
      titulo: 'Para qué los usamos',
      parrafos: [
        'Únicamente para responder la consulta y, si el proyecto avanza, para la comunicación del trabajo. No enviamos newsletters ni comunicaciones comerciales no solicitadas.',
        'No vendemos, alquilamos ni cedemos los datos a terceros.',
      ],
    },
    {
      titulo: 'Cuánto tiempo los conservamos',
      parrafos: [
        'Las consultas que no derivan en un proyecto se eliminan al año. Las de proyectos realizados se conservan mientras dure la relación comercial y por el plazo que exija la normativa fiscal.',
      ],
    },
    {
      titulo: 'Cookies',
      parrafos: [
        'El sitio no usa cookies de seguimiento ni de publicidad, y no incorpora servicios de analítica de terceros. Tampoco se guarda nada en el navegador entre visitas.',
      ],
    },
    {
      titulo: 'Tus derechos',
      parrafos: [
        `Podés pedir el acceso, la corrección o la eliminación de tus datos escribiendo a ${marca.email}. Respondemos dentro de los diez días hábiles.`,
        'En Argentina, la autoridad de control en materia de datos personales es la Agencia de Acceso a la Información Pública.',
      ],
    },
  ],
}
