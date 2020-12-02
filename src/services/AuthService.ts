import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

import User from '../models/User';

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
      throw new Error('Email/Password invalid');
    }

    const passMatch = await compare(password, user.password);
    if (!passMatch) {
      throw new Error('Email/Password invalid');
    }

    const userWithoutPass: Omit<User, 'password'> = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    const token = sign({}, 'e82b99be76d50e7725045465ae11c80a', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user: userWithoutPass, token };
  }
}

export default AuthService;
