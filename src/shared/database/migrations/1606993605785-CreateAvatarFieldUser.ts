import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableColumn } from 'typeorm/schema-builder/table/TableColumn';

export default class CreateAvatarFieldUser1606993605785
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
