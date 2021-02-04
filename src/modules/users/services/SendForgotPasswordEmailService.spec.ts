import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

let service: SendForgotPasswordEmail;
let fakeMailProvider: FakeMailProvider;
let fakeUserRepository: FakeUsersRepository;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserRepository = new FakeUsersRepository();
    service = new SendForgotPasswordEmail(fakeUserRepository, fakeMailProvider);
  });

  it('should be able to recovery the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await service.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
    // expect(email).toHaveProperty('id');
  });

  it('should not be send email when user non exists', async () => {
    await expect(
      service.execute({
        email: 'johndoe2@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
