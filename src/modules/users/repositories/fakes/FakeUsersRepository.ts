import { v4 as uuid } from 'uuid';
import ICreateUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/infra/dtos/ICreateUserDTO';

class FakeUsersRepository implements ICreateUserRepository {
  users: User[] = [];

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuid(),
      email,
      name,
      password,
    });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(mUser => mUser.id === user.id);
    if (index) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(mUser => mUser.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(mUser => mUser.email === email);
    return user;
  }
}

export default FakeUsersRepository;
