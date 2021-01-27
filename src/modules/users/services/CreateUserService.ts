import { hash } from 'bcryptjs';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

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
  ) { }

  public async execute({
    name,
    email,
    password,
  }: IUserRequest): Promise<Omit<User, 'password'>> {
    const exists = await this.repository.findByEmail(email);

    if (exists) {
      throw new AppError('Email address already used.');
    }

    const hPassword = await hash(password, 8);

    const user = await this.repository.create({
      name,
      email,
      password: hPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...custom } = user;

    return custom;
  }
}

export default CreateUserService;
