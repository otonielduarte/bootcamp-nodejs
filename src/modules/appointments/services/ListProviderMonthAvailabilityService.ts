import { getDate, getDaysInMonth, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailability {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
        {
          provider_id,
          year,
          month,
        },
      );
      await this.cacheProvider.save(cacheKey, appointments);
    }
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = (appointments || []).filter(appointment => {
        return getDate(appointment.date) === day;
      });

      const available =
        isAfter(compareDate, new Date()) && appointmentsInDay.length < 10;

      return {
        day,
        available,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailability;
