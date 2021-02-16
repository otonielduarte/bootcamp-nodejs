import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import BaseEntity from '@modules/common/infra/typeorm/entities/BaseEntity';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointment: Appointment;

  @OneToMany(() => Appointment, appointment => appointment.provider)
  provider: Appointment;

  @Column()
  @Exclude()
  password: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (process.env.STORAGE_DRIVER) {
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      case 'disk':
      default:
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
  }
}

export default User;
