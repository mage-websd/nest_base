import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1683952997679 implements MigrationInterface {
  private tbl = 'user';

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
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'phone',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'smallint',
            isNullable: true,
          },
          {
            name: 'birth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'favorite',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'refCode',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'refFrom',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'SMALLINT',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tbl);
  }

}
