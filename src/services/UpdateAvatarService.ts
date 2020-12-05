import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateAvatarService {
  public async execute({
    user_id,
    filename,
  }: Request): Promise<Omit<User, 'password'>> {
    const repository = getRepository(User);
    const user = await repository.findOne(user_id);

    if (!user) {
      throw new Error('Unauthenticated user');
    }

    if (user.avatar) {
      const currentFilePath = path.join(uploadConfig.directory, user.avatar);
      const existsAvatar = await fs.promises.stat(currentFilePath);
      if (existsAvatar) {
        await fs.promises.unlink(currentFilePath);
      }
    }
    user.avatar = filename;

    await repository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...customUser } = user;
    return customUser;
  }
}

export default UpdateAvatarService;
