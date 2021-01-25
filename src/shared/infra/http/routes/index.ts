import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/auth', authRouter);

export default routes;
