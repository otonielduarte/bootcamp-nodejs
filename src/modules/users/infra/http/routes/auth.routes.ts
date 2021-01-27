import { Router } from 'express';
import AuthService from '@modules/users/services/AuthService';
import { container } from 'tsyringe';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authService = container.resolve(AuthService);

  const { user, token } = await authService.execute({ email, password });

  return response.json({ user, token });
});

export default authRouter;
