import { faker } from '@faker-js/faker';

export default {
  userFirstAccess(loginType: string) {
    switch (loginType) {
      case 'valido':
        return {
          email: Cypress.env('USERS').EMAIL,
          otp: 'Lk24@b',
          newpass: Cypress.env('USERS').PASSWORD_SIGNUP,
          confirmpass: Cypress.env('USERS').PASSWORD_SIGNUP,
        };
      case 'email_invalido':
        return {
          email: 'raphael12',
          otp: 'Lk24@b',
          newpass: Cypress.env('USERS').PASSWORD_SIGNUP,
          confirmpass: Cypress.env('USERS').PASSWORD_SIGNUP,
        };
      case 'password_invalido':
        return {
          email: Cypress.env('USERS').EMAIL,
          otp: 'Lk24@b',
          newpass: '1224234',
          confirmpass: '1224234',
        };
      case 'password_diferente':
        return {
          email: Cypress.env('USERS').EMAIL,
          otp: 'Lk24@b',
          newpass: '123456',
          confirmpass: '1347128429',
        };
      case 'random':
        return {
          email: faker.internet.email(),
          otp: 'Lk24@b',
          newpass: faker.internet.password(),
          confirmpass: faker.internet.password(),
        };

      default:
        return { notfound: 'O login não foi encontrado!' };
    }
  },
};
