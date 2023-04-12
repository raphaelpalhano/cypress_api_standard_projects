import { createInvoicesJson } from '../../../support/commands/helpers/string.control';
import * as supplier from '../../../fixtures/static/suppliers.json';

describe('Given I have API for research for orders', function () {
  before('Auth investorApi', function () {
    cy.authSap('investorApi');
  });

  it('When I list all invoices in order operation', () => {
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

        cy.getInvoicesInOrdersApi(`1/purchases/${resOperation.body.id}/purchase-items`).then((res) => {
          expect(res.status).to.be.eq(200);
          expect(res.body['_embedded']['purchase-items']).to.be.greaterThan(1);

          cy.schemaValidation('buyers/invoicesOrdersApi.json', res.body).then((validation) => {
            expect(validation).to.be.eq('Schema validated successfully!');
          });
        });
      });
  });

  it('When I list all invoices in order operation with investorId invalid', () => {
    cy.getInvoicesInOrdersApi(`3213/purchases/1/purchase-items`).then((res) => {
      expect(res.status).to.be.eq(403);
    });
  });

  it('When I list all invoices in order operation with orderId invalid', () => {
    cy.getInvoicesInOrdersApi(`1/purchases/312312/purchase-items`).then((res) => {
      expect(res.status).to.be.eq(404);
    });
  });

  it('When I get specific invoice in orders', () => {
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

        cy.getInvoicesInOrdersApi(`1/purchases/${resOperation.body.id}/purchase-items/1`).then((res) => {
          expect(res.status).to.be.eq(200);

          cy.schemaValidation('buyers/specificInvoicesOrdersApi.json', res.body).then((validation) => {
            expect(validation).to.be.eq('Schema validated successfully!');
          });
        });
      });
  });
});
