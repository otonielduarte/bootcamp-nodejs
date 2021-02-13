import { format, getHours, isBefore, startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
  user_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appontments between 8am and 5pm.',
      );
    }

    const sameAppointmentDate = await this.repository.findByDate(
      appointmentDate,
    );

    if (sameAppointmentDate) {
      throw new AppError('Appointment is already booked');
    }

    const appointment = await this.repository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Você tem um novo agendamento para o dia ${format(
        appointmentDate,
        "dd/MM/yyyy 'às' HH:mm'h'",
      )}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
