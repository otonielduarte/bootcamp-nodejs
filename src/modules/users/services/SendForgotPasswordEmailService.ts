import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import { inject, injectable } from 'tsyringe';
import path from 'path';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

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

    @inject('UserTokensReposiroty')
    private userTokensRepository: IUserTokensRepository,
  ) { }

  public async execute({ email }: IUserRequest): Promise<User | undefined> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError('User not existis');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const template = path.resolve(
      __dirname,
      '..',
      'templates',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: template,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_WEB_DOMAIN}/reset_password?token=${token}`,
        },
      },
    });

    return user;
  }
}

export default SendForgotPasswordEmalService;
