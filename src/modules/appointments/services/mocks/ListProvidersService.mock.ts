import ICreateUserDTO from '@modules/users/infra/dtos/ICreateUserDTO';

const user1: ICreateUserDTO = {
  name: 'John Trê',
  email: 'johntre@example.com',
  password: '123456',
};

const user2: ICreateUserDTO = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
};

const user3: ICreateUserDTO = {
  name: 'John Qua',
  email: 'johnqua@example.com',
  password: '123456',
};

const listUsers: ICreateUserDTO[] = [user1, user2, user3];

const scenarios = {
  findAll: {
    users: listUsers,
    excludeLogged: false,
    expected: listUsers,
  },
  findAllExclude: {
    users: listUsers,
    excludeLogged: true,
    expected: [user2, user3],
  },
};

export { scenarios, listUsers };
