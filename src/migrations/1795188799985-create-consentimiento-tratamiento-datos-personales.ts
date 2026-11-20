import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Crea una nueva categoría (tipo_documento) "Consentimiento Tratamiento de
 * Datos Personales" y su única plantilla (template_documentos), con el texto
 * completo del documento legal (fuente: docx "OCTUBRE 2026 DOCUMENTO REVISADO
 * CONSENTIMIENTO INFORMADO PARA EL TRATAMIENTO DE DATOS PERSONALES DEL
 * PACIENTE CLINICA ARMONIC"), conforme a la Ley N° 19.628, modificada por la
 * Ley N° 21.719, y la Ley N° 20.584.
 *
 * Esta plantilla no se firma a través del flujo de ConsentimientoPaciente
 * (PDF + firma manuscrita): se usa como gate de aceptación obligatoria al
 * entrar a /paciente/plantilla-paciente/:paciente (ver
 * ConsentimientoDatosComponent en el front), antes de poder elegir un
 * procedimiento. La aceptación se registra igualmente en
 * documentos_firmados (idTemplateDocumentoFk -> este template).
 */

const NOMBRE_TIPO_DOCUMENTO = "Consentimiento Tratamiento de Datos Personales";
const DESCRIPCION_TIPO_DOCUMENTO = "Consentimiento Tratamiento de Datos Personales";
const URL_IMAGE_TIPO_DOCUMENTO = "https://storage.googleapis.com/documentos-firmados/public/procedimientos-logos/icon_cons-quirurgico.svg";

const NOMBRE_TEMPLATE = "Consentimiento Tratamiento de Datos Personales";
const ID_CLINICA_FK = 1;
const SUB_TIPO = "";
const URL_IMAGE_TEMPLATE = URL_IMAGE_TIPO_DOCUMENTO;

const NUEVO_BASE_DOCUMENTO = [
  {
    "tipo": "texto",
    "texto": "<h3>CONSENTIMIENTO INFORMADO para el Tratamiento de Datos Personales del Paciente</h3><p>Conforme a la Ley N° 19.628 sobre Protección de la Vida Privada, modificada por la Ley N° 21.719 sobre Protección de Datos Personales, y la Ley N° 20.584 sobre Derechos y Deberes que tienen las Personas (Pacientes) en relación con acciones vinculadas a su Atención de Salud.</p>"
  },
  {
    "tipo": "texto",
    "texto": "En Clínica Armonic cuidamos y protegemos tu información (datos personales) con el mismo rigor con que cuidamos tu salud. Este Documento te explica qué datos personales recolectamos, para qué los utilizamos, con quién podríamos compartirlos, cuánto tiempo los conservamos y cómo puedes ejercer tus derechos. Te pedimos leerlo con atención y hacer todas las preguntas que necesites antes de aceptar."
  },
  {
    "tipo": "texto",
    "texto": "1. RESPONSABLE DEL TRATAMIENTO"
  },
  {
    "tipo": "texto",
    "texto": "<p><b>Nombre de fantasía:</b> Clínica Armonic<br/><b>Razón Social:</b> Armonic Spa<br/><b>Rol Único Tributario (RUT):</b> 77.465.247-7<br/><b>Domicilio:</b> Avenida Alonso de Córdova 5710, Oficina 803, Comuna de Las Condes<br/><b>Canal de privacidad y derechos:</b> privacidad@clinicarmonic.com<br/><b>Teléfono:</b> +56 9 7754 1810<br/><b>Representante legal:</b> Scarlinis Marielis Vivenes Andrade</p>"
  },
  {
    "tipo": "texto",
    "texto": "2. IDENTIFICACIÓN DEL PACIENTE"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Nombre del paciente", "autofill": "nombreCompleto" },
      { "tipo": "input", "field": "RUT / Pasaporte", "autofill": "rut" },
      { "tipo": "input", "field": "Fecha de nacimiento", "autofill": "fechaNacimiento" },
      { "tipo": "input", "field": "Teléfono", "autofill": "telefono" },
      { "tipo": "input", "field": "Correo electrónico y Domicilio" },
      { "tipo": "input", "field": "Representante legal (si aplica)" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "3. DATOS PERSONALES QUE TRATAMOS"
  },
  {
    "tipo": "texto",
    "texto": "<p>Para prestarte una atención segura y de calidad, Clínica Armonic podrá tratar las siguientes categorías de datos:</p><ul>\n<li><b>Datos de identificación y contacto:</b> nombre, número de RUT o Pasaporte, fecha de nacimiento, domicilio, teléfono y correo electrónico.</li>\n<li><b>Datos de salud (datos sensibles):</b> antecedentes médicos, alergias, medicamentos, diagnósticos, evaluaciones, exámenes, indicaciones, procedimientos realizados, evolución y todo lo que forma parte de tu Ficha Clínica.</li>\n<li><b>Imágenes clínicas:</b> fotografías y/o videos de la zona tratada, tomados antes, durante y/o después de un procedimiento, como parte del registro clínico.</li>\n<li><b>Datos administrativos y de pago:</b> información de agendamiento, boletas, medios de pago utilizados y datos necesarios para emitir documentos de reembolso ante tu previsión o seguro.</li>\n</ul><p>Los datos de salud y las imágenes que permiten identificarte son datos personales sensibles. Por ello, su tratamiento requiere tu consentimiento expreso, el que otorgas mediante la aceptación de este documento, sin perjuicio de los casos en que la ley autoriza su tratamiento sin consentimiento, como la protección de tu vida o salud en una urgencia.</p>"
  },
  {
    "tipo": "texto",
    "texto": "4. FINALIDADES Y BASE DE LICITUD"
  },
  {
    "tipo": "texto",
    "texto": "<p>Tus datos serán tratados exclusivamente para las siguientes finalidades:</p><ul>\n<li><b>Atención de salud:</b> evaluación, diagnóstico, tratamiento, seguimiento clínico y registro en tu Ficha Clínica. Base o Fundamento: tu consentimiento expreso y las obligaciones establecidas en la Ley N° 20.584.</li>\n<li><b>Gestión administrativa:</b> agendamiento, confirmación y recordatorio de citas, cobro, emisión de boletas y documentos de reembolso. Base o Fundamento: la relación de prestación de servicios que mantienes con la Clínica.</li>\n<li><b>Cumplimiento legal:</b> conservación de la Ficha Clínica, obligaciones tributarias y requerimientos de autoridades sanitarias o judiciales. Base o Fundamento: obligación legal.</li>\n<li><b>Seguridad del Paciente y calidad de las atenciones:</b> control de eventos adversos, auditorías clínicas internas y mejora de nuestros protocolos de atención.</li>\n</ul><p>Clínica Armonic jamás venderá ni cederá tus datos a terceros con fines comerciales. Cualquier uso distinto de los aquí descritos requerirá una nueva autorización específica de tu parte, como las indicadas en la Sección 11 del presente Documento.</p>"
  },
  {
    "tipo": "texto",
    "texto": "5. DESTINATARIOS Y ENCARGADOS DEL TRATAMIENTO"
  },
  {
    "tipo": "texto",
    "texto": "<p>Tus datos personales solo serán conocidos por las personas y entidades que lo necesiten o requieran para cumplir las finalidades anteriores:</p><ul>\n<li>Profesionales tratantes y personal de Clínica Armonic, sujetos a deber de confidencialidad y secreto profesional, con acceso limitado según su respectiva función.</li>\n<li>Laboratorios, centros de imagen o especialistas a los que seas derivado, solo con la información estrictamente necesaria para tu atención.</li>\n<li>Proveedores tecnológicos que actúan como encargados del tratamiento (software de Ficha Clínica, agendamiento, almacenamiento en la nube, correo y medios de pago), todos vinculados mediante contratos que les prohíben usar tus datos para fines distintos a la correspondiente atención de salud.</li>\n<li>Isapres, Fonasa o compañías de seguros, únicamente cuando tú lo solicites para gestionar reembolsos o coberturas.</li>\n<li>Autoridades sanitarias, judiciales o administrativas, solo cuando exista una obligación legal.</li>\n</ul><p>Algunos de nuestros proveedores tecnológicos pueden almacenar información en servidores ubicados fuera de Chile. En esos casos, Clínica Armonic exige garantías de seguridad y confidencialidad equivalentes a las exigidas por la ley chilena.</p>"
  },
  {
    "tipo": "texto",
    "texto": "6. PLAZO DE CONSERVACIÓN"
  },
  {
    "tipo": "texto",
    "texto": "<ul>\n<li><b>Ficha clínica:</b> se conserva por un plazo mínimo de quince años, conforme al artículo 13 de la Ley N° 20.584.</li>\n<li><b>Documentos tributarios y de pago:</b> durante el plazo que exige la normativa tributaria.</li>\n<li><b>Datos para comunicaciones o uso de imagen:</b> mientras mantengas vigente tu autorización. Si la revocas, dejaremos de usarlos.</li>\n</ul><p>Cumplidos estos plazos, los datos serán eliminados o anonimizados de forma segura.</p>"
  },
  {
    "tipo": "texto",
    "texto": "7. CONFIDENCIALIDAD Y SEGURIDAD"
  },
  {
    "tipo": "texto",
    "texto": "<p>Clínica Armonic tiene la obligación legal de mantener secreto o confidencialidad acerca de los Datos Personales del titular, salvo cuando el mismo titular los hubiere hecho manifiestamente públicos. Este deber u obligación subsiste aún después de terminada o concluida la relación con el titular. La Clínica adopta las medidas necesarias con el objeto que sus profesionales y dependientes, así como las personas naturales o jurídicas que ejecuten operaciones de tratamiento de datos bajo su responsabilidad, cumplan el deber de secreto o confidencialidad antes señalado.</p><p>Clínica Armonic aplica medidas técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdida o alteración, tales como control de acceso por perfil de usuario, claves personales, respaldo de información y protocolos internos de confidencialidad. Si ocurriera un incidente de seguridad que afecte tus datos sensibles, lo informaremos a la Agencia de Protección de Datos Personales y te lo comunicaremos oportunamente, conforme a la ley.</p>"
  },
  {
    "tipo": "texto",
    "texto": "8. TUS DERECHOS"
  },
  {
    "tipo": "texto",
    "texto": "<p>Como titular de tus datos personales, puedes ejercer en cualquier momento los siguientes derechos:</p><ul>\n<li><b>Acceso:</b> saber qué datos tuyos tratamos y obtener copia de ellos.</li>\n<li><b>Rectificación:</b> modificar o completar datos inexactos, desactualizados o incompletos.</li>\n<li><b>Supresión:</b> solicitar y obtener la eliminación de tus datos, salvo aquellos que la ley nos obliga a conservar, como los contenidos en la Ficha Clínica.</li>\n<li><b>Oposición:</b> oponerte a determinados usos o tratamiento de datos, en especial a comunicaciones comerciales.</li>\n<li><b>Portabilidad:</b> solicitar y obtener una copia de tus datos personales en un formato estructurado, genérico y de uso común, o solicitar su envío a otro prestador.</li>\n<li><b>Bloqueo temporal:</b> solicitar la suspensión temporal del tratamiento de datos personales mientras se resuelve una solicitud.</li>\n</ul><p>Para ejercer tales derechos, escribe a privacidad@clinicarmonic.com o preséntate en Recepción de la Clínica con tu Cédula de Identidad o Pasaporte. Responderemos dentro de 30 (treinta) días corridos, plazo que podrá prorrogarse por una sola vez hasta por 30 (treinta) días adicionales, informándote el motivo de dicha prórroga. El ejercicio de estos derechos es gratuito. Si consideras que tu solicitud no fue atendida adecuadamente, puedes reclamar ante la Agencia de Protección de Datos Personales.</p>"
  },
  {
    "tipo": "texto",
    "texto": "9. REVOCACIÓN DEL CONSENTIMIENTO"
  },
  {
    "tipo": "texto",
    "texto": "Puedes retirar o revocar tu consentimiento en cualquier momento, por el mismo canal indicado en la Sección anterior, sin expresión de causa o motivo. La revocación no tendrá efecto retroactivo, es decir, no afecta la validez de los tratamientos de datos personales realizados antes de ella. Ten presente que, si revocas el consentimiento para el tratamiento de tus datos de salud, no será posible continuar tu atención clínica, aunque tu Ficha Clínica deberá conservarse por el plazo legal."
  },
  {
    "tipo": "texto",
    "texto": "10. PACIENTES MENORES DE EDAD"
  },
  {
    "tipo": "texto",
    "texto": "Tratándose de pacientes menores de 18 (dieciocho) años, este consentimiento debe ser otorgado por su padre, madre o representante legal. Aun así, procuraremos informar al Paciente de manera comprensible para su edad y considerar su opinión, atendiendo siempre a su interés superior."
  },
  {
    "tipo": "texto",
    "texto": "11. AUTORIZACIONES ESPECÍFICAS"
  },
  {
    "tipo": "texto",
    "texto": "Marca tu decisión en cada punto. Las autorizaciones 2 a 4 son voluntarias: si decides no otorgarlas, tu atención no se verá afectada de ninguna manera. Ninguna casilla viene marcada de antemano."
  },
  {
    "tipo": "texto",
    "texto": "<p><b>1. Tratamiento de mis datos de salud para mi atención clínica</b> (obligatoria para poder atenderme).<br/>Autorizo a Clínica Armonic a recolectar, registrar y tratar mis datos de salud para las finalidades de atención descritas en la sección 4.</p>"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Autorizo", "value": "AUTORIZO_DATOS_SALUD" },
      { "tipo": "checkbox", "field": "No autorizo", "value": "NO_AUTORIZO_DATOS_SALUD" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "<p><b>2. Registro fotográfico clínico</b> (voluntaria).<br/>Autorizo la toma de fotografías o videos de la zona tratada para incorporarlos a mi Ficha Clínica y evaluar la evolución del tratamiento. No serán publicados ni compartidos fuera del equipo tratante.</p>"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Autorizo", "value": "AUTORIZO_REGISTRO_FOTOGRAFICO" },
      { "tipo": "checkbox", "field": "No autorizo", "value": "NO_AUTORIZO_REGISTRO_FOTOGRAFICO" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "<p><b>3. Uso académico o científico de imágenes anonimizadas</b> (voluntaria).<br/>Autorizo el uso de mis imágenes clínicas, sin mi rostro completo ni datos que permitan identificarme, en congresos, capacitaciones o publicaciones científicas.</p>"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Autorizo", "value": "AUTORIZO_USO_ACADEMICO_IMAGENES" },
      { "tipo": "checkbox", "field": "No autorizo", "value": "NO_AUTORIZO_USO_ACADEMICO_IMAGENES" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "<p><b>4. Comunicaciones comerciales</b> (voluntaria).<br/>Autorizo recibir información sobre tratamientos, novedades, promociones y eventos de Clínica Armonic por WhatsApp, correo electrónico o SMS. Puedo darme de baja en cualquier momento.</p>"
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "checkbox", "field": "Autorizo", "value": "AUTORIZO_COMUNICACIONES_COMERCIALES" },
      { "tipo": "checkbox", "field": "No autorizo", "value": "NO_AUTORIZO_COMUNICACIONES_COMERCIALES" }
    ]
  },
  {
    "tipo": "texto",
    "texto": "12. DECLARACIÓN DEL PACIENTE"
  },
  {
    "tipo": "texto",
    "texto": "Declaro que he leído y comprendido cabalmente el contenido de este Documento; que se me ha explicado en términos claros qué datos personales se tratarán, con qué finalidades, quiénes podrán conocerlos, por cuánto tiempo y cómo puedo ejercer mis derechos; que he podido formular todas las preguntas que estimé necesarias, y que otorgo mi consentimiento de manera libre, informada, específica e inequívoca, en los términos que he marcado en la Sección 11."
  },
  {
    "tipo": "items",
    "items": [
      { "tipo": "input", "field": "Nombre y Apellidos", "autofill": "nombreCompleto" },
      { "tipo": "input", "field": "RUT / Pasaporte", "autofill": "rut" },
      { "tipo": "input", "field": "Fecha", "autofill": "fecha" }
    ]
  }
];

export class CreateConsentimientoTratamientoDatosPersonales1795188799985 implements MigrationInterface {
    name = 'CreateConsentimientoTratamientoDatosPersonales1795188799985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const existingTemplate = await queryRunner.query(
            `SELECT id FROM template_documentos WHERE nombre = ?`,
            [NOMBRE_TEMPLATE]
        );

        if (existingTemplate.length) {
            console.log(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] Ya existe template_documentos con nombre='${NOMBRE_TEMPLATE}' (id=${existingTemplate[0].id}). No se inserta nada.`);
            return;
        }

        let tipoDocumento = await queryRunner.query(
            `SELECT id FROM tipo_documento WHERE nombre = ?`,
            [NOMBRE_TIPO_DOCUMENTO]
        );

        let idTipoDocumentoFk: number;

        if (tipoDocumento.length) {
            idTipoDocumentoFk = tipoDocumento[0].id;
            console.log(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] Ya existe tipo_documento con nombre='${NOMBRE_TIPO_DOCUMENTO}' (id=${idTipoDocumentoFk}). Se reutiliza.`);
        } else {
            const insertTipoDocumento = await queryRunner.query(
                `INSERT INTO tipo_documento (nombre, descripcion, urlImage) VALUES (?, ?, ?)`,
                [NOMBRE_TIPO_DOCUMENTO, DESCRIPCION_TIPO_DOCUMENTO, URL_IMAGE_TIPO_DOCUMENTO]
            );
            idTipoDocumentoFk = insertTipoDocumento.insertId;
            console.log(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] Se creó tipo_documento '${NOMBRE_TIPO_DOCUMENTO}' (id=${idTipoDocumentoFk}).`);
        }

        await queryRunner.query(
            `INSERT INTO template_documentos (fechaCreacion, fechaActualizacion, idClinicaFk, idTipoDocumentoFk, baseDocumento, nombre, subTipo, urlImage, templatePdfmake)
             VALUES (NOW(), NOW(), ?, ?, ?, ?, ?, ?, NULL)`,
            [ID_CLINICA_FK, idTipoDocumentoFk, JSON.stringify(NUEVO_BASE_DOCUMENTO), NOMBRE_TEMPLATE, SUB_TIPO, URL_IMAGE_TEMPLATE]
        );

        console.log(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] Se insertó la plantilla '${NOMBRE_TEMPLATE}' (idTipoDocumentoFk=${idTipoDocumentoFk}).`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const match = await queryRunner.query(
            `SELECT id, idTipoDocumentoFk FROM template_documentos WHERE nombre = ?`,
            [NOMBRE_TEMPLATE]
        );

        if (!match.length) {
            console.warn(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] No se encontró template_documentos con nombre='${NOMBRE_TEMPLATE}'; no se eliminó nada.`);
            return;
        }

        const id = match[0].id;
        const idTipoDocumentoFk = match[0].idTipoDocumentoFk;

        const referencias = await queryRunner.query(
            `SELECT COUNT(*) as total FROM documentos_firmados WHERE idTemplateDocumentoFk = ?`,
            [id]
        );

        if (Number(referencias[0].total) > 0) {
            console.warn(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] template_documentos.id=${id} tiene ${referencias[0].total} documento(s)_firmados asociados; no se elimina para no romper registros históricos.`);
            return;
        }

        await queryRunner.query(`DELETE FROM template_documentos WHERE id = ?`, [id]);
        console.log(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] Se eliminó template_documentos.id=${id} ('${NOMBRE_TEMPLATE}').`);

        const otrasPlantillas = await queryRunner.query(
            `SELECT COUNT(*) as total FROM template_documentos WHERE idTipoDocumentoFk = ?`,
            [idTipoDocumentoFk]
        );

        if (Number(otrasPlantillas[0].total) === 0) {
            await queryRunner.query(`DELETE FROM tipo_documento WHERE id = ?`, [idTipoDocumentoFk]);
            console.log(`[CreateConsentimientoTratamientoDatosPersonales1795188799985] Se eliminó tipo_documento.id=${idTipoDocumentoFk} ('${NOMBRE_TIPO_DOCUMENTO}').`);
        }
    }
}
