describe('Given I research for banks accounts', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When I get valid bank', () => {
    cy.getBffgeneral('banks').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body[0]).have.property('name');
      expect(res.body[0]).have.property('code');
      expect(res.body[0]).have.property('label');

      cy.schemaValidation('bff/getAllBanks.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
