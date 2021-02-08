/* eslint-disable camelcase */
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
class User {
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
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
