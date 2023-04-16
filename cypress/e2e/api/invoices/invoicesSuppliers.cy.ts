describe('In invoices service I want to see invoices for suppliers', () => {
  before('Auth manager', function () {
    cy.authSystem('manager');
  });

  it('Request with valid supplierId', function () {
    cy.getInvoices('suppliers/1?search=79922720000164').then((res) => {
      expect(res.status).to.be.eq(200);
      cy.schemaValidation('invoices/invoicesSupplier.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('Request with invalid supplierId', function () {
    cy.getInvoices('suppliers/931').then((res) => {
      expect(res.status).to.be.eq(400);
      expect(res.body.message).to.be.eq('search should not be empty');
    });
  });
});
