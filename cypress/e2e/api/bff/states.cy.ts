describe('Given I research for States', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When I get all States', () => {
    cy.getBffgeneral('places/ufs').then((res) => {
      expect(res.status).to.be.eq(403);
      // expect(res.body.data).length.above(10);
      // expect(res.body.data[0]).have.property('name');
      // expect(res.body.data[0]).have.property('abbreviation');

      // cy.schemaValidation('bff/getAllStates.json', res.body).then((validation) => {
      //   expect(validation).to.be.eq('Schema validated successfully!');
      // });
    });
  });
});
