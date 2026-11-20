import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Crea una nueva fila en template_documentos ("Lipedema, Linfedema y
 * Celulitis", idTipoDocumentoFk=10 - Pack Sesiones Kinesiológicas) con el
 * contenido del consentimiento informado (fuente: docx "ARM-KIN-06-CI-001
 * CONSENTIMIENTO INFORMADO PARA EVALUACIÓN Y TRATAMIENTO KINESIOLÓGICO DE
 * LIPEDEMA, LINFEDEMA Y CELULITIS - CLÍNICA ARMONIC 1.docx").
 *
 * idClinicaFk, subTipo, urlImage y templatePdfmake se copiaron de la ÚNICA
 * plantilla existente con idTipoDocumentoFk=10 (id=10, "Pack Sesiones
 * Kinesiológicas" — la propia plantilla de categoría, no hay otras filas
 * hermanas de este tipo en la BD): idClinicaFk=1, subTipo='' (vacío),
 * urlImage='https://storage.googleapis.com/documentos-firmados/public/procedimientos-logos/icon_sesiones-kine.svg',
 * templatePdfmake=NULL. No toca ninguna otra plantilla ni la fila de prueba
 * id=9001.
 */

// ---------------------------------------------------------------------------
// Cláusula de tratamiento de datos personales (Ley 21.719) — SIN USAR.
//
// Texto tomado TAL CUAL del docx fuente (sección "9. CONSENTIMIENTO PARA EL
// TRATAMIENTO DE DATOS PERSONALES (LEY N° 21.719)"). Esta sección nombra
// expresamente a "Clínica Armonic (Sociedad de Prestaciones Médicas Bravo y
// Cordero Ltda. / Armonic SpA)" como responsable del tratamiento. Por esa
// razón se deja comentada y NO se incluye en el baseDocumento activo — mismo
// criterio aplicado en la migración de Inyectables
// (1794944149392-update-template-inyectables.ts) y en la de Lifting Facial.
// Las casillas de autorización del punto 10 del docx SÍ se incluyen en el
// baseDocumento activo porque no nombran a una entidad específica.
//
// const TRATAMIENTO_DATOS_LEY_21719_SIN_USAR = [
//   {
//     "tipo": "texto",
//     "texto": "9. CONSENTIMIENTO PARA EL TRATAMIENTO DE DATOS PERSONALES (LEY N° 21.719)"
//   },
//   {
//     "tipo": "texto",
//     "texto": "<p>De conformidad con la Ley N° 21.719 sobre Protección de Datos Personales, Clínica Armonic (Sociedad de Prestaciones Médicas Bravo y Cordero Ltda. / Armonic SpA), en calidad de responsable del tratamiento, informa que sus datos personales, incluidos los datos sensibles relativos a su salud, serán tratados con la(s) siguiente(s) finalidad(es): (i) la ejecución del procedimiento o tratamiento clínico descrito en este documento, incluyendo su ficha clínica y seguimiento; y (ii) la gestión administrativa, contable y de agendamiento asociada a su atención.</p>"
//   },
//   {
//     "tipo": "texto",
//     "texto": "<p>Sus datos serán conservados durante el plazo que exija la normativa sanitaria aplicable a la ficha clínica y no serán transferidos a terceros, salvo a prestadores que actúan como encargados del tratamiento por cuenta de Clínica Armonic (incluida la plataforma de ficha clínica electrónica) o cuando exista obligación legal.</p>"
//   },
//   {
//     "tipo": "texto",
//     "texto": "<p>Usted puede ejercer en cualquier momento sus derechos de acceso, rectificación, cancelación, oposición, portabilidad y bloqueo (derechos ARCO+) sobre sus datos personales, así como revocar este consentimiento sin necesidad de expresar causa, dirigiéndose a [correo/canal de contacto del responsable de datos de Clínica Armonic]. La revocación no afectará la licitud del tratamiento realizado con anterioridad. Ante cualquier consulta o reclamo, podrá además dirigirse a la Agencia de Protección de Datos Personales de Chile.</p>"
//   }
// ];
// ---------------------------------------------------------------------------

const NOMBRE_TEMPLATE = "Lipedema, Linfedema y Celulitis";
const ID_TIPO_DOCUMENTO_FK = 10;
const ID_CLINICA_FK = 1;
const SUB_TIPO = "";
const URL_IMAGE = "https://storage.googleapis.com/documentos-firmados/public/procedimientos-logos/icon_sesiones-kine.svg";

const NUEVO_BASE_DOCUMENTO = [
  {
    "tipo": "texto",
    "texto": "1. IDENTIFICACIÓN DEL PACIENTE"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Nombre del paciente", "autofill": "nombreCompleto" },
      { "tipo": "input", "field": "RUT", "autofill": "rut" },
      { "tipo": "input", "field": "Fecha de nacimiento", "autofill": "fechaNacimiento" },
      { "tipo": "input", "field": "Teléfono", "autofill": "telefono" }
    ]
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Fecha" }
    ]
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Kinesiólogo/a tratante" }
    ]
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Lipedema", "value": "LIPEDEMA" },
      { "tipo": "checkbox", "field": "Linfedema", "value": "LINFEDEMA" },
      { "tipo": "checkbox", "field": "Celulitis", "value": "CELULITIS" },
      { "tipo": "checkbox", "field": "Mixto / sospecha lipolinfedema", "value": "MIXTO_SOSPECHA_LIPOLINFEDEMA" }
    ]
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "I", "value": "ETAPA_I" },
      { "tipo": "checkbox", "field": "II", "value": "ETAPA_II" },
      { "tipo": "checkbox", "field": "III", "value": "ETAPA_III" },
      { "tipo": "checkbox", "field": "Caso complejo (a confirmar/derivar)", "value": "CASO_COMPLEJO" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "2. LA CONDICIÓN Y EL PLAN DE TRATAMIENTO"
  },
  {
    "tipo": "texto",
    "texto": "El lipedema es una enfermedad crónica e inflamatoria del tejido adiposo (acumulación anormal de grasa, dolor, pesadez y hematomas fáciles, respetando habitualmente manos y pies). El linfedema es una acumulación de líquido linfático por disfunción del sistema linfático (primario o secundario). La celulitis es una alteración del tejido subcutáneo con cambios de textura cutánea. El lipolinfedema es la progresión del lipedema con compromiso linfático, de mayor complejidad. Son condiciones crónicas: el tratamiento busca manejar sus síntomas y su evolución, no curarlas de forma definitiva."
  },
  {
    "tipo": "texto",
    "texto": "La atención incluye una evaluación inicial (anamnesis, examen físico, clasificación y, en lipedema, etapificación Armonic I-II-III), una línea base de perimetría y fotografías clínicas, y exámenes complementarios opcionales (InBody y/o ecografía, con costo aparte). Si se detectan antecedentes vasculares relevantes, usted será derivado/a a evaluación médica antes de iniciar el tratamiento."
  },
  {
    "tipo": "texto",
    "texto": "El plan se define según etapa, zona y evolución: habitualmente 10 a 15 sesiones, 1 a 2 veces por semana, de 45 minutos de terapia efectiva cada una, con controles periódicos y posible plan de mantención al finalizar. Busca disminuir el dolor, mejorar la circulación y el drenaje, reducir el edema y mejorar la funcionalidad de los tejidos tratados; los resultados dependen de su respuesta individual y adherencia al plan."
  },
  {
    "tipo": "texto",
    "texto": "3. TÉCNICAS Y EQUIPOS QUE PODRÍAN UTILIZARSE"
  },
  {
    "tipo": "texto",
    "texto": "Según su condición y etapa, podrán utilizarse, individualmente o combinadas:"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>DeepSlim: radiofrecuencia/ultrasonido para drenaje corporal, solo en zonas corporales autorizadas (piernas, muslos, glúteos, rodillas, pantorrillas, brazos, abdomen); nunca en zona facial.</li>\n<li>Drenaje linfático manual / terapia manual.</li>\n<li>Vendaje o compresión (elástico o inelástico), con enseñanza de autovendaje si corresponde.</li>\n<li>Presoterapia.</li>\n<li>Radiofrecuencia, en etapas de mayor fibrosis.</li>\n<li>Ondas de choque, en tejido de mayor dureza.</li>\n<li>Vacumterapia, como complemento (celulitis o etapas avanzadas).</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "DeepSlim no destruye adipocitos: actúa como apoyo al drenaje y al manejo del tejido. En linfedema, complementa —no reemplaza— la Terapia Descongestiva Compleja."
  },
  {
    "tipo": "texto",
    "texto": "4. RIESGOS Y POSIBLES COMPLICACIONES"
  },
  {
    "tipo": "texto",
    "texto": "Según su frecuencia:"
  },
  {
    "tipo": "texto",
    "texto": "Frecuentes y transitorios: enrojecimiento o calor local, hinchazón pasajera, dolor o sensibilidad leve, pequeños hematomas (más probables con drenaje profundo o fragilidad capilar)."
  },
  {
    "tipo": "texto",
    "texto": "Poco frecuentes: irritación cutánea por geles/vendajes/adhesivos, aumento temporal de síntomas en las primeras sesiones, molestias por vendaje mal ajustado."
  },
  {
    "tipo": "texto",
    "texto": "Excepcionales: quemaduras leves por mal uso de radiofrecuencia, lesiones cutáneas por ondas de choque en tejido inadecuado, reacciones alérgicas a materiales de vendaje."
  },
  {
    "tipo": "texto",
    "texto": "Consulte de inmediato ante dolor intenso o desproporcionado, aumento brusco de volumen, cambios de color de la piel, calor local intenso, heridas que no cicatrizan o fiebre."
  },
  {
    "tipo": "texto",
    "texto": "5. CONTRAINDICACIONES Y DERIVACIÓN MÉDICA"
  },
  {
    "tipo": "texto",
    "texto": "Es contraindicación para continuar el tratamiento, hasta contar con evaluación médica, presentar:"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Trombosis venosa profunda actual o sospecha de ella.</li>\n<li>Infección activa o fiebre.</li>\n<li>Lesiones abiertas o úlceras en la zona a tratar.</li>\n<li>Cáncer activo en tratamiento, sin autorización médica.</li>\n<li>Embarazo (según la técnica indicada).</li>\n<li>Marcapasos u otros implantes electrónicos.</li>\n<li>Insuficiencia cardíaca descompensada.</li>\n<li>Celulitis bacteriana (erisipela) actual o recurrente.</li>\n<li>Dolor severo no explicado.</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "Usted se compromete a informar de inmediato si presenta alguna de estas condiciones, y será además derivado/a a evaluación médica ante sospecha de lipolinfedema o linfedema moderado-severo sin estudio, alteración vascular relevante, necesidad de evaluación quirúrgica u otros signos de alarma."
  },
  {
    "tipo": "texto",
    "texto": "6. REGISTRO FOTOGRÁFICO Y MEDICIONES CLÍNICAS"
  },
  {
    "tipo": "texto",
    "texto": "Se registrarán perimetría y fotografías clínicas estandarizadas antes del tratamiento y periódicamente (referencialmente cada 3 a 5 sesiones) para evaluar objetivamente su evolución, como parte de su ficha clínica. Su uso con fines de capacitación interna o de difusión requiere autorización expresa y adicional mediante el Consentimiento de Registro Fotográfico y/o Audiovisual Clínico de Clínica Armonic (ARM-CL-RF-CI-001)."
  },
  {
    "tipo": "texto",
    "texto": "7. COMPROMISOS DEL PACIENTE"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Informar antecedentes médicos, medicamentos, alergias y cualquier cambio en su salud durante el tratamiento.</li>\n<li>Seguir las indicaciones pre y post sesión, incluido el uso de vendaje/compresión y la pauta de autocuidado domiciliario.</li>\n<li>Informar de inmediato cualquier signo de alarma señalado en el punto 4.</li>\n<li>No automedicarse ni interrumpir indicaciones médicas sin consultarlo antes con el profesional tratante.</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "8. POLÍTICAS DE AGENDA, VIGENCIA Y DEVOLUCIÓN"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li>Llegar 15 minutos antes de la hora reservada; con más de 10 minutos de atraso, la atención queda sujeta a disponibilidad de hora.</li>\n<li>Cancelaciones sin penalidad hasta las 10:00 horas del día de la cita; sin aviso ni justificativo se pierde esa sesión (salvo fuerza mayor acreditada con certificado, para reagendar).</li>\n<li>El plan tiene una vigencia de 3 meses calendario desde la emisión de la boleta. La devolución de dinero solo procede si se solicita dentro de 10 días calendario desde el pago y no se ha consumido ninguna sesión; pasado ese plazo, Clínica Armonic podrá evaluar una Gift Card por el monto a favor.</li>\n</ul>"
  },
  {
    "tipo": "texto",
    "texto": "10. AUTORIZACIONES (marque las casillas que correspondan)"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Autorizo el tratamiento de mis datos personales y de salud para la finalidad de la evaluación y el tratamiento kinesiológico descrito en este documento (obligatorio para la atención).", "value": "AUTORIZO_TRATAMIENTO_DATOS" },
      { "tipo": "checkbox", "field": "Autorizo el registro de fotografías y mediciones clínicas (perimetría) con fines de seguimiento de mi tratamiento (obligatorio para la atención, ver punto 6).", "value": "AUTORIZO_REGISTRO_FOTOGRAFICO" },
      { "tipo": "checkbox", "field": "Autorizo que mis antecedentes clínicos sean compartidos con el médico o especialista al que sea derivado/a, exclusivamente con fines de continuidad de mi atención, cuando corresponda.", "value": "AUTORIZO_COMPARTIR_ANTECEDENTES" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "11. DECLARACIÓN DE CONSENTIMIENTO"
  },
  {
    "tipo": "texto",
    "texto": "Declaro haber sido informado(a), en forma clara y comprensible, de mi condición, su carácter crónico, el plan de evaluación y tratamiento, las técnicas a utilizar, los riesgos, las contraindicaciones y criterios de derivación médica, las políticas de agenda y devolución, y el tratamiento de mis datos personales conforme a la Ley N° 21.719. He tenido la oportunidad de preguntar y mis dudas fueron resueltas satisfactoriamente. Otorgo mi consentimiento voluntario para la evaluación y el tratamiento descritos y para lo señalado en las casillas marcadas en el punto 10, entendiendo que puedo revocarlo en cualquier momento."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Firma profesional" },
      { "tipo": "input", "field": "Fecha" },
      { "tipo": "input", "field": "Nombre y RUT profesional" }
    ]
  }
];

