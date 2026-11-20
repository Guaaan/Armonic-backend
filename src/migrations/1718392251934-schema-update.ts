import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class SchemaUpdate1718392251934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('personas', new TableColumn({
            name: 'pasaporte',
            type: 'varchar',
            isNullable: true, // Indica que la columna puede ser nula
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('personas', 'pasaporte');

    }

}
