import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface AppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public create({ provider, date }: AppointmentDTO): Appointment {
    const appointment = new Appointment({
      provider,
      date,
    });
    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentByDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return appointmentByDate || null;
  }

  public all(): Array<Appointment> {
    return this.appointments;
  }

  public get(id: string): Appointment | null {
    const appointment = this.appointments.find(element => {
      return element.id === id;
    });
    return appointment || null;
  }
}

export default AppointmentsRepository;
