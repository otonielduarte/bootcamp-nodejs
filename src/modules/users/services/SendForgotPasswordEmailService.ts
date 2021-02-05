import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

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

    const token = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      user.email,
      `Solicitação de recuperaão de senha ${token.token}`,
    );

    return user;
  }
}

export default SendForgotPasswordEmalService;
