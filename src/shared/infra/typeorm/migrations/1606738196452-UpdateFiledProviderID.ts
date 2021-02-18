import {
  MigrationInterface as IMigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { APPOINTMENTS } from '../../helpers/tables';

export default class UpdateFiledProviderID1606738196452
  implements IMigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(APPOINTMENTS, 'provider');

    await queryRunner.addColumn(
      APPOINTMENTS,
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      APPOINTMENTS,
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(APPOINTMENTS, 'AppointmentProvider');

    await queryRunner.dropColumn(APPOINTMENTS, 'provider_id');

    await queryRunner.addColumn(
      APPOINTMENTS,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
