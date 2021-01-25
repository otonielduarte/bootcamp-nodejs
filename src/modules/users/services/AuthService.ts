import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../entities/User';
import auth from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

class AuthService {
  public async execute({
    email,
    password,
  }: AuthRequest): Promise<AuthResponse> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

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
