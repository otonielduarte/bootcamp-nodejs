import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IResetRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('UserTokensReposiroty')
    private userTokensRepository: IUserTokensRepository,

    @inject('HasProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    password,
    token,
  }: IResetRequest): Promise<User | undefined> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('Token is inválid');
    }

    const user = await this.repository.findById(userToken.id);
    if (!user) {
      throw new AppError('User non-exists');
    }

    user.password = await this.hashProvider.generateHash(password);
    return user;
  }
}

export default ResetPasswordService;
