import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthService from './AuthService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate a user', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const userService = new CreateUserService(fakeRepository, fakeHashProvider);
    const authService = new AuthService(fakeRepository, fakeHashProvider);

    await userService.execute({
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

  it('should be not allowed users with invalid email', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const userService = new CreateUserService(fakeRepository, fakeHashProvider);
    const authService = new AuthService(fakeRepository, fakeHashProvider);

    await userService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(
      authService.execute({
        email: 'invalid@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not allowed users with invalid password', async () => {
    const fakeRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const userService = new CreateUserService(fakeRepository, fakeHashProvider);
    const authService = new AuthService(fakeRepository, fakeHashProvider);

    const user = await userService.execute({
      name: 'Jhon Doe',
      email: 'otonielduarte2@gmail.com',
      password: '123456',
    });

    expect(
      authService.execute({
        email: user.email,
        password: '123456aaa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
