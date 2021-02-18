import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { APPOINTMENTS } from '../../helpers/tables';

export default class AddUserIdToAppointments1609859310376
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      APPOINTMENTS,
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      APPOINTMENTS,
      new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(APPOINTMENTS, 'AppointmentUser');
    await queryRunner.dropColumn(APPOINTMENTS, 'user_id');
  }
}
