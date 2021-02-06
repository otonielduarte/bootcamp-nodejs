import ICreateUserDTO from '../infra/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '../infra/dtos/IFindAllUsersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findAll(data: IFindAllUsersDTO): Promise<User[]>;
  save(data: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
