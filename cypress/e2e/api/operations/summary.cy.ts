import * as operations from '../../../fixtures/static/operations.json';
import * as enterprises from '../../../fixtures/static/enterprise.json';
import * as investor from '../../../fixtures/static/investors.json';

describe('Given I want to see summary', function () {
  before('Given my authentication with manager', function () {
    cy.authSystem('supplier')
      .getEntityId()
      .then((entityId) => {
        cy.getSupplierInfo('suppliers', entityId).then((supplier) => {
          cy.wrap(supplier.body.document).as('documentSupplier');
          cy.wrap(supplier.body.bankAccounts[0].id).as('bankId');
        });
      });
    cy.getListOfEnterprises('enterprises').then((resEnterprise) => {
      cy.wrap(resEnterprise.body.data[0].document).as('enterpriseDocument');
      cy.wrap(resEnterprise.body.data[0].id).as('enterpriseID');

      const bodyPatchInvestors = {
        enterpriseId: resEnterprise.body.data[0].id,
        limit: 10000000,
      };

      cy.authSystem('investor')
        .getInvestors(`order?enterpriseId=${resEnterprise.body.data[0].id}&document=${resEnterprise.body.data[0].document}`)
        .then((resLimite) => {
          if (!resLimite.body.limits) {
            cy.postInvestors(`${investor.id}/limits`, { enterpriseId: enterprises.enpterprises[0].id, limit: 10000000 }).then((respPostInvestor) => {
              expect(respPostInvestor.status).to.be.eq(201);
            });
          }

          cy.patchInvestors(`${resLimite.body.limits[0].investorId}/limits/${resLimite.body.limits[0].id}`, bodyPatchInvestors).then((response) => {
            expect(response.status).to.be.eq(200);
          });

          cy.uploadFees(`${investor.id}/upload-fee-file`, 'cypress/fixtures/upload/fees.xlsx').then((resp) => {
            expect(resp.status).to.be.eq(201);
            expect(resp.statusText).to.be.eq('Created');
          });
        });
    });
  });

  beforeEach(function () {
    const formobject = {
      key: 'enterpriseId',
      value: enterprises.enpterprises[0].id,
    };

    cy.authSystem('manager')
      .uploadInvoices('invoices/upload-file', 'cypress/fixtures/upload/invoicesBack.csv', formobject)
      .then((res) => {
        expect(res.status).to.be.eq(201);
      });

    cy.authSystem('supplier')
      .postOperations('orders', { document: this.documentSupplier })
      .then((res) => {
        cy.wrap(res.body.id).as('operationId');
        expect(res.status).to.be.eq(201);
        cy.schemaValidation('operations/createNewOrder.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
        cy.submitOrder('orders', res.body.id, { bankAccountId: this.bankId, orderId: this.operationId }).then((response) => {
          expect(response.status).to.be.eq(204);
        });
        cy.authSystem('investor')
          .postOperations(`orders/${res.body.id}/update-status`, { status: operations.status.APPROVED })
          .then((resp) => {
            expect(resp.status).to.be.eq(204);
          });
        cy.postOperations(`orders/${res.body.id}/update-payment`, { status: operations.status.PAID }).then((respn) => {
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
        expect(res.body.enterprises[0]).have.property('PAID');
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
        expect(res.body.enterprises[0]).have.property('PAID');
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
        expect(res.body.enterprises[0]).have.property('PAID');
        expect(res.body.enterprises[0]).have.property('name');
        expect(res.body.enterprises[0]).have.property('enterpriseId');
        cy.schemaValidation('operations/investorSummary.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
  });
});
