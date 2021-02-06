import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import User from '../infra/typeorm/entities/User';

import {
  scenarios,
  defaultUser,
  secondUser,
} from './mocks/UpdateProfileService.mocks';

let updateProfileService: UpdateProfileService;
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let user: User;

describe('UpdateProfile', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
    user = await fakeUserRepository.create({
      ...defaultUser,
      password: '123456',
    });
  });

  it.each([
    ['should be able update profile', scenarios.updateProfile],
    ['should be able update name field', scenarios.nameUpdate],
    ['should be able update email field', scenarios.emailUpdate],
    ['should be able update password', scenarios.passwordUpdate],
  ])('Test: %s ', async (_, scenario) => {
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      ...scenario.valuesToUpdate,
    });

    expect(updatedUser.name).toBe(scenario.expected.name);
    expect(updatedUser.email).toBe(scenario.expected.email);
    if (scenario.expected.password) {
      expect(updatedUser.password).toBe(scenario.expected.password);
    }
  });

  it('Test: should not be able update to a existing email', async () => {
    const user2 = await fakeUserRepository.create({
      ...secondUser,
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        ...user2,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Test: should not be able update non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        ...user,
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Test: should not be able update password without old_password', async () => {
    await expect(
      updateProfileService.execute({
        ...user,
        user_id: user.id,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Test: should not be able update password with wrong old_password', async () => {
    await expect(
      updateProfileService.execute({
        ...user,
        user_id: user.id,
        old_password: '654321',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
