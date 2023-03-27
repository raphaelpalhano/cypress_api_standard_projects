import { createInvoicesJson } from '../../../support/commands/helpers/string.control';
import * as supplier from '../../../fixtures/static/suppliers.json';

describe('', function () {
  before('Auth', function () {
    cy.authSap('managerApi');
    cy.sapUploadInvoices('1', createInvoicesJson(3)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
  });

  it('searching invoices no filters', function () {
    cy.filterInvoices('1').then((res) => {
      const response = res.body;
      expect(res.status).to.be.eq(200);

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

      cy.schemaValidation('sponsors/filterInvoices.json', response).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('searching invoices with more then 5 R$', function () {
    cy.filterInvoices('1', 'paymentValue>5').then((res) => {
      const response = res.body;
      expect(+response._embedded.payables[0].paymentValue).to.be.greaterThan(5);
      expect(response.status).to.be.eq(200);
    });
  });

  it('searching invoices with more then R$3 and return 1 or more invoices in desc order ', function () {
    cy.filterInvoices('1', 'paymentValue>3', '2', 'id,desc').then((res) => {
      const response = res.body;
      const first = response._embedded.payables[0].id;
      const second = response._embedded.payables[1].id;
      const invoices = response._embedded.payables.length;

      expect(+response._embedded.payables[0].paymentValue).to.be.greaterThan(3);
      expect(invoices).to.be.greaterThan(1);
      expect(first).to.be.greaterThan(second);
      expect(res.status).to.be.eq(200);
    });
  });

  after('submit all invoices', () => {
    cy.authSystem('supplier')
      .postOperations('orders', { supplierGovernmentId: supplier.document })
      .then((resOperation) => {
        cy.wrap(resOperation.body.id).as('operationId');
        expect(resOperation.status).to.be.eq(201);
        cy.submitOrder('orders', resOperation.body.id, { bankAccountId: supplier.bankAccounts[0].id }).then((response) => {
          expect(response.status).to.be.eq(204);
        });
      });
  });
});
