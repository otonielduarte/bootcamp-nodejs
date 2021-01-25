import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const sameAppointmentDate = await repository.findByDate(appointmentDate);

    if (sameAppointmentDate) {
      throw Error('Appointment is already booked');
    }

    const appointment = repository.create({
      provider_id,
      date: appointmentDate,
    });

    await repository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
