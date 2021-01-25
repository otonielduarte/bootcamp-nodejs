import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../../modules/users/services/CreateUserService';
import UpdateAvatarService from '../../modules/users/services/UpdateAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const service = new CreateUserService();

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
    const avatarService = new UpdateAvatarService();

    const user_id = request.user.id;
    const { filename } = request.file;

    const user = await avatarService.execute({ user_id, filename });

    return response.json({ success: true, user });
  },
);

export default usersRouter;
