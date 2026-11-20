import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Actualiza el contenido de template_documentos.id=1 ("Administración de
 * Inyectables") con el texto nuevo del consentimiento (fuente: docx
 * "CONSENTIMIENTO INFORMADO – ADMINISTRACIÓN DE INYECTABLES").
 *
 * No toca ninguna otra plantilla.
 */

// ---------------------------------------------------------------------------
// Cláusula de autorización de tratamiento de datos personales — SIN USAR.
//
// Texto tomado TAL CUAL del docx fuente de Inyectables (sección "Autorización
// para el tratamiento de datos personales y seguimiento asistencial").
// Verificado contra las 43 plantillas de template_documentos existentes en la
// BD local: NINGUNA la tiene activa hoy, por lo que NO se incluye en el
// baseDocumento nuevo. Se deja acá, comentada, como referencia para cuando se
// decida formalmente incorporarla (y a qué plantilla(s)).
//
// Nota aparte: existe un documento DISTINTO y mucho más completo —
// "OCTUBRE 2026 DOCUMENTO REVISADO CONSENTIMIENTO INFORMADO PARA EL
// TRATAMIENTO DE DATOS PERSONALES DEL PACIENTE CLINICA ARMONIC" — que es un
// consentimiento AUTÓNOMO de 12 secciones (responsable del tratamiento,
// identificación del paciente, datos tratados, finalidades, destinatarios,
// plazos, derechos ARCO, revocación, menores de edad, autorizaciones
// específicas SÍ/NO, declaración y firma propias). No es la misma cláusula
// que la de Inyectables y probablemente amerita ser su propia plantilla
// independiente, no un bloque dentro de Inyectables. Queda fuera del alcance
// de esta migración.
//
// const AUTORIZACION_TRATAMIENTO_DATOS_SIN_USAR = [
//   {
//     tipo: "texto",
//     texto: "Autorización para el tratamiento de datos personales y seguimiento asistencial",
//   },
//   {
//     tipo: "texto",
//     texto:
//       "<p>Autorizo expresamente a Sociedad de Prestaciones Médicas Bravo y Cordero SpA, RUT 76.198.928-6, y a Armonic SpA, RUT 77.465.247-7, Clínica Armonic, a recopilar, registrar, almacenar y utilizar mis datos personales, datos de contacto y antecedentes de salud necesarios para mi atención con el Dr. Gustavo Bravo, así como a compartir entre ambas entidades únicamente la información necesaria para dicha finalidad.</p>" +
//       "<p>Autorizo su incorporación a los registros y bases de datos asistenciales correspondientes, exclusivamente para coordinar consultas, cirugía, controles, indicaciones y seguimiento, mediante llamadas, correo electrónico o mensajería. El acceso estará limitado al personal autorizado directamente vinculado con mi atención y su coordinación, según sus funciones y bajo deber de confidencialidad. Esta autorización no comprende publicidad ni otros fines comerciales.</p>" +
//       "<p>Podré ejercer mis derechos sobre mis datos y revocar esta autorización mediante los canales de atención de ambas entidades, sin afectar el tratamiento previamente realizado ni las obligaciones legales de conservación de la ficha clínica. El tratamiento se sujetará a las leyes 19.628 y 20.584, y a las modificaciones introducidas por la Ley 21.719 desde su entrada en vigor.</p>",
//   },
// ];
// ---------------------------------------------------------------------------

