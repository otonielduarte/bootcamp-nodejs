/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import UserModel from '../models/User';

interface UserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: UserDTO): Promise<UserModel> {
    const repository = getRepository(UserModel);

    const exists = repository.findOne({
      where: { email },
    });

    if (exists) {
      throw new Error('Email address already used');
    }

    const user = repository.create({
      name,
      email,
      password,
    });

    await repository.save(user);

    return user;
  }
}

export default CreateUserService;
