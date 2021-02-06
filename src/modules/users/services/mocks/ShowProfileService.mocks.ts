interface IUserTest {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

interface IUpdateUserTestConfig {
  expected: IUserTest;
  user: IUserTest;
}

export interface IShowProfileTestScenarios {
  [key: string]: IUpdateUserTestConfig;
}

const defaultUser: IUserTest = {
  name: 'Jhon Doe',
  email: 'johndoe@example.com',
  password: '123456',
};

const scenarios: IShowProfileTestScenarios = {
  showProfile: {
    user: defaultUser,
    expected: defaultUser,
  },
};

export { scenarios, defaultUser };
