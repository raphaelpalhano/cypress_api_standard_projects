import * as bffData from '../../../fixtures/static/bff.json';

describe('Given I research for States', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When I get all States', () => {
    cy.getBffgeneral('places/ufs').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.data).length.above(10);
      expect(res.body.data[0]).have.property('name');
      expect(res.body.data[0]).have.property('abbreviation');

      cy.schemaValidation('bff/getAllStates.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have AC in my UF', () => {
    cy.getBffgeneral(`places/ufs/${bffData.UF.AC}/cities`).then((res) => {
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('bff/getvalidCities.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have invalid sail', () => {
    cy.getBffgeneral(`places/ufs/WX/cities`).then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.data).length.below(1);
      cy.schemaValidation('bff/getInvalidCities.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
