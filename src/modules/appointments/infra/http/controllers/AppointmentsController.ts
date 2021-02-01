import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'To do', appointments: [] });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const service = container.resolve(CreateAppointmentService);

    const appointment = await service.execute({
      provider_id,
      date: parseISO(date),
    });
    return response.json(appointment);
  }
}
