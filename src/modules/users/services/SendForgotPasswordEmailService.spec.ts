import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

let sendEmailService: SendForgotPasswordEmail;
let fakeMailProvider: FakeMailProvider;
let fakeUserRepository: FakeUsersRepository;
let fakeTokenRepository: FakeUserTokensRepository;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeTokenRepository = new FakeUserTokensRepository();
    fakeUserRepository = new FakeUsersRepository();

    sendEmailService = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeMailProvider,
      fakeTokenRepository,
    );
  });

  it('should be able to recovery the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendEmailService.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
    // expect(email).toHaveProperty('id');
  });

  it('should not be send email when user non exists', async () => {
    await expect(
      sendEmailService.execute({
        email: 'johndoe2@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendEmailService.execute({
      email: 'johndoe@example.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
