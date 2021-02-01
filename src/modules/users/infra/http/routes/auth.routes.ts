import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const authRouter = Router();
const sessionsController = new SessionsController();

authRouter.post('/', sessionsController.create);

export default authRouter;
