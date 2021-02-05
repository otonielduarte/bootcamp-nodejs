import { Router } from 'express';
import ForgoPasswordController from '../controllers/ForgoPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgoPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', forgotPasswordController.update);

export default passwordRouter;
