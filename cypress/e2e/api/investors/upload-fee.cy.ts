import * as investor from '../../../fixtures/static/investors.json';

describe('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('investor');
    cy.getListOfEnterprises('enterprises').then((res) => {
      cy.wrap(res.body.data[0].document).as('enterpriseId');
    });
  });

  it('I want upload invoices in operations service', function () {
    cy.uploadFees(`${investor.id}/upload-fee-file`, 'upload/fees.xlsx').then((res) => {
      console.log(res);
      expect(res.status).to.be.eq(201);
      expect(res.statusText).to.be.eq('Created');
    });
  });

  it('I want upload invoices in operations service', function () {
    cy.uploadFees(`${investor.id}/upload-fee-file`, 'upload/fees.xlsx').then((res) => {
      console.log(res);
      expect(res.status).to.be.eq(201);
      expect(res.statusText).to.be.eq('Created');
    });
  });
});
