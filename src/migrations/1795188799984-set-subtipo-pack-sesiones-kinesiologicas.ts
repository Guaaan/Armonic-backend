import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * El selector múltiple de plantillas (ListadoquirurgicoComponent, front) ahora
 * también se abre para idTipoDocumentoFk=10 (Pack Sesiones Kinesiológicas) y
 * filtra por subTipo='kinesiologico'. Las dos filas existentes de esa
 * categoría (id=10 "Pack Sesiones Kinesiológicas" e id=9007 "Lipedema,
 * Linfedema y Celulitis", creada en la migración
 * 1795188799983-create-template-lipedema-linfedema-celulitis) tenían
 * subTipo='' y por lo tanto no aparecían en ese selector. Se les asigna
 * subTipo='kinesiologico' para que ambas aparezcan como opciones.
 */

const ID_TIPO_DOCUMENTO_FK = 10;
const SUB_TIPO_ANTERIOR = "";
const SUB_TIPO_NUEVO = "kinesiologico";

export class SetSubtipoPackSesionesKinesiologicas1795188799984 implements MigrationInterface {
    name = 'SetSubtipoPackSesionesKinesiologicas1795188799984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const result = await queryRunner.query(
            `UPDATE template_documentos SET subTipo = ? WHERE idTipoDocumentoFk = ? AND subTipo = ?`,
            [SUB_TIPO_NUEVO, ID_TIPO_DOCUMENTO_FK, SUB_TIPO_ANTERIOR]
        );

        console.log(`[SetSubtipoPackSesionesKinesiologicas1795188799984] Filas actualizadas con subTipo='${SUB_TIPO_NUEVO}' (idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK}).`, result);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `UPDATE template_documentos SET subTipo = ? WHERE idTipoDocumentoFk = ? AND subTipo = ?`,
            [SUB_TIPO_ANTERIOR, ID_TIPO_DOCUMENTO_FK, SUB_TIPO_NUEVO]
        );

        console.log(`[SetSubtipoPackSesionesKinesiologicas1795188799984] Revertido subTipo a '${SUB_TIPO_ANTERIOR}' (idTipoDocumentoFk=${ID_TIPO_DOCUMENTO_FK}).`);
    }
}
