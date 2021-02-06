interface IUserTest {
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

interface IUpdateUserTestConfig {
  expected: IUserTest;
  user: IUserTest;
  valuesToUpdate: IUserTest;
}

export interface IUpdateTestScenarios {
  [key: string]: IUpdateUserTestConfig;
}

const defaultUser: IUserTest = {
  name: 'Jhon Doe',
  email: 'johndoe@example.com',
  password: '123456',
};
const secondUser: IUserTest = {
  name: 'Another Jhon Doe',
  email: 'new-johndoe@example.com',
  password: '123456',
};
const scenarios: IUpdateTestScenarios = {
  updateProfile: {
    user: defaultUser,
    valuesToUpdate: {
      name: 'Doe Jhon',
      email: 'new-johndoe@example.com',
    },
    expected: {
      name: 'Doe Jhon',
      email: 'new-johndoe@example.com',
    },
  },
  nameUpdate: {
    user: defaultUser,
    valuesToUpdate: {
      name: 'Doe Jhon',
      email: 'johndoe@example.com',
    },
    expected: {
      name: 'Doe Jhon',
      email: 'johndoe@example.com',
    },
  },
  emailUpdate: {
    user: defaultUser,
    valuesToUpdate: {
      name: 'Jhon Doe',
      email: 'new.johndoe@example.com',
    },
    expected: {
      name: 'Jhon Doe',
      email: 'new.johndoe@example.com',
    },
  },
  passwordUpdate: {
    user: defaultUser,
    valuesToUpdate: {
      name: 'Jhon Doe',
      email: 'new.johndoe@example.com',
      old_password: '123456',
      password: '654321',
    },
    expected: {
      name: 'Jhon Doe',
      email: 'new.johndoe@example.com',
      password: '654321',
    },
  },
};

export { scenarios, defaultUser, secondUser };
