import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthService from './AuthService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authService: AuthService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authService = new AuthService(fakeUsersRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate a user', async () => {
    await createUser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const response = await authService.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should be not allowed authenticate with invalid user', async () => {
    await expect(
      authService.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not allowed users with invalid password', async () => {
    const user = await createUser.execute({
      name: 'Jhon Doe',
      email: 'otonielduarte2@gmail.com',
      password: '123456',
    });

    await expect(
      authService.execute({
        email: user.email,
        password: '123456aaa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
