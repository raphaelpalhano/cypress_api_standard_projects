import * as operations from '../../../fixtures/static/operations.json';
import * as supplier from '../../../fixtures/static/suppliers.json';
import * as investor from '../../../fixtures/static/investors.json';
import { createFees, createInvoicesJson } from '../../../support/commands/helpers/string.control';
import * as enterprise from '../../../fixtures/static/enterprise.json';

describe('Given the operator want see market status', function () {
  before('Given my authentication with manager', function () {
    cy.authSap('investorApi')
      .uploadTaxes(`${investor.id}`, enterprise.data[3].document, createFees(100))
      .then((res) => {
        expect(res.status).to.be.eq(202);
      });
  });

  beforeEach(function () {
    cy.authSap('managerApi').then((res) => {
      expect(res.status).to.be.eq(200);
    });
    cy.sapUploadInvoices('1', createInvoicesJson(2)).then((res) => {
      expect(res.status).to.be.eq(202);
    });

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
      });
    cy.authSystem('investor');
  });

  it('When investor paid operation', function () {
    cy.postOperations(`orders/${this.operationId}/update-status`, { status: operations.status.APPROVED }).then((res) => {
      expect(res.status).to.be.eq(204);
    });
    cy.postOperations(`orders/${this.operationId}/update-payment`, { status: operations.status.PAID }).then((res) => {
      expect(res.status).to.be.eq(204);
    });
  });

  it('When investor reject operation', function () {
    cy.postOperations(`orders/${this.operationId}/update-status`, { status: operations.status.NOT_APPROVED }).then((res) => {
      expect(res.status).to.be.eq(204);
    });
  });

  it('When investor cancel operation and list all operations', function () {
    cy.postOperations(`orders/${this.operationId}/update-status`, { status: operations.status.APPROVED }).then((res) => {
      expect(res.status).to.be.eq(204);
    });
    cy.postOperations(`orders/${this.operationId}/update-payment`, { status: operations.status.CANCELLED }).then((res) => {
      expect(res.status).to.be.eq(204);
    });

    cy.getOperations('orders').then((res) => {
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('operations/listOrders.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
