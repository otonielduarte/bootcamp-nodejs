import BaseEntity from '@modules/common/infra/typeorm/entities/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('user_tokens')
class UserToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;
}

export default UserToken;
