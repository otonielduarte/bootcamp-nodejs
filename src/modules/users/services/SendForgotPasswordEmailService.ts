import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface IUserRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmalService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ email }: IUserRequest): Promise<User | undefined> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('User not existis');
    }

    this.mailProvider.sendMail(user.email, 'Message');

    return user;
  }
}

export default SendForgotPasswordEmalService;
