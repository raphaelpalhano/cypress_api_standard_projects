describe('Report invoice each Entity', () => {
  it('I want to see invoices report with suppliers', function () {
    cy.authSystem('supplier')
      .getOperations('invoices/report')
      .then((res) => {
        expect(res).to.be.eq(200);
      });
  });

  it('I want to see invoices report with investor', function () {
    cy.authSystem('investor')
      .getOperations('invoices/report')
      .then((res) => {
        expect(res.status).to.be.eq(200);
        cy.schemaValidation('buyers/orderApi.json', res.body).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
  });

  it('I want to see invoices report with manager', function () {
    cy.authSystem('manager')
      .getOperations('invoices/report')
      .then((res) => {
        expect(res.status).to.be.eq(200);
      });
  });
});