const NUEVO_BASE_DOCUMENTO = [
  {
    "tipo": "texto",
    "texto": "Identificación del/la paciente"
  },
  {
    "tipo": "items",
    "items": [
      {
        "tipo": "input",
        "field": "Nombre",
        "autofill": "nombreCompleto"
      },
      {
        "tipo": "input",
        "field": "RUT/Pasaporte",
        "autofill": "rut"
      },
      {
        "tipo": "input",
        "field": "Fecha de nacimiento",
        "autofill": "fechaNacimiento"
      },
      {
        "tipo": "input",
        "field": "Teléfono",
        "autofill": "telefono"
      }
    ]
  },
  {
    "tipo": "texto",
    "texto": "Procedimiento(s) a realizar (marcar con “X”):"
  },
  {
    "tipo": "items",
    "items": [
      {
        "tipo": "checkbox",
        "field": "Toxina Botulínica (Botox®)",
        "value": "BOTOX"
      },
      {
        "tipo": "checkbox",
        "field": "Ácido Hialurónico",
        "value": "ACIDO_HIALURONICO"
      },
      {
        "tipo": "checkbox",
        "field": "Bioestimuladores (Sculptra®, Radiesse®, Harmonyca®)",
        "value": "BIOESTIMULADORES"
      },
      {
        "tipo": "checkbox",
        "field": "Otros",
        "value": "OTROS"
      },
      {
        "tipo": "input",
        "field": "Especificar sustancia a inyectar"
      }
    ]
  },
  {
    "tipo": "texto",
    "texto": "1. Descripción General"
  },
  {
    "tipo": "texto",
    "texto": "<p>El/La paciente ha sido informado/a de que los tratamientos inyectables son procedimientos médico-estéticos realizados por profesionales capacitados, cuyo objetivo es mejorar la apariencia facial y/o prevenir signos de envejecimiento.</p>\n<p>Cada tratamiento utiliza productos específicos, aprobados para uso médico, que se aplican mediante inyecciones en áreas previamente definidas.</p>"
  },
  {
    "tipo": "texto",
    "texto": "2. Información y Riesgos por Tipo de Inyectable"
  },
  {
    "tipo": "texto",
    "texto": "A. Toxina Botulínica (Botox®)"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Objetivo: Relajar temporalmente los músculos faciales para suavizar arrugas dinámicas.</li>\n<li>Posibles efectos adversos temporales: dolor leve, enrojecimiento, hinchazón, pequeños hematomas, asimetría, sensación de pesadez.</li>\n<li>Riesgos poco frecuentes: caída temporal del párpado o ceja (ptosis), cefalea, visión borrosa, reacciones alérgicas, resistencia al producto.</li>\n<li>Limitaciones: El efecto es temporal (3-6 meses aprox.) y requiere sesiones de mantenimiento las cuales se recomiendan cada 4 meses.</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "B. Ácido Hialurónico"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Objetivo: Rellenar surcos, restaurar volúmenes y mejorar la hidratación y elasticidad de la piel.</li>\n<li>Posibles efectos adversos temporales: enrojecimiento, hinchazón, dolor local, hematomas.</li>\n<li>Riesgos poco frecuentes pero relevantes: infección, reacción inflamatoria tardía, asimetría, necrosis por obstrucción vascular, ceguera por embolización (extremadamente rara).</li>\n<li>Limitaciones: El producto se reabsorbe gradualmente (6-18 meses según zona y tipo de ácido hialurónico).</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "C. Bioestimuladores (Sculptra®, Radiesse®, Harmonyca®)"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Objetivo: Estimular la producción natural de colágeno para mejorar la firmeza y calidad de la piel de manera progresiva.</li>\n<li>Posibles efectos adversos temporales: dolor, enrojecimiento, inflamación, pequeños hematomas.</li>\n<li>Riesgos poco frecuentes: formación de nódulos o granulomas, infección, asimetría, reacciones inflamatorias.</li>\n<li>Limitaciones: Los resultados son progresivos y requieren varias sesiones; los efectos duran entre 18 y 24 meses aprox.</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "D. Otros: Corticoides, enzimas, hialuronidasa, Infiltraciones en la nariz"
  },
  {
    "tipo": "texto",
    "texto": "<p>Las infiltraciones nasales con hialuronidasa, corticoides u otras enzimas pueden producir efectos locales y complicaciones que dependen del producto utilizado, su concentración, la técnica de aplicación y las características de cada paciente.</p>"
  },
  {
    "tipo": "texto",
    "texto": "Molestias locales que pueden aparecer después de la aplicación"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Hematomas o moretones.</li>\n<li>Hinchazón o edema, que puede modificar temporalmente la forma de la nariz y producir asimetría.</li>\n<li>Enrojecimiento, sensibilidad, dolor o ardor en la zona.</li>\n<li>Picazón y pequeño sangrado en los puntos de punción.</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "<p>Estas molestias suelen ser transitorias, pero su intensidad y duración pueden variar.</p>"
  },
  {
    "tipo": "texto",
    "texto": "Riesgos específicos según la sustancia"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Hialuronidasa: puede causar irritación, hinchazón y reacciones alérgicas, excepcionalmente graves. Cuando se utiliza para disolver ácido hialurónico previamente inyectado, puede disminuir también el volumen de relleno que se deseaba conservar, haciendo visibles irregularidades o asimetrías.</li>\n<li>Corticoides: pueden provocar adelgazamiento de la piel, pérdida de tejido graso y hundimientos, cambios de pigmentación, pequeños vasos visibles y retraso de la cicatrización. Estos cambios pueden aparecer de forma tardía y ser prolongados. Se han descrito complicaciones vasculares y pérdida de visión tras determinadas infiltraciones de corticoides en la región nasal.</li>\n<li>Enzimas como lipasa y colagenasa: pueden generar inflamación, dolor, moretones, enrojecimiento y endurecimiento local. Los riesgos dependen de la formulación específica. La evidencia sobre su seguridad en la nariz es limitada; no se deben extrapolar directamente los resultados de tratamientos realizados en otras zonas.</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "Otras posibles complicaciones"
  },
  {
    "tipo": "texto",
    "texto": "<p>Puede presentarse infección, reacción alérgica o lesión de los tejidos. No todos los productos comparten los mismos riesgos ni todas estas complicaciones tienen la misma frecuencia.</p>"
  },
  {
    "tipo": "texto",
    "texto": "Señales de alarma"
  },
  {
    "tipo": "texto",
    "texto": "<p>Solicite evaluación médica inmediata si presenta dolor intenso o creciente, piel pálida, violácea u oscura, ampollas, alteraciones de la visión, fiebre, secreción o enrojecimiento progresivo. La dificultad para respirar o la hinchazón de labios, lengua o garganta requieren atención de urgencia.</p>\n<p>El profesional tratante debe explicar los riesgos específicos del producto que se utilizará antes del procedimiento.</p>"
  },
  {
    "tipo": "texto",
    "texto": "3. Consideraciones Generales"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Entiendo que los resultados pueden variar según la respuesta individual y que no se garantiza un resultado exacto.</li>\n<li>He informado sobre mis antecedentes médicos, alergias y uso de medicamentos.</li>\n<li>He sido instruido/a sobre cuidados posteriores, incluyendo evitar masajes en la zona tratada, ejercicio intenso y exposición solar directa durante las primeras horas posteriores.</li>\n</ul>"
  },
  {
    "tipo": "items",
    "items": [
      {
        "tipo": "input",
        "field": "Firma profesional"
      },
      {
        "tipo": "input",
        "field": "Fecha"
      },
      {
        "tipo": "input",
        "field": "Nombre y RUT profesional"
      }
    ]
  }
];

