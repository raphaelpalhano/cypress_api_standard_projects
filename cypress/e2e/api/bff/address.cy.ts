describe('Given I research for Zip Code', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When I have valid Zip code', () => {
    cy.getBffSpecific('addresses/cep', '88106102').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body).have.property('zipCode');
      expect(res.body).have.property('line');
      expect(res.body).have.property('zipCode');
      expect(res.body).have.property('city');
      expect(res.body).have.property('uf');
      expect(res.body).have.property('district');
      expect(res.body).have.property('country');

      cy.schemaValidation('bff/getValidZipCode.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have invalid Zip code', () => {
    cy.getBffSpecific('addresses/cep', '578685846').then((res) => {
      expect(res.status).to.be.eq(400);
      cy.schemaValidation('bff/getInvalidZipCode.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have invalid format Zip code', () => {
    cy.getBffSpecific('addresses/cep', '88106103,3').then((res) => {
      expect(res.status).to.be.eq(400);
      expect(res.body.message).to.be.eq('Invalid CEP format.');
    });
  });
});
