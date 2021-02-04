import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeRepository: FakeAppointmentsRepository;
let service: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentsRepository();
    service = new CreateAppointmentService(fakeRepository);
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await service.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should be not to create two users with the same email', async () => {
    const date = new Date(2021, 1, 2, 11);

    await service.execute({
      date,
      provider_id: '123456',
    });

    await expect(
      service.execute({
        date,
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
