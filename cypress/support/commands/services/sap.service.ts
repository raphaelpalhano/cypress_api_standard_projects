const URL_BASE = Cypress.env('sapUrl');

Cypress.Commands.add('getInvoiceList', (id: string, params: { search: ''; size: ''; sort: '' }) => {
  cy.requestWithoutBody(`GET`, `${URL_BASE}sponsors/${id}/payables?search=${params.search}&size=${params.size}&sort=${params.sort}`);
});

Cypress.Commands.add('sapUploadInvoices', (id: string, body: string) => {
  cy.requestWithBody(`POST`, `${URL_BASE}sponsors/${id}/payables`, body);
});
