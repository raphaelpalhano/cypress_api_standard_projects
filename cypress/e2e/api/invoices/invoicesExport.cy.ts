describe('In invoices service I want to export suppliers invoices', () => {
  before('Auth manager', function () {
    cy.authSystem('manager');
  });

  it('Request with valid enterpriseId and supplierGovermentId', function () {
    const body = {
      supplierGovernmentId: ['79922720000164'],
      startAt: '2023-03-23',
      endAt: '2023-12-09 23:59:00',
      enterprise: {
        governmentId: '213',
        corporateName: 'EMPRESA PEDRO CARDOSA',
      },
    };
    cy.postInvoices('invoices/1/export', body).then((res) => {
      expect(res).to.be.eq(201);
    });
  });

  it('Request with export with invalid supplierId', function () {
    const body = {
      supplierGovernmentId: ['79922720000164'],
      startAt: '2023-03-23',
      endAt: '2023-12-09 23:59:00',
      enterprise: {
        governmentId: '213',
        corporateName: 'EMPRESA PEDRO CARDOSA',
      },
    };
    cy.postInvoices('invoices/32322/export', body).then((res) => {
      expect(res).to.be.eq(201);
    });
  });

  it('Request export with invalid supplierGovernmentId', function () {
    const body = {
      supplierGovernmentId: ['74431020000149'],
      startAt: '2023-03-23',
      endAt: '2023-12-09 23:59:00',
      enterprise: {
        governmentId: '213',
        corporateName: 'EMPRESA PEDRO CARDOSA',
      },
    };
    cy.postInvoices('invoices/1/export', body).then((res) => {
      expect(res).to.be.eq(201);
    });
  });
});
