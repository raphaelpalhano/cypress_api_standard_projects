describe('Enterprise limits', function () {
  before('auth with investor', function () {
    cy.authSystem('investor');
  });

  it('research all enterprises limits', function () {
    cy.getEnterprisesLimits('limits', '1').then((res) => {
      expect(res.status).to.be.eq(200);
      expect(res.body.data).length.to.be.above(1);
      expect(res.body.data[0]).to.have.property('enterpriseId');
      expect(res.body.data[0]).to.have.property('tradingName');
      expect(res.body.data[0]).to.have.property('enterpriseGovernmentId');
      expect(res.body.data[0]).to.have.property('limit');
      cy.schemaValidation('investors/getAllEnterprisesLimits.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });
});
