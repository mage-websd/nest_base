import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateInjectionBook1684315816430 implements MigrationInterface {
  private tbl = 'injectionbook';

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
            name: 'vacDate',
            type: 'timestamp',
          },
          {
            name: 'vacId',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'address',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'int',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'childId',
            type: 'int',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'note',
            type: 'text',
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
