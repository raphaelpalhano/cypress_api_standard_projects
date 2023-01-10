import * as users from '../../../fixtures/static/users.json';

describe('Given I have specific permissions each entity', function () {
  it('When I have manager permissions', () => {
    cy.authSystem('manager');
    cy.getPermissionsUsers('permissions').then((res) => {
      expect(res.body).to.have.property('menu');
      expect(res.body.menu[0]).to.have.property('path');
      expect(res.body.menu[0].entity).to.eql('manager');

      cy.schemaValidation('users/getManagerPermission.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have investor permissions', () => {
    cy.authSystem('investor');
    cy.getPermissionsUsers('permissions').then((res) => {
      expect(res.body).to.have.property('menu');
      expect(res.body.menu[0]).to.have.property('path');
      expect(res.body.menu[0].entity).to.have.eql('investor');
      cy.schemaValidation('users/getInvestorPermission.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have supplier permissions', () => {
    cy.authSystem('supplier');
    cy.getPermissionsUsers('permissions').then((res) => {
      expect(res.body).to.have.property('menu');
      expect(res.body.menu[0]).to.have.property('path');
      expect(res.body.menu[0].entity).to.eql('supplier');
      cy.schemaValidation('users/getSupplierPermission.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
