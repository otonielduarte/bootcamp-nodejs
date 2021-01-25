import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import authRouter from './auth.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/auth', authRouter);

export default routes;
