import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateChild1684315816428 implements MigrationInterface {
  private tbl = 'child';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tbl,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'userId',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'nick',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'smallint',
            isNullable: true,
          },
          {
            name: 'birth',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'duebirth',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'placebirth',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'favorite',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'smallint',
            isNullable: true,
            default: 1,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: true
          },
        ]
      }),
    true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tbl);
  }

}
