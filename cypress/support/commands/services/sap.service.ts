const URL_BASE = Cypress.env('sapUrl');

Cypress.Commands.add('filterInvoices', (id: string, search = '', size = '', sort = '') => {
  cy.requestWithoutBody(`GET`, `${URL_BASE}sponsors/${id}/payables?search=${search}&size=${size}&sort=${sort}`);
});

Cypress.Commands.add('sapUploadInvoices', (id: string, body: string) => {
  cy.requestWithBody(`POST`, `${URL_BASE}sponsors/${id}/payables`, body);
});

Cypress.Commands.add('resendWebhook', (id: string, body: object) => {
  cy.requestWithBody(`PUT`, `${URL_BASE}sponsors/${id}/webhooks-deliveries`, body);
});
