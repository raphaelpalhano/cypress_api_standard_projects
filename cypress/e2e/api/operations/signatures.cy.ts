import * as operations from '../../../fixtures/static/operations.json';
import * as supplier from '../../../fixtures/static/suppliers.json';
import * as investor from '../../../fixtures/static/investors.json';
import { createInvoicesJson } from '../../../support/commands/helpers/string.control';

describe('Given I want to see term of assignment', function () {
  before('Given my authentication with manager', function () {
    cy.authSystem('investor');

    cy.uploadFees(`${investor.id}/upload-fee-file`, 'cypress/fixtures/upload/fees.xlsx').then((resp) => {
      expect(resp.status).to.be.eq(201);
      expect(resp.statusText).to.be.eq('Created');
    });
  });

  beforeEach(function () {
    cy.authSap('integrator').then((res) => {
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
        cy.authSystem('investor')
          .postOperations(`orders/${resOperation.body.id}/update-status`, { status: operations.status.APPROVED })
          .then((resp) => {
            expect(resp.status).to.be.eq(204);
          });
        cy.postOperations(`orders/${resOperation.body.id}/update-payment`, { status: operations.status.PAID }).then((respn) => {
          expect(respn.status).to.be.eq(204);
        });
      });
  });

  it('How Supplier I have summary of the operations', function () {
    cy.getOperations('orders/signatures').then((res) => {
      expect(res.body[0]).have.property('id');
      expect(res.body[0]).have.property('hash');
      expect(res.body[0].hash).is.length(64);
      expect(res.body[0]).have.property('orderId');
      expect(res.body[0]).have.property('date');
      cy.schemaValidation('operations/orderSignatures.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });

      cy.getOperations(`orders/signatures/${res.body[0].id}/document`).then((response) => {
        expect(response.status).to.be.eq(200);
        cy.schemaValidation('operations/orderDocument.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
    });
  });
});
