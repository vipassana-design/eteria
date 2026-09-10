/** Contenido de la plantilla Clínica Norte (PLAN.md §16).
 *
 *  Sitio institucional de salud. Registro luminoso y tranquilizador:
 *  contrasta con Atelier —que es premium y frío— y con Márquez, que es
 *  sobrio y denso. Las tres son institucionales o ecommerce, y lo que
 *  las diferencia es la temperatura, no el rubro.
 *
 *  Lo que hace creíble un sitio de salud son las cosas que un paciente
 *  busca y que una plantilla genérica no tiene: la guardia con su
 *  horario, qué obras sociales atienden, el número de matrícula de cada
 *  profesional, cómo se llega. Eso, no las fotos de gente sonriendo.
 */

export const clinica = {
  marca: {
    nombre: 'Clínica Norte',
    bajada: 'Centro médico integral',
  },

  /** La franja de urgencias. Es lo primero que se busca en un sitio de
   *  salud, así que va arriba de todo y siempre visible. */
  urgencias: {
    etiqueta: 'Guardia 24 horas',
    tel: '0800 555 0147',
    nota: 'Todos los días, incluidos feriados',
  },

  nav: [
    { t: 'Especialidades' },
    { t: 'Cuerpo médico' },
    { t: 'Estudios' },
    { t: 'Obras sociales' },
    { t: 'Contacto' },
  ],
  cta: 'Solicitar turno',

  hero: {
    volanta: 'Desde 1994 en Villa Urquiza',
    titulo: 'Atención médica\ncon tiempo para escuchar',
    bajada:
      'Turnos de 30 minutos, historia clínica compartida entre especialidades y estudios en el mismo lugar.',
    cta: 'Pedir un turno',
    secundario: 'Ver especialidades',
    foto: '/plantillas/clinica/hero.webp',
    fotoAlt: 'Profesional de la salud en el consultorio',
    /** Las tres señales de confianza, sobre el hero. */
    señales: [
      { n: '31', t: 'años atendiendo' },
      { n: '48', t: 'profesionales' },
      { n: '12', t: 'especialidades' },
    ],
  },

  /** El buscador de turnos. No funciona —no hay backend— pero los
   *  selectores son reales y responden: es la interacción que más
   *  comunica que el sitio está vivo. */
  turnos: {
    titulo: 'Buscar un turno',
    bajada: 'Elegí la especialidad y te mostramos la primera fecha disponible.',
    campos: {
      especialidad: 'Especialidad',
      profesional: 'Profesional',
      obra: 'Obra social',
    },
    cta: 'Ver disponibilidad',
    resultado: {
      titulo: 'Próximo turno disponible',
      /** Cambia según la especialidad elegida: es lo que hace que el
       *  buscador se sienta conectado a algo. */
      porEspecialidad: {
        'Clínica médica': { cuando: 'Mañana, 9:40', quien: 'Dra. Elina Sosa' },
        'Cardiología': { cuando: 'Jueves 14, 11:20', quien: 'Dr. Marcos Rivas' },
        'Pediatría': { cuando: 'Hoy, 16:00', quien: 'Dra. Paula Bermúdez' },
        'Traumatología': { cuando: 'Lunes 18, 8:30', quien: 'Dr. Tomás Iriarte' },
        'Dermatología': { cuando: 'Miércoles 20, 10:00', quien: 'Dra. Carla Núñez' },
        'Ginecología': { cuando: 'Viernes 15, 13:15', quien: 'Dra. Inés Falcón' },
      } as Record<string, { cuando: string; quien: string }>,
    },
  },

  especialidades: {
    volanta: 'Doce especialidades',
    titulo: 'En qué atendemos',
    items: [
      { t: 'Clínica médica', d: 'Controles, seguimiento y derivaciones', n: 9 },
      { t: 'Cardiología', d: 'Electrocardiograma, ergometría y holter', n: 5 },
      { t: 'Pediatría', d: 'Control de niño sano y vacunación', n: 7 },
      { t: 'Traumatología', d: 'Lesiones, fracturas y rehabilitación', n: 4 },
      { t: 'Dermatología', d: 'Control de lunares y tratamientos', n: 3 },
      { t: 'Ginecología', d: 'Control anual, ecografías y PAP', n: 6 },
    ],
    enlace: 'Ver las doce especialidades',
  },

  estudios: {
    volanta: 'En el mismo lugar',
    titulo: 'Estudios y diagnóstico',
    bajada:
      'No hace falta ir a otro centro: los estudios se hacen acá y el resultado queda en la historia clínica.',
    items: [
      { t: 'Laboratorio', d: 'Resultados en 24 a 48 horas' },
      { t: 'Ecografía', d: 'General, obstétrica y doppler' },
      { t: 'Radiología', d: 'Digital, con informe el mismo día' },
      { t: 'Cardiología', d: 'ECG, ergometría, holter y presurometría' },
    ],
    foto: '/plantillas/clinica/lab.webp',
    fotoAlt: 'Bioquímica pipeteando una muestra en el laboratorio',
  },

  equipo: {
    volanta: 'Cuerpo médico',
    titulo: 'Quiénes atienden',
    /** La matrícula es el detalle que hace creíble un sitio de salud:
     *  es un dato verificable y público que una plantilla no pone. */
    items: [
      { n: 'Dra. Elina Sosa', e: 'Clínica médica', m: 'MN 98.412', ini: 'ES' },
      { n: 'Dr. Marcos Rivas', e: 'Cardiología', m: 'MN 87.203', ini: 'MR' },
      { n: 'Dra. Paula Bermúdez', e: 'Pediatría', m: 'MN 104.556', ini: 'PB' },
      { n: 'Dr. Tomás Iriarte', e: 'Traumatología', m: 'MN 91.740', ini: 'TI' },
    ],
    enlace: 'Ver los 48 profesionales',
    foto: '/plantillas/clinica/equipo.webp',
    fotoAlt: 'Equipo médico en reunión de trabajo',
  },

  obras: {
    titulo: 'Obras sociales y prepagas',
    bajada: 'Atendemos por estas coberturas. Consultá los planes incluidos.',
    items: [
      'OSDE',
      'Swiss Medical',
      'Galeno',
      'Medicus',
      'IOMA',
      'PAMI',
      'OSECAC',
      'Federada Salud',
    ],
    nota: 'También atendemos consultas particulares con arancel diferenciado.',
  },

  visita: {
    titulo: 'Cómo llegar',
    dir: 'Av. Triunvirato 4250, Villa Urquiza',
    detalle: 'A tres cuadras de la estación Urquiza del Premetro',
    horarios: [
      { t: 'Consultorios', d: 'Lunes a viernes de 8 a 20, sábados de 8 a 13' },
      { t: 'Laboratorio', d: 'Lunes a viernes de 7:30 a 11, sin turno' },
      { t: 'Guardia', d: 'Las 24 horas, todos los días' },
    ],
    tel: '011 4521 8800',
    correo: 'turnos@clinica-demo.test',
    foto: '/plantillas/clinica/espera.webp',
    fotoAlt: 'Sala de espera de la clínica',
  },

  pie: {
    columnas: [
      { t: 'Atención', items: ['Especialidades', 'Estudios', 'Turnos', 'Guardia'] },
      { t: 'Institucional', items: ['La clínica', 'Cuerpo médico', 'Trabajá con nosotros'] },
      { t: 'Pacientes', items: ['Obras sociales', 'Resultados en línea', 'Preguntas frecuentes'] },
    ],
    legal: '© 2026 Clínica Norte. Dirección médica: Dr. A. Peralta, MN 72.109.',
  },
}
