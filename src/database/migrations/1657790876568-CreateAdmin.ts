import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAdmin1657790876568 implements MigrationInterface {

  private tbl = 'admin';

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
            name: 'username',
            type: 'varchar(255)',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar(255)',
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
