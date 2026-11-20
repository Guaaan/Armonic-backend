import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDatosFormularioToAnexos1727000000000 implements MigrationInterface {
    name = 'AddDatosFormularioToAnexos1727000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("anexos", new TableColumn({
            name: "datosFormulario",
            type: "json", 
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("anexos", "datosFormulario");
    }
}
