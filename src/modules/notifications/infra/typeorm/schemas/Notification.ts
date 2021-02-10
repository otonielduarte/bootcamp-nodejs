import BaseEntity from '@modules/common/infra/typeorm/entities/BaseEntity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('notifications')
class Notification extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false })
  read: boolean;
}

export default Notification;
