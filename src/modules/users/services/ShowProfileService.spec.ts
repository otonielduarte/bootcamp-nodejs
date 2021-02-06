import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';
import User from '../infra/typeorm/entities/User';

import { scenarios, defaultUser } from './mocks/ShowProfileService.mocks';

let showProfileService: ShowProfileService;
let fakeUserRepository: FakeUsersRepository;
let user: User;

describe('UpdateProfile', () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
    user = await fakeUserRepository.create({
      ...defaultUser,
      password: '123456',
    });
  });

  it('Test: should be show the profile', async () => {
    const user2 = await showProfileService.execute({ user_id: user.id });
    expect(user2).toMatchObject(user);
  });

  it('Test: should not be able show the profile with invalid id', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
