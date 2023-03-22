import * as investor from '../../../fixtures/static/investors.json';
import * as enterprise from '../../../fixtures/static/enterprise.json';
import { createFees } from '../../../support/commands/helpers/string.control';

describe('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSap('investorApi');
    cy.uploadTaxes(`${investor.id}`, enterprise.data[3].document, createFees(100)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
  });

  it.skip('How investor I want to registry limit', function () {
    cy.authSystem('investor')
      .postInvestors(`${investor.id}/limits`, { enterpriseId: enterprise.data[3].id, limit: 10000000 })
      .then((res) => {
        expect(res.status).to.be.eq(201);
        cy.schemaValidation('investors/postInvestors.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
  });

  it('List limits investor', function () {
    cy.authSystem('investor')
      .getInvestors(`${investor.id}/limits`)
      .then((res) => {
        expect(res.status).to.be.eq(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data[0]).to.have.property('enterpriseId');
        expect(res.body.data[0]).to.have.property('tradingName');
        expect(res.body.data[0]).to.have.property('enterpriseGovernmentId');
        expect(res.body.data[0]).to.have.property('limit');

        cy.schemaValidation('investors/allInvestorLimits.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
  });
});
