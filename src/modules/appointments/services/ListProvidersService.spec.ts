import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';
import { scenarios, listUsers } from './mocks/ListProvidersService.mock';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let loggedUser: User;

describe('ListProviders', () => {
  beforeEach(() => {
    const fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );

    listUsers.forEach(async (user, index) => {
      const createdUser = await fakeUsersRepository.create(user);
      if (index === 0) loggedUser = createdUser;
    });
  });

  it.each([
    ['should be able to show all providers', scenarios.findAll],
    ['should be able to show all providers exclude', scenarios.findAllExclude],
  ])('Test: %s ', async (_, cenario) => {
    const providers = await listProvidersService.execute({
      user_id: cenario.excludeLogged ? loggedUser.id : undefined,
    });
    expect(providers.length).toEqual(cenario.expected.length);
  });
});
