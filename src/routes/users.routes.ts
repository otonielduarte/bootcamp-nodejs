import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (_, response) => {
  return response.json([]);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const service = new CreateUserService();

    const user = await service.execute({
      name,
      email,
      password,
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userResponse);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
