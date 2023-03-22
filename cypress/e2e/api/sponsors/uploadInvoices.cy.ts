import { createInvoicesJson } from '../../../support/commands/helpers/string.control';

describe('Upload invoice SAP', function () {
  before('Auth', function () {
    cy.authSap('managerApi').then((res) => {
      expect(res.status).to.be.eq(200);
    });
  });

  it('Send 1 invoices for operations', function () {
    cy.sapUploadInvoices('1', createInvoicesJson(1)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
  });
});
