import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserRequest): Promise<User> {
    const repository = getRepository(User);

    const exists = await repository.findOne({
      where: { email },
    });

    if (exists) {
      throw Error('Email address already used.');
    }

    const hPassword = await hash(password, 8);

    const user = repository.create({
      name,
      email,
      password: hPassword,
    });

    await repository.save(user);

    return user;
  }
}

export default CreateUserService;