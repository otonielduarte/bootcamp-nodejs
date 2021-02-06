const scenarios = {
  resetPassword: {
    user: {
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    },
    newPassword: '654321',
    expired: {
      isExpired: false,
      timeExpired: 0,
    },
    expecteds: {
      calledWith: '654321',
      toBe: '654321',
    },
  },
  resetPasswordExpired: {
    user: {
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456',
    },
    expired: {
      isExpired: true,
      timeExpired: 3,
    },
    newPassword: '654321',
    expecteds: {
      calledWith: '654321',
      toBe: '654321',
    },
  },
};

export default scenarios;
