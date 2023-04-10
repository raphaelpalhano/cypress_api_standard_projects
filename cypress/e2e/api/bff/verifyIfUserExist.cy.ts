describe('Given I have suppliers', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When I verify if supplier already exist', () => {
    cy.getBffgeneral('suppliers/cnpj/check/79922720000164').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.exists).to.be.eq(true);

      // cy.schemaValidation('bff/getAllBanks.json', res.body).then((validation) => {
      //   expect(validation).to.be.eq('Schema validated successfully!');
      // });
    });
  });

  it('When I verify if supplier not exist', () => {
    cy.getBffgeneral('suppliers/cnpj/check/79922720000168').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.exists).to.be.eq(false);

      // cy.schemaValidation('bff/getAllBanks.json', res.body).then((validation) => {
      //   expect(validation).to.be.eq('Schema validated successfully!');
      // });
    });
  });
});
