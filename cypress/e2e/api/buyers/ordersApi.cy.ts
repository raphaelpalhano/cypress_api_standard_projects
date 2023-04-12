import { createInvoicesJson } from '../../../support/commands/helpers/string.control';
import * as supplier from '../../../fixtures/static/suppliers.json';

describe('Given I have API for research for orders', function () {
  before('Auth investorApi', function () {
    cy.authSap('investorApi');
  });

  it('When I list all orders', () => {
    cy.getOrdersApi('1/purchases/').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body._embedded.purchases[0]).to.have.property('status');
      expect(res.body._embedded.purchases[0]).to.have.property('purchaseId');
      expect(res.body._embedded.purchases[0]).to.have.property('tax');
      expect(res.body._embedded.purchases[0]).to.have.property('days');
      expect(res.body._embedded.purchases[0]).to.have.property('paymentDate');
      expect(res.body._embedded.purchases[0]).to.have.property('sponsorName');
      expect(res.body._embedded.purchases[0]).to.have.property('sponsorGovernmentId');
      expect(res.body._embedded.purchases[0]).to.have.property('sellerName');

      cy.schemaValidation('buyers/ordersApi.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I list all orders with invalid investorId', () => {
    cy.getOrdersApi('112/purchases/').then((res) => {
      expect(res.status).to.be.eq(403);
    });
  });

  it('When I get specific orders', () => {
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

        cy.authSap('investorApi');
        cy.getOrdersApi(`1/purchases/${resOperation.body.id}`).then((res) => {
          expect(res.status).to.be.eq(200);

          cy.schemaValidation('buyers/orderApi.json', res.body).then((validation) => {
            expect(validation).to.be.eq('Schema validated successfully!');
          });
        });
      });
  });

  it('When I get specific orders with invalid orderId', () => {
    cy.getOrdersApi(`1/purchases/132144`).then((res) => {
      expect(res.status).to.be.eq(404);
    });
  });

  it('When I get specific orders with invalid investorId', () => {
    cy.getOrdersApi(`122/purchases/1`).then((res) => {
      expect(res.status).to.be.eq(403);
    });
  });
});
