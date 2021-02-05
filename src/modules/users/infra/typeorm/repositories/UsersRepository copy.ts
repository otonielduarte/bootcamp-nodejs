import { getRepository, Repository } from 'typeorm';
import ICreateUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements ICreateUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });
    await this.repository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const savedUser = await this.repository.save(user);
    return savedUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}

export default UsersRepository;