export class UpdateTemplateInyectables1794944149392 implements MigrationInterface {
    name = 'UpdateTemplateInyectables1794944149392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS template_documentos_backup LIKE template_documentos`
        );

        const existingBackup = await queryRunner.query(
            `SELECT id FROM template_documentos_backup WHERE id = 1`
        );

        if (!existingBackup.length) {
            await queryRunner.query(
                `INSERT INTO template_documentos_backup SELECT * FROM template_documentos WHERE id = 1`
            );
            console.log('[UpdateTemplateInyectables1794944149392] Respaldo de template_documentos.id=1 creado en template_documentos_backup.');
        } else {
            console.log('[UpdateTemplateInyectables1794944149392] Ya existía un respaldo de template_documentos.id=1 en template_documentos_backup, no se sobrescribe.');
        }

        const match = await queryRunner.query(
            `SELECT id, nombre FROM template_documentos WHERE id = 1`
        );

        if (!match.length || match[0].nombre !== 'Administración de Inyectables') {
            console.warn(
                `[UpdateTemplateInyectables1794944149392] No se actualizó nada: template_documentos.id=1 no coincide con nombre='Administración de Inyectables' (encontrado: ${JSON.stringify(match[0] ?? null)}).`
            );
            return;
        }

        await queryRunner.query(
            `UPDATE template_documentos SET baseDocumento = ? WHERE id = 1 AND nombre = 'Administración de Inyectables'`,
            [JSON.stringify(NUEVO_BASE_DOCUMENTO)]
        );

        console.log('[UpdateTemplateInyectables1794944149392] template_documentos.id=1 actualizado con el nuevo baseDocumento.');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const backup = await queryRunner.query(
            `SELECT baseDocumento FROM template_documentos_backup WHERE id = 1`
        );

        if (!backup.length) {
            console.warn('[UpdateTemplateInyectables1794944149392] No se encontró respaldo en template_documentos_backup.id=1; no se restauró nada.');
            return;
        }

        await queryRunner.query(
            `UPDATE template_documentos SET baseDocumento = ? WHERE id = 1`,
            [backup[0].baseDocumento]
        );

        console.log('[UpdateTemplateInyectables1794944149392] template_documentos.id=1 restaurado desde template_documentos_backup.');
    }
}
