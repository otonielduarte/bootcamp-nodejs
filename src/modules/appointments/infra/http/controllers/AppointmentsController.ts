import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const service = container.resolve(CreateAppointmentService);

    const appointment = await service.execute({
      provider_id,
      date,
      user_id,
    });

    return response.json(appointment);
  }
}
