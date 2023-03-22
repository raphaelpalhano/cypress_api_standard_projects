import * as investor from '../../../fixtures/static/investors.json';
import * as enterprise from '../../../fixtures/static/enterprise.json';
import { createFees } from '../../../support/commands/helpers/string.control';

describe('User Investor api upload taxes', function () {
  before('Given my authentication with manager', () => {
    cy.authSap('investorApi');
  });

  it('I want upload fees in investors service', function () {
    cy.uploadTaxes(`${investor.id}`, enterprise.data[3].document, createFees(100)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
  });
});
