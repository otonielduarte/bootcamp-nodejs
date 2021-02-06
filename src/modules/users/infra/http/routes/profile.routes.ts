import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/profile', profileController.update);

export default profileRouter;
