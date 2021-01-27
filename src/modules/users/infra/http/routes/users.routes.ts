import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const service = container.resolve(CreateUserService);

  const user = await service.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const avatarService = container.resolve(UpdateAvatarService);

    const user_id = request.user.id;
    const { filename } = request.file;

    const user = await avatarService.execute({ user_id, filename });

    return response.json({ success: true, user });
  },
);

export default usersRouter;
