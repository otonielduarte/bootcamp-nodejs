import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userEmail = await this.repository.findByEmail(email);
    if (userEmail && userEmail.id !== user_id) {
      throw new AppError('E-mail already in used');
    }

    if (password) {
      if (!old_password) {
        throw new AppError('Old password must be informad');
      }
      if (!(await this.hashProvider.compareHash(old_password, user.password))) {
        throw new AppError('Old password is invalid');
      }
      user.password = await this.hashProvider.generateHash(password);
    }
    if (name) user.name = name;
    if (email) user.email = email;

    await this.repository.save(user);

    return user;
  }
}

export default UpdateProfileService;
