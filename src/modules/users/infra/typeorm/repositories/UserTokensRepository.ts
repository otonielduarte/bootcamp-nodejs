import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokens from '../entities/UserTokens';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const userToken = await this.repository.findOne({ where: { token } });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = this.repository.save({ user_id });
    return userToken;
  }
}

export default UserTokensRepository;
