import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default class BaseEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
