import * as investor from '../../../fixtures/static/investors.json';

describe('User operation the intermediation fees', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('investor');
    cy.getListOfEnterprises('enterprises').then((res) => {
      cy.wrap(res.body.data[0].document).as('enterpriseDocument');
      cy.wrap(res.body.data[0].id).as('enterpriseID');
    });

    cy.getInvestors('').then((res) => {
      cy.wrap(res.body.data[0].id).as('investorsId');
      console.log(res);
      expect(res.status).to.be.eq(200);
      expect(res.body.data[0]).have.property('id');
      expect(res.body.data[0]).have.property('corporateName');
      expect(res.body.data[0]).have.property('document');
      expect(res.body.data[0]).have.property('tradingName');
      expect(res.body.data[0]).have.property('createdAt');
      expect(res.body.data[0]).have.property('updatedAt');

      cy.schemaValidation('investors/getInvestors.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });

    cy.uploadFees(`${investor.id}/upload-fee-file`, 'upload/fees.xlsx').then((res) => {
      console.log(res);
      expect(res.status).to.be.eq(201);
      expect(res.statusText).to.be.eq('Created');
    });
  });

  it('How investor I want to se lists investors', function () {
    cy.getInvestors(`order?enterpriseId=${this.enterpriseID}&document=${this.enterpriseDocument}`).then((res) => {
      console.log(res);
      expect(res.status).to.be.eq(200);
      expect(res.body.limits[0]).have.property('id');
      expect(res.body.limits[0]).have.property('investorId');
      expect(res.body.limits[0]).have.property('enterpriseId');
      expect(res.body.limits[0]).have.property('limit');
      expect(res.body).have.property('fees');
      expect(res.body.fees[0]).have.property('investorId');
      expect(res.body.fees[0]).have.property('enterpriseId');
      expect(res.body.fees[0]).have.property('days');
      expect(res.body.fees[0]).have.property('fee');
      expect(res.body.fees[0]).have.property('group');

      cy.schemaValidation('investors/getLimits.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('How investor I want to se lists investors', function () {
    cy.postInvestors(`${this.investorsId}/limits`, { enterpriseId: this.enterpriseID, limit: 10000000 }).then((res) => {
      expect(res.status).to.be.eq(201);
      cy.schemaValidation('investors/postInvestors.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('How investor I want to updated my limit', function () {
    const body = {
      enterpriseId: this.enterpriseID,
      limit: 10000000,
    };
    cy.getInvestors(`order?enterpriseId=${this.enterpriseID}&document=${this.enterpriseDocument}`).then((res) => {
      expect(res.status).to.be.eq(200);
      cy.patchInvestors(`${res.body.limits[0].investorId}/limits/${res.body.limits[0].id}`, body).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).have.property('investorId');
        expect(response.body).have.property('enterpriseId');
        expect(response.body).have.property('limit');

        cy.schemaValidation('investors/patchInvestors.json', response.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
    });
  });
});
