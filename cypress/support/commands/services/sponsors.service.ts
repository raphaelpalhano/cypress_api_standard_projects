Cypress.Commands.add('filterInvoices', (id: string, search = '', size = '', sort = '') => {
  cy.requestWithoutBody(`GET`, `api/v1/sponsors/${id}/payables?search=${search}&size=${size}&sort=${sort}`);
});

Cypress.Commands.add('sapUploadInvoices', (id: string, body: string) => {
  cy.requestWithBody(`POST`, `api/v1/sponsors/${id}/payables`, body);
});

Cypress.Commands.add('resendWebhook', (id: string, body: object) => {
  cy.requestWithBody(`PUT`, `api/v1/sponsors/${id}/webhooks-deliveries`, body);
});
