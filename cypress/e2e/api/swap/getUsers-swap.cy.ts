describe('Given I have request to get peoples in swap api', () => {
  it('List of people', () => {
    cy.getSwap('/people/').then((res) => {
      expect(res.status).to.be.eq(200);

      cy.schemaValidation('swap/peoples/get_peoples.json', res.body).then((validation) => {
        expect(validation).to.be.equal('Schema validated successfully!');
      });
    });
  });
});
