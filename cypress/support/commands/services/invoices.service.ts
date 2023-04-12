Cypress.Commands.add('getInvoices', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `proxy/invoices/api/v1/${endpoint}`);
});

Cypress.Commands.add('postInvoices', (endpoint: string, body: object) => {
  cy.requestWithBody(`POST`, `proxy/invoices/api/v1/${endpoint}`, body);
});
