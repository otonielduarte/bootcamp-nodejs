import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPassWordService from './ResetPasswordService';

let resetPasswordService: ResetPassWordService;
let fakeUserRepository: FakeUsersRepository;
let fakeTokenRepository: FakeUserTokensRepository;

describe('ResetPassWord', () => {
  beforeEach(() => {
    fakeTokenRepository = new FakeUserTokensRepository();
    fakeUserRepository = new FakeUsersRepository();
    const fakeHashprovider = new FakeHashProvider();

    resetPasswordService = new ResetPassWordService(
      fakeUserRepository,
      fakeTokenRepository,
      fakeHashprovider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const token = await fakeTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '654321',
      token: token.token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('654321');

    // expect(email).toHaveProperty('id');
  });
});
