/* eslint-disable camelcase */
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import BaseEntity from '@modules/common/infra/typeorm/entities/BaseEntity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

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
  user: Appointment;

  @OneToMany(() => Appointment, appointment => appointment.provider)
  provider: Appointment;

  @Column()
  @Exclude()
  password: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.WEB_DOMAIN}/files/${this.avatar}`
      : null;
  }
}

export default User;
