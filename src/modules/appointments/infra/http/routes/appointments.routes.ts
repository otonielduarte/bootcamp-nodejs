import { parseISO } from 'date-fns';
import { Router } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (_, response) => {
  // const repository = getCustomRepository(IAppointmentsRepository);
  const result = await repository.find();
  return response.json(result);
});
 */
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const service = container.resolve(CreateAppointmentService);

  const appointment = await service.execute({
    provider_id,
    date: parseISO(date),
  });
  return response.json(appointment);
});

export default appointmentsRouter;
