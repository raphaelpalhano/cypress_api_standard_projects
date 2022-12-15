import * as enterprises from '../../../fixtures/static/enterprise.json';

describe('User operation the intermediation fees', function () {
  const formobject = {
    key: 'enterpriseId',
    value: enterprises.enpterprises[0].id,
  };
  before('Given my authentication with manager', () => {
    cy.authSystem('manager');
  });

  it('I want upload invoices in operations service', function () {
    cy.uploadInvoices('invoices/upload-file', 'upload/invoicesBack.csv', formobject).then((res) => {
      expect(res.status).to.be.eq(201);
      cy.schemaValidation('operations/uploadValidInvoices.json', res.body).then((validation) => {
        expect(validation).to.be.eq('Schema validated successfully!');
      });
    });
  });

  it('Given that the manager uploaded invoices have invalid date', function () {
    cy.uploadInvoices('invoices/upload-file', 'upload/invoices_invalid_date.csv', formobject).then((res) => {
      cy.convertArrayBinaryToString(res.body, 'latin1').then((resDecode) => {
        expect(resDecode.statusCode).to.be.eq(400);
        expect(resDecode.message).to.be.eq('Data de vencimento inválida.');
        cy.schemaValidation('operations/uploadinvalidInvoices.json', resDecode).then((validation) => {
          expect(validation).to.be.eq('Schema validated successfully!');
        });
      });
    });
  });

  it('Given that the manager uploaded invoices have invalid template', function () {
    cy.uploadInvoices('invoices/upload-file', 'upload/invoices_invalid_template.csv', formobject).then((res) => {
      cy.convertArrayBinaryToString(res.body, 'latin1').then((resDecode) => {
        expect(resDecode.statusCode).to.be.eq(400);
        expect(resDecode.message).to.be.eq('O arquivo não corresponde ao template.');
      });
    });
  });
});
