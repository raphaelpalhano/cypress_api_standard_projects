import * as bffData from '../../../fixtures/static/bff.json';

describe('Given I research for INSS', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When I get valid INSS', () => {
    cy.getBffgeneral(`documents/cnpj/${bffData.INSS.valid}`).then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body).have.property('tradingName');
      expect(res.body).have.property('establishment');
      expect(res.body).have.property('cnae');

      cy.schemaValidation('bff/getValidINSS.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I get invalid INSS', () => {
    cy.getBffgeneral(`documents/cnpj/${bffData.INSS.invalid}`).then((res) => {
      expect(res.status).to.be.eq(400);

      cy.schemaValidation('bff/getInvalidINSS.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
