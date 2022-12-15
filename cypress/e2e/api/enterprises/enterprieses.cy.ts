describe('Given the operator want supplier informations', function () {
  before('Given my authentication with supplier', () => {
    cy.authSystem('supplier');
    cy.getListOfEnterprises('enterprises').then((res) => {
      cy.wrap(res.body.data[0].document).as('enterpriseDocument');
    });
  });

  it('When I have a list enterprises', () => {
    cy.getListOfEnterprises('enterprises').then((res) => {
      expect(res.body.data).length.above(0);
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('enterprises/listEnterprises.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('When I get enterprise id with governmentId', function () {
    // const enterprises = ['16701716000156'];
    cy.postRetreveIdEnterprise('enterprises/retrieve-id', [this.enterpriseDocument]).then((res) => {
      expect(res.body).length.above(0);
      expect(res.status).to.be.eq(201);
      cy.schemaValidation('enterprises/retrieveIdEnterprises.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
