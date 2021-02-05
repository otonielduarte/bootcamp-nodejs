import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateAvatarService from './UpdateAvatarService';

let updateService: UpdateAvatarService;
let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

const scenarios = {
  updateAvatar: {
    user: {
      name: 'John doe',
      email: 'johndoe@exame.com',
      password: '123121',
    },
    avatar1: {
      filename: 'file-avatar.jpg',
    },
    avatar2: {
      filename: 'new-avatar.jpg',
    },
    expected: { filename: 'file-avatar.jpg' },
  },
  updateAvatarTeste: {
    user: {
      name: 'João da silva',
      email: 'johndoe@exame.com',
      password: '123121',
    },
    avatar1: {
      filename: 'file-avatar.jpg',
    },
    avatar2: {
      filename: 'new-avatar.jpg',
    },
    expected: { filename: 'file-avatar.jpg' },
  },
};

describe('UpdateAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateService = new UpdateAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar image', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateService.execute({
      user_id: user.id,
      filename: 'file-avatar.jpg',
    });

    expect(user.avatar).toBe('file-avatar.jpg');
  });

  it('should not be update avatar from non user exists', async () => {
    await expect(
      updateService.execute({
        user_id: 'non-existing-user',
        filename: 'file-avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it.each([
    [
      'should delete old avatar when users has an avatar',
      scenarios.updateAvatar,
    ],
    [
      'should delete old avatar when users has do joão da silva',
      scenarios.updateAvatarTeste,
    ],
  ])('Test: %s ', async (_, cenario) => {
    const actionDelete = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create(cenario.user);

    await updateService.execute({ user_id: user.id, ...cenario.avatar1 });

    await updateService.execute({ user_id: user.id, ...cenario.avatar2 });

    expect(actionDelete).toHaveBeenCalledWith(cenario.expected.filename);
  });

  /*  it('should delete old avatar when users has an avatar', async () => {
    const actionDelete = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateService.execute({
      user_id: user.id,
      filename: 'file_avatar.jpg',
    });

    await updateService.execute({
      user_id: user.id,
      filename: 'new-avatar.jpg',
    });

    expect(actionDelete).toHaveBeenCalledWith('file_avatar.jpg');
    expect(user.avatar).toBe('new-avatar.jpg');
  }); */
});
