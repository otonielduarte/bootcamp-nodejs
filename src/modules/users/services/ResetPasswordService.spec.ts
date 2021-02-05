import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPassWordService from './ResetPasswordService';
import scenarios from './ResetPassWordService.mocks';

let resetPasswordService: ResetPassWordService;
let fakeUserRepository: FakeUsersRepository;
let fakeTokenRepository: FakeUserTokensRepository;
let fakeHashprovider: FakeHashProvider;

describe('ResetPassWord', () => {
  beforeEach(() => {
    fakeTokenRepository = new FakeUserTokensRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeHashprovider = new FakeHashProvider();

    resetPasswordService = new ResetPassWordService(
      fakeUserRepository,
      fakeTokenRepository,
      fakeHashprovider,
    );
  });

  it.each([
    ['should be able to reset password', scenarios.resetPassword],
    [
      'should not be able to reset password if expired token time',
      scenarios.resetPasswordExpired,
    ],
  ])('Test: %s ', async (_, cenario) => {
    const generateHash = jest.spyOn(fakeHashprovider, 'generateHash');
    const user = await fakeUserRepository.create(cenario.user);

    const { token } = await fakeTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      password: cenario.newPassword,
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(
        customDate.getHours() + cenario.expired.timeExpired,
      );
    });

    if (cenario.expired.isExpired) {
      await expect(
        resetPasswordService.execute({
          password: cenario.newPassword,
          token,
        }),
      ).rejects.toBeInstanceOf(AppError);
    } else {
      expect(generateHash).toHaveBeenCalledWith(cenario.expecteds.calledWith);
      expect(updatedUser?.password).toBe(cenario.expecteds.toBe);
    }
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123456',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeTokenRepository.generate('non-existing-user');
    await expect(
      resetPasswordService.execute({
        password: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