export class CreateTemplateLipedemaLinfedemaCelulitis1795188799983 implements MigrationInterface {
    name = 'CreateTemplateLipedemaLinfedemaCelulitis1795188799983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const existing = await queryRunner.query(
            `SELECT id FROM template_documentos WHERE nombre = ? AND idTipoDocumentoFk = ?`,
            [NOMBRE_TEMPLATE, ID_TIPO_DOCUMENTO_FK]
        );

        if (existing.length) {
            console.log(`[CreateTemplateLipedemaLinfedemaCelulitis1795188799983] Ya existe template_documentos con nombre='${NOMBRE_TEMPLATE}' e idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK} (id=${existing[0].id}). No se inserta nada.`);
            return;
        }

        await queryRunner.query(
            `INSERT INTO template_documentos (fechaCreacion, fechaActualizacion, idClinicaFk, idTipoDocumentoFk, baseDocumento, nombre, subTipo, urlImage, templatePdfmake)
             VALUES (NOW(), NOW(), ?, ?, ?, ?, ?, ?, NULL)`,
            [ID_CLINICA_FK, ID_TIPO_DOCUMENTO_FK, JSON.stringify(NUEVO_BASE_DOCUMENTO), NOMBRE_TEMPLATE, SUB_TIPO, URL_IMAGE]
        );

        console.log(`[CreateTemplateLipedemaLinfedemaCelulitis1795188799983] Se insertó la plantilla '${NOMBRE_TEMPLATE}' (idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK}).`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const match = await queryRunner.query(
            `SELECT id FROM template_documentos WHERE nombre = ? AND idTipoDocumentoFk = ?`,
            [NOMBRE_TEMPLATE, ID_TIPO_DOCUMENTO_FK]
        );

        if (!match.length) {
            console.warn(`[CreateTemplateLipedemaLinfedemaCelulitis1795188799983] No se encontró template_documentos con nombre='${NOMBRE_TEMPLATE}' e idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK}; no se eliminó nada.`);
            return;
        }

        const id = match[0].id;

        const referencias = await queryRunner.query(
            `SELECT COUNT(*) as total FROM documentos_firmados WHERE idTemplateDocumentoFk = ?`,
            [id]
        );

        if (Number(referencias[0].total) > 0) {
            console.warn(`[CreateTemplateLipedemaLinfedemaCelulitis1795188799983] template_documentos.id=${id} tiene ${referencias[0].total} documento(s)_firmados asociados; no se elimina para no romper documentos históricos.`);
            return;
        }

        await queryRunner.query(`DELETE FROM template_documentos WHERE id = ?`, [id]);

        console.log(`[CreateTemplateLipedemaLinfedemaCelulitis1795188799983] Se eliminó template_documentos.id=${id} ('${NOMBRE_TEMPLATE}').`);
    }
}
