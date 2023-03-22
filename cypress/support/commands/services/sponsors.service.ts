Cypress.Commands.add('filterInvoices', (id: string, search = '', size = '', sort = '') => {
  cy.requestWithoutBody(`GET`, `${Cypress.env('sapUrl')}sponsors/${id}/payables?search=${search}&size=${size}&sort=${sort}`);
});

Cypress.Commands.add('sapUploadInvoices', (id: string, body: string) => {
  cy.requestWithBody(`POST`, `${Cypress.env('sapUrl')}sponsors/${id}/payables`, body);
});

Cypress.Commands.add('resendWebhook', (id: string, body: object) => {
  cy.requestWithBody(`PUT`, `${Cypress.env('sapUrl')}sponsors/${id}/webhooks-deliveries`, body);
});
