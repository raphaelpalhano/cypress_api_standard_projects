import { createUserJson } from '../../../support/commands/helpers/string.control';

describe('Given I create new supplier', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When I create new supplier', () => {
    cy.postBff('suppliers/register', createUserJson()).then((res) => {
      expect(res.status).to.be.eq(201);

      // cy.schemaValidation('bff/getAllBanks.json', res.body).then((validation) => {
      //   expect(validation).to.be.eq('Schema validated successfully!');
      // });
    });
  });
});
