import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

const validateFields = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.when('old_password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
    password_confirmation: Joi.when('password', {
      is: Joi.exist(),
      then: Joi.valid(Joi.ref('password')).required(),
    }),
  },
});

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', validateFields, profileController.update);

export default profileRouter;
