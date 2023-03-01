import * as operations from '../../../fixtures/static/operations.json';
import * as supplier from '../../../fixtures/static/suppliers.json';
import * as investor from '../../../fixtures/static/investors.json';
import { createInvoicesJson } from '../../../support/commands/helpers/string.control';

describe('Given I want to see summary', function () {
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
    cy.authSystem('supplier')
      .getOperations('summary')
      .then((res) => {
        expect(res.body.enterprises[0]).have.property('AVAILABLE');
        expect(res.body.enterprises[0]).have.property('APPROVED');
        expect(res.body.enterprises[0]).have.property('ON_APPROVAL');
        expect(res.body.enterprises[0]).have.property('NOT_PAID');
        expect(res.body.enterprises[0]).have.property('SOLD');
        expect(res.body.enterprises[0]).have.property('name');
        expect(res.body.enterprises[0]).have.property('enterpriseId');
        cy.schemaValidation('operations/supplierSummary.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
  });

  it('How Manager I have summary of the operations', function () {
    cy.authSystem('manager')
      .getOperations('summary')
      .then((res) => {
        expect(res.body.enterprises[0]).have.property('AVAILABLE');
        expect(res.body.enterprises[0]).have.property('APPROVED');
        expect(res.body.enterprises[0]).have.property('ON_APPROVAL');
        expect(res.body.enterprises[0]).have.property('CANCELLED');
        expect(res.body.enterprises[0]).have.property('NOT_APPROVED');
        expect(res.body.enterprises[0]).have.property('SOLD');
        expect(res.body.enterprises[0]).have.property('NEGOTIATED');
        expect(res.body.enterprises[0]).have.property('name');
        expect(res.body.enterprises[0]).have.property('enterpriseId');
        cy.schemaValidation('operations/managerSummary.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
  });

  it('How Investor I have summary of the operations', function () {
    cy.authSystem('investor')
      .getOperations('summary')
      .then((res) => {
        expect(res.body.enterprises[0]).have.property('AVAILABLE');
        expect(res.body.enterprises[0]).have.property('APPROVED');
        expect(res.body.enterprises[0]).have.property('CANCELLED');
        expect(res.body.enterprises[0]).have.property('ON_APPROVAL');
        expect(res.body.enterprises[0]).have.property('NOT_APPROVED');
        expect(res.body.enterprises[0]).have.property('SOLD');
        expect(res.body.enterprises[0]).have.property('name');
        expect(res.body.enterprises[0]).have.property('enterpriseId');
        cy.schemaValidation('operations/investorSummary.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
  });
});
