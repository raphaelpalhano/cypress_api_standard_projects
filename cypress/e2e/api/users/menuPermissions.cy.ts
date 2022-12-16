// import * as users from '../../../fixtures/static/users.json';

describe('Given I have specific permissions each entity', function () {
  it('When I have manager permissions', () => {
    cy.authSystem('manager');
    cy.getPermissionsUsers('permissions').then((res) => {
      // expect(res.body).to.deep.eq(users.manager);
      cy.schemaValidation('users/getManagerPermission.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have investor permissions', () => {
    cy.authSystem('investor');
    cy.getPermissionsUsers('permissions').then((res) => {
      // expect(res.body).to.deep.eq(users.investor);
      cy.schemaValidation('users/getInvestorPermission.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have supplier permissions', () => {
    cy.authSystem('supplier');
    cy.getPermissionsUsers('permissions').then((res) => {
      // expect(res.body).to.deep.eq(users.supplier);
      cy.schemaValidation('users/getSupplierPermission.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
