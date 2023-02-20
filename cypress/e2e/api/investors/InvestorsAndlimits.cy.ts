import * as investor from '../../../fixtures/static/investors.json';
import * as enterprise from '../../../fixtures/static/enterprise.json';

describe('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('investor');
    cy.uploadFees(`${investor.id}/upload-fee-file`, 'cypress/fixtures/upload/fees.xlsx').then((res) => {
      console.log(res);
      expect(res.status).to.be.eq(201);
      expect(res.statusText).to.be.eq('Created');
    });
  });

  it('How investor I want to registry limit', function () {
    cy.postInvestors(`${investor.id}/limits`, { enterpriseId: enterprise.enpterprises[0].id, limit: 10000000 }).then((res) => {
      expect(res.status).to.be.eq(201);
      cy.schemaValidation('investors/postInvestors.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
