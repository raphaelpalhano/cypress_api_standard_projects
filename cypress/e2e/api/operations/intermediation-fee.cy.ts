// import * as fees from '../../../fixtures/static/intermediationFees.json';

describe('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });
  // beforeEach('create a new feee', function () {
  //   cy.postOperations('intermediation-fees', fees.api.max).then((res) => {
  //     cy.wrap(res).as('response');
  //     expect(res.body.fee).equal('99.9999999');
  //     cy.schemaValidation('operations/postIntermationSuccess.json', res.body).then((validation) => {
  //       expect(validation).to.be.eq('Schema validated successfully!');
  //     });
  //   });
  // });

  it.skip('Given I get a list the intermedation fees', function () {
    cy.getOperations('intermediation-fees').then((res) => {
      expect(res.body.data).length.above(0);
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('operations/getAllIntermediation.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it.skip('Given I one intermediation fees', function () {
    cy.getOneOperations('intermediation-fees', this.response.body.id).then((res) => {
      expect(res.body.data).length.above(1);
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('operations/getAllIntermediation.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it.skip('Given I updated one fee with random value', function () {
    const body = {
      fee: 10,
      enterpriseId: this.response.body.enterpriseId,
    };
    cy.patchOperations('intermediation-fees', this.response.body.id, body).then((resp) => {
      expect(resp.body.fee).to.be.eq('10.0000000');
      cy.schemaValidation('operations/patchIntermediationFees.json', resp.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('Given I updated one global fee', function () {
    const body = {
      fee: 10,
    };
    cy.getOperations('global-intermediation-fees').then((res) => {
      cy.updateOperations('global-intermediation-fees', res.body.id, body).then((resp) => {
        expect(resp.body.fee).to.be.eq('10.0000000');
        expect(resp.status).to.be.eq(200);

        cy.schemaValidation('operations/updateGlobalFees.json', resp.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
    });
  });

  // afterEach('Delete user created', function () {
  //   cy.deleteOperations('intermediation-fees', this.response.body.id).then((resp) => {
  //     expect(resp.status).to.be.eq(204);
  //   });
  // });
});
