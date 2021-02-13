import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    @inject('HasProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ name, email, password }: IUserRequest): Promise<User> {
    const exists = await this.repository.findByEmail(email);

    if (exists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.repository.create({
      name,
      email,
      password: hashPassword,
    });

    await this.cacheProvider.invalidatePrefix('provider-list');

    return user;
  }
}

export default CreateUserService;
