describe.skip('Given the operator want see market status', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When market is open', function () {
    cy.getOperations('market-status').then((res) => {
      expect(res.status).to.be.eq(200);
    });
  });
});
