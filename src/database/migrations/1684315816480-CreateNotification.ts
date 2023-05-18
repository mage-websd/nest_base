import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateNotification1684315816480 implements MigrationInterface {
  private tbl = 'notification';

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
            name: 'title',
            type: 'varchar(255)',
          },
          {
            name: 'desc',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'device',
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
            name: 'date',
            type: 'timestamp',
            isNullable: true,
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
