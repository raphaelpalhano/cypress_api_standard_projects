// import * as fees from '../../../fixtures/static/intermediationFees.json';

describe.skip('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
    const body = {
      fee: 15,
      supplierIds: 1,
    };
    cy.postOperations('intermediation-fees/suppliers', body).then((resp) => {
      expect(resp.status).to.be.eq(201);
    });
  });

  it('Given I get a list of enterprises intermedation fees', function () {
    cy.getOperations('intermediation-fees/enterprises?page=1&sort=corporateName').then((res) => {
      expect(res.body.data).length.above(1);
      expect(res.status).to.be.eq(200);
      expect(res.body.data[0]).to.have.property('fee');
      expect(res.body.data[0]).to.have.property('id');
      expect(res.body.data[0]).to.have.property('enterpriseId');
      expect(res.body.data[0]).to.have.property('author');

      cy.schemaValidation('operations/getAllIntermediationEnterprise.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('Given I registry intermedation fee the first supplier', function () {
    cy.patchOperations('intermediation-fees/enterprises/', 14, { fe: 20 }).then((res) => {
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('operations/patchIntermediationEnterprise.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  // afterEach('Delete user created', function () {
  //   cy.deleteOperations('intermediation-fees', this.response.body.id).then((resp) => {
  //     expect(resp.status).to.be.eq(204);
  //   });
  // });
});
