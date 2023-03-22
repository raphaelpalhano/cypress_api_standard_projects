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

  it('When I have All cities in AC', () => {
    cy.getBffgeneral('places/ufs/AC/cities').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body).have.property('data');
      expect(res.body.data[0]).have.property('name');
      expect(res.body.data[0]).have.property('code');

      cy.schemaValidation('bff/getValidCities.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I have All States', () => {
    cy.getBffgeneral('places/ufs').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body).have.property('data');
      expect(res.body.data[0]).have.property('name');
      expect(res.body.data[0]).have.property('abbreviation');

      cy.schemaValidation('bff/getValidStates.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
