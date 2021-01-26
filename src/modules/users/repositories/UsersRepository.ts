import { EntityRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> { }

export default UserRepository;
