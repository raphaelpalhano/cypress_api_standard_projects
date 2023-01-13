// import * as fees from '../../../fixtures/static/intermediationFees.json';

describe('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
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

  it('Given I get a list of suppliers intermedation fees', function () {
    cy.getOperations('intermediation-fees/suppliers?page=1&sort=corporateName').then((res) => {
      expect(res.body.data).length.above(1);
      expect(res.status).to.be.eq(200);
      expect(res.body.data[0]).to.have.property('fee');
      expect(res.body.data[0]).to.have.property('id');
      expect(res.body.data[0]).to.have.property('supplierGovernmentId');
      expect(res.body.data[0]).to.have.property('supplierName');

      cy.schemaValidation('operations/getAllIntermediation.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('Given I one supplier intermediation fees', function () {
    cy.getOneOperations('intermediation-fees/suppliers?', 'page=All&search=ALLE ALUMINIO&sort=corporateName').then((res) => {
      expect(res.body.data).length.above(0);
      expect(res.status).to.be.eq(200);
      expect(res.body.data[0]).to.have.property('fee');
      expect(res.body.data[0]).to.have.property('id');
      expect(res.body.data[0]).to.have.property('supplierGovernmentId');
      expect(res.body.data[0]).to.have.property('supplierName');
      cy.schemaValidation('operations/getSpecificIntermediation.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('Given I one intermediation fees', function () {
    cy.getOneOperations('intermediation-fees/suppliers?', 'page=All&search=ms8&sort=corporateName').then((res) => {
      expect(res.body.data).length.lessThan(1);
      expect(res.status).to.be.eq(200);
    });
  });

  it('Given I updated intermedation fee the first supplier', function () {
    const body = {
      fee: 15,
      supplierIds: ['1'],
    };
    cy.postOperations('intermediation-fees/suppliers', body).then((resp) => {
      expect(resp.status).to.be.eq(204);
    });
  });

  // afterEach('Delete user created', function () {
  //   cy.deleteOperations('intermediation-fees', this.response.body.id).then((resp) => {
  //     expect(resp.status).to.be.eq(204);
  //   });
  // });
});
