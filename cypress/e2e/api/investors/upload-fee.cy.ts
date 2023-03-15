import * as investor from '../../../fixtures/static/investors.json';

describe.skip('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('investor');
    cy.getListOfEnterprises('enterprises').then((res) => {
      cy.wrap(res.body.data[0].document).as('enterpriseId');
    });
  });

  it('I want upload fees in investors service', function () {
    cy.uploadFees(`${investor.id}/upload-fee-file`, 'cypress/fixtures/upload/fees.xlsx').then((res) => {
      console.log(res);
      expect(res.status).to.be.eq(201);
      expect(res.statusText).to.be.eq('Created');
    });
  });
});
