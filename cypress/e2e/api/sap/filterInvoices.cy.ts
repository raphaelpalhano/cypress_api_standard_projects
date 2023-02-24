import { createInvoicesJson } from '../../../support/commands/helpers/string.control';

describe('', function () {
  before('Auth', function () {
    cy.authSap('integrator');
    cy.sapUploadInvoices('1', createInvoicesJson(5)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
  });

  it('searching invoices no filters', function () {
    cy.filterInvoices('1').then((res) => {
      const response = res.body;
      expect(response._embedded.payables[0]).to.have.property('id');
      expect(response._embedded.payables[0]).to.have.property('createdAt');
      expect(response._embedded.payables[0]).to.have.property('updatedAt');
      expect(response._embedded.payables[0]).to.have.property('sponsorId');
      expect(response._embedded.payables[0]).to.have.property('assetType');
      expect(response._embedded.payables[0]).to.have.property('companyName');
      expect(response._embedded.payables[0]).to.have.property('paymentDate');
      expect(response._embedded.payables[0]).to.have.property('realPaymentDate');
      expect(response._embedded.payables[0]).to.have.property('paymentValue');
      expect(response._embedded.payables[0]).to.have.property('invoiceDate');
      expect(response._embedded.payables[0]).to.have.property('invoiceNumber');
      expect(response._embedded.payables[0]).to.have.property('invoiceKey');
      expect(response._embedded.payables[0]).to.have.property('supplierName');
      expect(response._embedded.payables[0]).to.have.property('supplierGovernmentId');
      expect(response._embedded.payables[0]).to.have.property('installment');
      expect(response._embedded.payables[0]).to.have.property('totalInstallment');
      expect(response._embedded.payables[0]).to.have.property('compositeKey');
    });
  });

  it('searching invoices with more then 700 R$', function () {
    cy.filterInvoices('1', 'paymentValue>700').then((res) => {
      const response = res.body;
      expect(+response._embedded.payables[0].paymentValue).to.be.greaterThan(700);
    });
  });

  it('searching invoices with more then R$1000 and return 10 invoices in desc order ', function () {
    cy.filterInvoices('1', 'paymentValue>1000', '5', 'id,desc').then((res) => {
      const response = res.body;
      const first = response._embedded.payables[0].id;
      const second = response._embedded.payables[1].id;
      const invoices = response._embedded.payables.length;

      cy.schemaValidation('sap/filterInvoices.json', response).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });

      expect(+response._embedded.payables[0].paymentValue).to.be.greaterThan(1000);
      expect(invoices).to.be.greaterThan(1);
      expect(first).to.be.greaterThan(second);
    });
  });
});
