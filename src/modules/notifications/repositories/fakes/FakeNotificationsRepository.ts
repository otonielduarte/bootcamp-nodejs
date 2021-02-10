import INotificationsDTO from '@modules/notifications/dtos/INotificationsDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository
  implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: INotificationsDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      content,
      recipient_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}
