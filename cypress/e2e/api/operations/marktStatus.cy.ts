describe('Given the operator want see market status', function () {
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('When market is open', function () {
    cy.getOperations('market-status').then((res) => {
      expect(res.status).to.be.eq(403);
      // expect(res.body.currentDay).to.have.property('marketStatus');
      // expect(res.body.currentDay).to.have.property('reason');
      // expect(res.body.currentDay).to.have.property('openingTime');
      // expect(res.body.currentDay).to.have.property('closingTime');
      // expect(res.body.nextWorkingDay).to.have.property('date');
      // expect(res.body.nextWorkingDay).to.have.property('date');
      // expect(res.body.nextWorkingDay).to.have.property('openingTime');
      // expect(res.body.nextWorkingDay).to.have.property('closingTime');

      // expect(res.body.currentDay.openingTime).to.eq('10:00:00');
      // expect(res.body.currentDay.closingTime).to.eq('15:00:00');
    });
  });
});
