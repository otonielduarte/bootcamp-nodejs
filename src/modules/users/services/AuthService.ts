import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IAuthRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: User;
  token: string;
}

@injectable()
class AuthService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    email,
    password,
  }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('Email/Password invalid', 401);
    }

    const passMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passMatch) {
      throw new AppError('Email/Password invalid', 401);
    }

    const { secret = '', expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user: classToClass(user), token };
  }
}

export default AuthService;
