import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../entities/User';
import AppError from '../../../shared/errors/AppError';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: UserRequest): Promise<Omit<User, 'password'>> {
    const repository = getRepository(User);

    const exists = await repository.findOne({
      where: { email },
    });

    if (exists) {
      throw new AppError('Email address already used.');
    }

    const hPassword = await hash(password, 8);

    const user = repository.create({
      name,
      email,
      password: hPassword,
    });

    await repository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...custom } = user;

    return custom;
  }
}

export default CreateUserService;
