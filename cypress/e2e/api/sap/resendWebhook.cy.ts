import { createInvoicesJson, dataIncrement } from '../../../support/commands/helpers/string.control';
import * as investor from '../../../fixtures/static/investors.json';
import * as operations from '../../../fixtures/static/operations.json';
import * as supplier from '../../../fixtures/static/suppliers.json';

describe('Resend webhook if I want update or invoice fail', function () {
  before('', function () {
    cy.authSystem('investor');
    cy.uploadFees(`${investor.id}/upload-fee-file`, 'cypress/fixtures/upload/fees.xlsx').then((resp) => {
      expect(resp.status).to.be.eq(201);
      expect(resp.statusText).to.be.eq('Created');
    });
  });

  beforeEach('Upload invoices', function () {
    cy.authSap('integrator').then((res) => {
      expect(res.status).to.be.eq(200);
    });
    cy.sapUploadInvoices('1', createInvoicesJson(2)).then((res) => {
      expect(res.status).to.be.eq(202);
    });
    cy.filterInvoices('1').then((res) => {
      cy.wrap(res.body._embedded.payables[0]).as('identification');
    });
  });

  it('Resend invoices SOLDED', function () {
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
        cy.authSystem('investor')
          .postOperations(`orders/${resOperation.body.id}/update-status`, { status: operations.status.APPROVED })
          .then((resp) => {
            expect(resp.status).to.be.eq(204);
          });
        cy.postOperations(`orders/${resOperation.body.id}/update-payment`, { status: operations.status.PAID }).then((respn) => {
          expect(respn.status).to.be.eq(204);
        });
      });
    const body = {
      data: dataIncrement(0, '-'),
      eventType: 'CustodyResponseEvent', // "CustodyResponseEvent" AND PayableDuplicatedEvent
      identifcation: this.identification,
    };

    cy.resendWebhook('1', body);
  });

  it.skip('Resend duplicated invoices', function () {
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
        cy.authSystem('investor')
          .postOperations(`orders/${resOperation.body.id}/update-status`, { status: operations.status.APPROVED })
          .then((resp) => {
            expect(resp.status).to.be.eq(204);
          });
        cy.postOperations(`orders/${resOperation.body.id}/update-payment`, { status: operations.status.PAID }).then((respn) => {
          expect(respn.status).to.be.eq(204);
        });
      });
    const body = {
      data: dataIncrement(0, '-'),
      eventType: 'CustodyResponseEvent', // "CustodyResponseEvent" AND PayableDuplicatedEvent
      identifcation: this.identification,
    };
    cy.authSap('integrator').resendWebhook('1', body);
  });
});
