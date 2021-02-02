import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeRepository = new FakeUsersRepository();
    const service = new CreateUserService(fakeRepository);

    const user = await service.execute({
      name: 'Otoniel Moreira Duarte',
      email: 'otonielduarte2@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('otonielduarte2@gmail.com');
  });

  it('should be not to create two users with same email', async () => {
    const fakeRepository = new FakeUsersRepository();
    const service = new CreateUserService(fakeRepository);

    await service.execute({
      name: 'Otoniel Moreira Duarte',
      email: 'otonielduarte2@gmail.com',
      password: '123456',
    });

    expect(
      service.execute({
        name: 'Otoniel Moreira Duarte',
        email: 'otonielduarte2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
