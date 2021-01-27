import ICreateUserDTO from '../infra/dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface ICreateUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
