import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const repository = new AppointmentsRepository();

/* appointmentsRouter.get('/', async (_, response) => {
  // const repository = getCustomRepository(IAppointmentsRepository);
  const result = await repository.find();
  return response.json(result);
});
 */
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);
  const service = new CreateAppointmentService(repository);
  const appointment = await service.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
