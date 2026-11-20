import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Crea una nueva fila en template_documentos ("Lifting Facial",
 * idTipoDocumentoFk=7 - Consentimiento Quirúrgico) con el contenido del
 * consentimiento informado (fuente: docx "Consentimiento Lifting Facial
 * Armonic 1.docx").
 *
 * idClinicaFk, subTipo, urlImage y templatePdfmake se copiaron de la plantilla
 * hermana existente template_documentos.id=22 "Minilifting"
 * (idTipoDocumentoFk=7, igual que el resto de las plantillas quirúrgicas
 * existentes de ese tipo): idClinicaFk=1, subTipo='quirurgico',
 * urlImage='https://storage.googleapis.com/documentos-firmados/public/procedimientos-logos/icon_rrss.svg',
 * templatePdfmake=NULL. No toca ninguna otra plantilla ni la fila de prueba
 * id=9001.
 */

// ---------------------------------------------------------------------------
// Cláusula de autorización de tratamiento de datos personales — SIN USAR.
//
// Texto tomado TAL CUAL del docx fuente de Lifting Facial (sección "11
// Registro clínico y protección de datos", párrafos 2 a 4, y la decisión
// asociada del punto "Decisión sobre la autorización de datos"). Esta
// cláusula nombra expresamente a "Sociedad de Prestaciones Médicas Bravo y
// Cordero SpA, RUT 76.198.928-6" y a "Armonic SpA, RUT 77.465.247-7, Clínica
// Armonic", y además al "Dr. Gustavo Bravo" como médico tratante. Por esa
// razón se deja comentada y NO se incluye en el baseDocumento activo — mismo
// criterio aplicado en la migración de Inyectables
// (1794944149392-update-template-inyectables.ts). Queda acá como referencia
// para cuando se decida formalmente a qué entidad(es)/profesional
// corresponde asociarla.
//
// const AUTORIZACION_TRATAMIENTO_DATOS_SIN_USAR = [
//   {
//     "tipo": "texto",
//     "texto": "<p>Autorizo expresamente a Sociedad de Prestaciones Médicas Bravo y Cordero SpA, RUT 76.198.928-6, y a Armonic SpA, RUT 77.465.247-7, Clínica Armonic, a recopilar, registrar, almacenar y utilizar mis datos personales, de contacto y antecedentes de salud necesarios para mi atención con el Dr. Gustavo Bravo, y a compartir entre ambas entidades únicamente la información necesaria para esta finalidad.</p>"
//   },
//   {
//     "tipo": "texto",
//     "texto": "<p>Autorizo su incorporación a los registros y bases de datos asistenciales para coordinar consultas, cirugía, controles, indicaciones y seguimiento mediante llamadas, correo electrónico o mensajería. El acceso estará limitado al personal autorizado directamente vinculado con mi atención y coordinación, según sus funciones y bajo confidencialidad. No autorizo por esta cláusula publicidad ni otros fines comerciales.</p>"
//   },
//   {
//     "tipo": "texto",
//     "texto": "<p>Podré ejercer los derechos que me reconoce la normativa y revocar esta autorización por los canales indicados, sin afectar el tratamiento previamente realizado ni las obligaciones legales de conservación de la ficha clínica. Se aplicarán las leyes 19.628 y 20.584 y las modificaciones de la Ley 21.719 desde su entrada en vigor el 1 de diciembre de 2026.</p>"
//   },
//   {
//     "tipo": "items",
//     "items": [
//       { "tipo": "checkbox", "field": "Autorizo", "value": "AUTORIZO_DATOS" },
//       { "tipo": "checkbox", "field": "No autorizo", "value": "NO_AUTORIZO_DATOS" }
//     ]
//   },
//   {
//     "tipo": "texto",
//     "texto": "Si no autorizo, se explicará y registrará qué tratamientos de datos son necesarios o legalmente exigidos para prestar y documentar la atención."
//   }
// ];
// ---------------------------------------------------------------------------

const NOMBRE_TEMPLATE = "Lifting Facial";
const ID_TIPO_DOCUMENTO_FK = 7;
const ID_CLINICA_FK = 1;
const SUB_TIPO = "quirurgico";
const URL_IMAGE = "https://storage.googleapis.com/documentos-firmados/public/procedimientos-logos/icon_rrss.svg";

const NUEVO_BASE_DOCUMENTO = [
  {
    "tipo": "texto",
    "texto": "Este documento complementa la conversación con el cirujano. Describe el procedimiento acordado, sus beneficios esperados, alternativas, riesgos y cuidados. Debe completarse y explicarse antes de la cirugía y antes de administrar medicamentos que alteren la comprensión."
  },
  {
    "tipo": "texto",
    "texto": "1 Identificación y procedimiento acordado"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Paciente", "autofill": "nombreCompleto" },
      { "tipo": "input", "field": "RUN o documento", "autofill": "rut" },
      { "tipo": "input", "field": "Fecha de nacimiento", "autofill": "fechaNacimiento" },
      { "tipo": "input", "field": "Teléfono", "autofill": "telefono" }
    ]
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Cirujano responsable" },
      { "tipo": "input", "field": "Establecimiento donde se realizará la cirugía" },
      { "tipo": "input", "field": "Fecha prevista de cirugía" },
      { "tipo": "input", "field": "Diagnóstico y objetivo individual" }
    ]
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Facial", "value": "FACIAL" },
      { "tipo": "checkbox", "field": "Cervicofacial", "value": "CERVICOFACIAL" },
      { "tipo": "input", "field": "Tratamiento cervical o platismoplastia, si corresponde" },
      { "tipo": "input", "field": "Incisiones y zonas a tratar, explicadas al paciente" },
      { "tipo": "checkbox", "field": "General", "value": "GENERAL" },
      { "tipo": "checkbox", "field": "Local con sedación", "value": "LOCAL_CON_SEDACION" },
      { "tipo": "checkbox", "field": "Otra", "value": "OTRA_ANESTESIA" },
      { "tipo": "input", "field": "Especificar otra anestesia" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "2 Descripción y beneficios esperados"
  },
  {
    "tipo": "texto",
    "texto": "El lifting facial o ritidectomía busca mejorar la flacidez y el descenso de los tejidos de la cara y, cuando se acuerda expresamente, del cuello. Mediante incisiones habitualmente ubicadas alrededor de las orejas y, según la técnica, en el cuero cabelludo o bajo el mentón, se movilizan y reposicionan tejidos, se ajustan planos profundos y se retira el exceso de piel cuando corresponde. Pueden utilizarse suturas de fijación, drenajes, vendajes y una red hemostática temporal si se indica y acepta en la sección 6."
  },
  {
    "tipo": "texto",
    "texto": "El objetivo es mejorar el contorno y la apariencia dentro de las posibilidades de mi anatomía y calidad de tejidos. No detiene el envejecimiento ni garantiza eliminar todas las arrugas, manchas, asimetrías o alteraciones de textura. No implica automáticamente cirugía de párpados, cejas, nariz, injertos de grasa ni tratamientos láser."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Procedimientos asociados expresamente acordados y sus consentimientos" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "3 Alternativas y decisión de no operarse"
  },
  {
    "tipo": "texto",
    "texto": "Puedo no realizarme la cirugía. En ese caso persistirán los cambios que motivaron la consulta y continuará el envejecimiento natural. Según mi evaluación, pueden existir alternativas como cuidados de la piel, tratamientos no quirúrgicos o una cirugía de distinta extensión. Sus resultados, duración y riesgos son diferentes y no necesariamente equivalentes a un lifting."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Alternativas discutidas en mi caso" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "4 Efectos esperables y riesgos quirúrgicos"
  },
  {
    "tipo": "texto",
    "texto": "Durante la recuperación pueden presentarse hinchazón, moretones, sensibilidad, tirantez, adormecimiento y asimetrías transitorias. La inflamación y maduración de las cicatrices pueden prolongarse durante meses. Los siguientes riesgos no tienen todos la misma frecuencia; su probabilidad depende de mi condición, de la técnica y de los procedimientos asociados."
  },
  {
    "tipo": "texto",
    "texto": "Sangrado y hematoma. Puede acumularse sangre bajo la piel, incluso de forma rápida, causar dolor y tensión o comprometer la piel. Puede requerir atención urgente, apertura de heridas, drenaje, nueva cirugía, hospitalización y, excepcionalmente, transfusión."
  },
  {
    "tipo": "texto",
    "texto": "Seroma e infección. La acumulación de líquido puede necesitar punciones o drenaje. La infección puede requerir antibióticos, curaciones o cirugía; en casos graves puede extenderse y comprometer el estado general."
  },
  {
    "tipo": "texto",
    "texto": "Problemas de circulación y cicatrización. Pueden producirse apertura de heridas, pérdida parcial de piel o necrosis, especialmente si existen factores de riesgo. Pueden ser necesarias curaciones prolongadas, retiro de tejido, injertos u otras cirugías, con secuelas estéticas."
  },
  {
    "tipo": "texto",
    "texto": "Lesiones nerviosas. Puede aparecer disminución o pérdida de sensibilidad en cara, cuello, orejas o cuero cabelludo, hormigueo o dolor neuropático. La lesión de ramas del nervio facial puede causar debilidad o alteración de la sonrisa, labios, cejas o cierre de los ojos. Los cambios pueden ser temporales o permanentes y requerir tratamiento especializado."
  },
  {
    "tipo": "texto",
    "texto": "Cicatrices y cambios cutáneos. Las cicatrices pueden quedar visibles, ensanchadas, adheridas, elevadas, dolorosas, hipertróficas o queloides. Pueden aparecer cambios de pigmentación, vasos visibles, endurecimiento, irregularidades, hundimientos o inflamación persistente."
  },
  {
    "tipo": "texto",
    "texto": "Cabello y orejas. Puede producirse pérdida temporal o permanente de cabello cerca de las incisiones, cambio de la línea de implantación del pelo y modificación de la posición o forma de la oreja o del lóbulo."
  },
  {
    "tipo": "texto",
    "texto": "Suturas y otros materiales. Las suturas profundas pueden hacerse palpables, visibles, exteriorizarse o provocar inflamación, granulomas o reacción alérgica, requiriendo tratamiento o extracción."
  },
  {
    "tipo": "texto",
    "texto": "Lesiones de estructuras vecinas. Puede haber lesión vascular o de tejidos profundos. La lesión de estructuras salivales puede causar acumulación o salida de saliva y requerir tratamientos adicionales. El riesgo depende de las zonas intervenidas."
  },
  {
    "tipo": "texto",
    "texto": "Resultado insuficiente o no deseado. Puede persistir flacidez, asimetría o irregularidad; aparecer sobrecorrección, cambios de expresión o recurrencia del descenso de tejidos. Puede existir insatisfacción pese a una evolución técnicamente adecuada. No se garantiza simetría perfecta, resultado exacto ni una duración determinada."
  },
  {
    "tipo": "texto",
    "texto": "5 Riesgos generales y de la anestesia"
  },
  {
    "tipo": "texto",
    "texto": "La cirugía y la anestesia pueden asociarse a reacciones alérgicas graves, complicaciones respiratorias o cardiovasculares, trombosis venosa, embolia pulmonar, lesiones por posición o presión y, excepcionalmente, secuelas graves o fallecimiento. Pueden requerirse hospitalización, traslado o cuidados intensivos. El profesional responsable de la anestesia explicará el plan y sus riesgos específicos en el consentimiento correspondiente."
  },
  {
    "tipo": "texto",
    "texto": "6 Red hemostática externa de suturas temporales"
  },
  {
    "tipo": "texto",
    "texto": "Esta sección corresponde a la red o “malla” externa formada con suturas que atraviesan la piel. No describe una prótesis o malla implantada de forma permanente. Si se propone un implante diferente, debe identificarse y explicarse mediante un consentimiento específico antes de su colocación."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Se utilizará red externa", "value": "SE_UTILIZARA_RED_EXTERNA" },
      { "tipo": "checkbox", "field": "No se utilizará", "value": "NO_SE_UTILIZARA_RED_EXTERNA" },
      { "tipo": "input", "field": "Zonas previstas" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "La red mantiene temporalmente próximos los planos operados y reduce el espacio donde puede acumularse sangre o líquido. Su objetivo es ayudar al control del sangrado y a la adaptación de los tejidos. No elimina el riesgo de hematoma o seroma ni garantiza evitar una reintervención. El cirujano explicará por qué la propone en mi caso y las alternativas, como hemostasia convencional, drenajes o vendajes según la indicación."
  },
  {
    "tipo": "texto",
    "texto": "Riesgos específicos de la red"
  },
  {
    "tipo": "texto",
    "texto": "Marcas de punción y cambios de color. Pueden quedar puntos, líneas o marcas de la trama, enrojecimiento y pigmentación más oscura o más clara. Suelen mejorar con la evolución, pero pueden prolongarse o dejar cicatrices visibles o persistentes."
  },
  {
    "tipo": "texto",
    "texto": "Molestias y alteración del contorno. Puede causar dolor, ardor, tirantez, sensibilidad, moretones, inflamación, pliegues, hoyuelos o irregularidades. Algunas alteraciones pueden requerir tratamiento y no desaparecer por completo."
  },
  {
    "tipo": "texto",
    "texto": "Compresión y lesión de la piel. Una tensión excesiva puede disminuir la circulación, producir palidez, congestión, ampollas, erosiones o necrosis. Puede requerirse aflojar o retirar suturas, realizar curaciones, retirar tejido lesionado o efectuar otra cirugía."
  },
  {
    "tipo": "texto",
    "texto": "Sangrado e infección. Las punciones pueden sangrar o infectarse. Puede aparecer inflamación alrededor del hilo, reacción al material, granulomas o retención de fragmentos de sutura, que requieran tratamiento o extracción."
  },
  {
    "tipo": "texto",
    "texto": "Retiro y controles. El retiro puede causar dolor o pequeño sangrado. La red puede necesitar retiro parcial o anticipado según la evolución. Su permanencia y revisión las determinará el equipo tratante; no debo manipularla, cortarla ni retirarla por mi cuenta."
  },
  {
    "tipo": "texto",
    "texto": "Debo asistir a los controles programados y avisar si noto dolor creciente, cambio de color de la piel, secreción o presión excesiva. Se me ha explicado que el aspecto inicial de la red y de sus marcas no corresponde necesariamente al resultado final."
  },
  {
    "tipo": "texto",
    "texto": "7 Factores individuales y preparación"
  },
  {
    "tipo": "texto",
    "texto": "Debo informar de enfermedades, hipertensión, diabetes, problemas de coagulación, antecedentes de trombosis, alergias, embarazo posible, dificultades de cicatrización y complicaciones con anestesias previas. También de cirugías faciales, rellenos, hilos, implantes, radioterapia u otros tratamientos anteriores, indicando ubicación y fecha cuando las conozca."
  },
  {
    "tipo": "texto",
    "texto": "Informaré todos mis medicamentos, anticoagulantes, antiagregantes, antiinflamatorios, suplementos y productos herbales, además del consumo de tabaco, vapeo, nicotina, alcohol u otras sustancias. No suspenderé ni modificaré tratamientos por mi cuenta. El equipo indicará los ajustes, exámenes, ayuno y medidas de prevención adecuados a mi caso."
  },
  {
    "tipo": "texto",
    "texto": "Comprendo que la nicotina aumenta el riesgo de mala cicatrización y pérdida de piel. Debo cumplir las instrucciones individualizadas de suspensión y comunicar cualquier consumo. Las enfermedades no controladas, las cirugías previas y los procedimientos combinados pueden modificar mis riesgos y el plan quirúrgico."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Antecedentes y riesgos personales relevantes" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "8 Recuperación y seguimiento"
  },
  {
    "tipo": "texto",
    "texto": "Recibiré indicaciones escritas sobre medicamentos, curaciones, higiene, posición al dormir, actividad física, exposición solar, uso de vendajes y cuidado de suturas o drenajes. La recuperación varía entre pacientes y puede requerir apoyo en domicilio y tiempo de reposo laboral o social. No realizaré masajes, aplicaré calor ni utilizaré dispositivos sobre la zona sin autorización del equipo."
  },
  {
    "tipo": "texto",
    "texto": "Debo asistir a controles, mantener disponibles mis datos de contacto e informar dificultades para seguir las indicaciones. Si no puedo acudir, contactaré al equipo para reorganizar el seguimiento. Una complicación puede requerir tratamientos, procedimientos adicionales o nueva cirugía; su indicación debe explicarse de acuerdo con mi situación clínica."
  },
  {
    "tipo": "texto",
    "texto": "9 Señales de alarma y atención urgente"
  },
  {
    "tipo": "texto",
    "texto": "Debo contactar al equipo de inmediato ante aumento brusco del volumen de la cara o cuello, dolor intenso o creciente, sangrado importante, piel pálida, violácea u oscura, ampollas, fiebre, secreción, enrojecimiento progresivo, debilidad facial nueva o dificultad para cerrar un ojo."
  },
  {
    "tipo": "texto",
    "texto": "Si presento dificultad para respirar o tragar, dolor torácico, desmayo, pérdida de visión o hinchazón rápida del cuello, acudiré de inmediato a un servicio de urgencia."
  },
  {
    "tipo": "texto",
    "texto": "10 Tratamientos adicionales y aspectos económicos"
  },
  {
    "tipo": "texto",
    "texto": "Los costos, prestaciones incluidas, eventuales reintervenciones y cobertura de seguros se informarán en documentos económicos separados. Firmar este consentimiento no implica aceptar cobros indeterminados, renunciar a derechos ni eximir de responsabilidad al equipo o al establecimiento."
  },
  {
    "tipo": "texto",
    "texto": "11 Registro clínico y protección de datos"
  },
  {
    "tipo": "texto",
    "texto": "Las fotografías necesarias para documentar mi evaluación y evolución se incorporarán al registro clínico y se tratarán como información de salud confidencial. Este consentimiento no autoriza su difusión en redes sociales, publicidad, docencia, investigación o publicaciones; cualquier uso adicional que requiera consentimiento se solicitará por separado y de manera específica."
  },
  {
    "tipo": "texto",
    "texto": "12 Declaración y decisión del paciente"
  },
  {
    "tipo": "texto",
    "texto": "Declaro que recibí información comprensible sobre mi procedimiento y técnica, beneficios esperados, alternativas, recuperación, riesgos generales y particulares, y red hemostática si se propone. Pude formular preguntas y recibí respuestas satisfactorias, con tiempo para decidir sin presión y antes de recibir sedación. Comprendo que no se garantizan resultados exactos y que puedo retirar mi consentimiento antes del procedimiento, dejando constancia en mi ficha."
  },
  {
    "tipo": "texto",
    "texto": "Autorizo exclusivamente los procedimientos registrados en este documento y sus anexos específicos. Los cambios electivos o procedimientos adicionales requerirán una nueva explicación y consentimiento. Si ocurre una urgencia que impida obtenerlo, se actuará dentro de los supuestos permitidos por la ley, dejando registro e informándome posteriormente."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Acepto", "value": "ACEPTO" },
      { "tipo": "checkbox", "field": "Rechazo", "value": "RECHAZO" },
      { "tipo": "input", "field": "Paciente o representante" },
      { "tipo": "input", "field": "Calidad y fundamento del representante (si corresponde)" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "Declaro haber explicado el procedimiento, sus alternativas y riesgos individualizados, y haber respondido las preguntas del paciente."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Firma profesional" },
      { "tipo": "input", "field": "Fecha" },
      { "tipo": "input", "field": "Nombre y RUN del médico que informa" }
    ]
  }
];

export class CreateTemplateLiftingFacial1795188799982 implements MigrationInterface {
    name = 'CreateTemplateLiftingFacial1795188799982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const existing = await queryRunner.query(
            `SELECT id FROM template_documentos WHERE nombre = ? AND idTipoDocumentoFk = ?`,
            [NOMBRE_TEMPLATE, ID_TIPO_DOCUMENTO_FK]
        );

        if (existing.length) {
            console.log(`[CreateTemplateLiftingFacial1795188799982] Ya existe template_documentos con nombre='${NOMBRE_TEMPLATE}' e idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK} (id=${existing[0].id}). No se inserta nada.`);
            return;
        }

        await queryRunner.query(
            `INSERT INTO template_documentos (fechaCreacion, fechaActualizacion, idClinicaFk, idTipoDocumentoFk, baseDocumento, nombre, subTipo, urlImage, templatePdfmake)
             VALUES (NOW(), NOW(), ?, ?, ?, ?, ?, ?, NULL)`,
            [ID_CLINICA_FK, ID_TIPO_DOCUMENTO_FK, JSON.stringify(NUEVO_BASE_DOCUMENTO), NOMBRE_TEMPLATE, SUB_TIPO, URL_IMAGE]
        );

        console.log(`[CreateTemplateLiftingFacial1795188799982] Se insertó la plantilla '${NOMBRE_TEMPLATE}' (idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK}).`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const match = await queryRunner.query(
            `SELECT id FROM template_documentos WHERE nombre = ? AND idTipoDocumentoFk = ?`,
            [NOMBRE_TEMPLATE, ID_TIPO_DOCUMENTO_FK]
        );

        if (!match.length) {
            console.warn(`[CreateTemplateLiftingFacial1795188799982] No se encontró template_documentos con nombre='${NOMBRE_TEMPLATE}' e idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK}; no se eliminó nada.`);
            return;
        }

        const id = match[0].id;

        const referencias = await queryRunner.query(
            `SELECT COUNT(*) as total FROM documentos_firmados WHERE idTemplateDocumentoFk = ?`,
            [id]
        );

        if (Number(referencias[0].total) > 0) {
            console.warn(`[CreateTemplateLiftingFacial1795188799982] template_documentos.id=${id} tiene ${referencias[0].total} documento(s)_firmados asociados; no se elimina para no romper documentos históricos.`);
            return;
        }

        await queryRunner.query(`DELETE FROM template_documentos WHERE id = ?`, [id]);

        console.log(`[CreateTemplateLiftingFacial1795188799982] Se eliminó template_documentos.id=${id} ('${NOMBRE_TEMPLATE}').`);
    }
}
