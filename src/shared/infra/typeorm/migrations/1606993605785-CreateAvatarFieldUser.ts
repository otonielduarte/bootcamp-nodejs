import {
  MigrationInterface as IMigrationInterface,
  QueryRunner,
} from 'typeorm';
import { TableColumn } from 'typeorm/schema-builder/table/TableColumn';
import { USERS } from '../../helpers/tables';

export default class CreateAvatarFieldUser1606993605785
  implements IMigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      USERS,
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(USERS, 'avatar');
  }
}
