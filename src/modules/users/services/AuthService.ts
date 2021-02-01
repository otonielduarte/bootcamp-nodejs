import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IAuthRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

@injectable()
class AuthService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
  ) { }

  public async execute({
    email,
    password,
  }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('Email/Password invalid', 401);
    }

    const passMatch = await compare(password, user.password);
    if (!passMatch) {
      throw new AppError('Email/Password invalid', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPass, ...userWithoutPass } = user;

    return { user: userWithoutPass, token };
  }
}

export default AuthService;
