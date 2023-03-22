import { createFees, createInvoicesJson } from '../../../support/commands/helpers/string.control';
import * as investor from '../../../fixtures/static/investors.json';
import * as operations from '../../../fixtures/static/operations.json';
import * as supplier from '../../../fixtures/static/suppliers.json';
import * as enterprise from '../../../fixtures/static/enterprise.json';

describe('Resend webhook if I want update or invoice fail', function () {
  before('', function () {
    cy.authSap('investorApi');
    cy.uploadTaxes(`${investor.id}`, enterprise.data[3].document, createFees(90)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
  });

  beforeEach('Upload invoices', function () {
    cy.authSap('managerApi').then((res) => {
      expect(res.status).to.be.eq(200);
    });
    cy.sapUploadInvoices('1', createInvoicesJson(2)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
    cy.filterInvoices('1').then((res) => {
      cy.wrap(res.body._embedded.payables[0]).as('identification');
    });
  });

  it('Approved operation with api', function () {
    cy.authSystem('supplier')
      .postOperations('orders', { supplierGovernmentId: supplier.document })
      .then((resOperation) => {
        cy.wrap(resOperation.body.id).as('operationId');
        expect(resOperation.status).to.be.eq(201);
        cy.schemaValidation('operations/createNewOrder.json', resOperation.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
        cy.submitOrder('orders', resOperation.body.id, { bankAccountId: supplier.bankAccounts[0].id }).then((response) => {
          expect(response.status).to.be.eq(204);
        });

        cy.authSap('investorApi');
        cy.approveOrRefusedOrder('1', resOperation.body.id, { status: 'APPROVED' });

        cy.authSystem('investor')
          .postOperations(`orders/${resOperation.body.id}/update-payment`, { status: operations.status.PAID })
          .then((respn) => {
            expect(respn.status).to.be.eq(204);
          });
      });
  });

  it('Refused operation with api', function () {
    cy.authSystem('supplier')
      .postOperations('orders', { supplierGovernmentId: supplier.document })
      .then((resOperation) => {
        cy.wrap(resOperation.body.id).as('operationId');
        expect(resOperation.status).to.be.eq(201);
        cy.schemaValidation('operations/createNewOrder.json', resOperation.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
        cy.submitOrder('orders', resOperation.body.id, { bankAccountId: supplier.bankAccounts[0].id }).then((response) => {
          expect(response.status).to.be.eq(204);
        });

        cy.authSap('investorApi');
        cy.approveOrRefusedOrder('1', resOperation.body.id, { status: 'NOT_APPROVED' });
      });
  });
});
