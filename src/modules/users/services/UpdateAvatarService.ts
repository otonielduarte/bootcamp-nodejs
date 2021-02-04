import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  filename: string;
}
@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({
    user_id,
    filename,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppError('Unauthenticated user', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const savedFilename = await this.storageProvider.saveFile(filename);

    user.avatar = savedFilename;

    await this.repository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...customUser } = user;
    return customUser;
  }
}

export default UpdateAvatarService;
