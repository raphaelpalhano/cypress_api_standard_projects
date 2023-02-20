describe('', function () {
  before('Auth', function () {
    cy.authSap('integrator');
  });

  it('searching invoices no filters', function () {
    cy.filterInvoices('1').then((res) => {
      const response = res.body;
      expect(response._embedded.payables[0]).to.have.property('id');
      expect(response._embedded.payables[0]).to.have.property('createdAt');
      expect(response._embedded.payables[0]).to.have.property('updatedAt');
      expect(response._embedded.payables[0]).to.have.property('sponsorId');
      expect(response._embedded.payables[0]).to.have.property('assetType');
      expect(response._embedded.payables[0]).to.have.property('companyName');
      expect(response._embedded.payables[0]).to.have.property('paymentDate');
      expect(response._embedded.payables[0]).to.have.property('realPaymentDate');
      expect(response._embedded.payables[0]).to.have.property('paymentValue');
      expect(response._embedded.payables[0]).to.have.property('invoiceDate');
      expect(response._embedded.payables[0]).to.have.property('invoiceNumber');
      expect(response._embedded.payables[0]).to.have.property('invoiceKey');
      expect(response._embedded.payables[0]).to.have.property('supplierName');
      expect(response._embedded.payables[0]).to.have.property('supplierGovernmentId');
      expect(response._embedded.payables[0]).to.have.property('installment');
      expect(response._embedded.payables[0]).to.have.property('totalInstallment');
      expect(response._embedded.payables[0]).to.have.property('compositeKey');
    });
  });

  it('searching invoices with more then 700 R$', function () {
    cy.filterInvoices('1', 'paymentValue>700').then((res) => {
      const response = res.body;
      expect(+response._embedded.payables[0].paymentValue).to.be.greaterThan(700);
    });
  });

  it('searching invoices with more then 700 R$', function () {
    cy.filterInvoices('1', 'paymentValue>700').then((res) => {
      const response = res.body;
      expect(+response._embedded.payables[0].paymentValue).to.be.greaterThan(700);
    });
  });
});
