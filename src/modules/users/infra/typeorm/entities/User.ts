import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import uploadConfig from '@config/upload';
import BaseEntity from '@shared/infra/typeorm/entities/BaseEntity';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (process.env.STORAGE_DRIVER) {
      case 'disk':
        return `${process.env.APP_DOMAIN}:${process.env.APP_PORT}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
