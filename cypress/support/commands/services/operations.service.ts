Cypress.Commands.add('getOperations', (endpoint: string) => {
  cy.requestWithoutBody('GET', `proxy/operations/api/v1/${endpoint}`);
});

Cypress.Commands.add('getOneOperations', (endpoint: string, params: string) => {
  cy.requestWithoutBodyButParam(`GET`, `proxy/operations/api/v1/${endpoint}`, params);
});

Cypress.Commands.add('postOperations', (endpoint: string, body: object) => {
  cy.requestWithBody(`POST`, `proxy/operations/api/v1/${endpoint}`, body);
});

Cypress.Commands.add('deleteOperations', (endpoint: string, id: string) => {
  cy.requestWithoutBody(`DELETE`, `proxy/operations/api/v1/${endpoint}/${id}`);
});

Cypress.Commands.add('patchOperations', (endpoint: string, id: number, body: object) => {
  cy.requestWithBody(`PATCH`, `proxy/operations/api/v1/${endpoint}/${id}`, body);
});

Cypress.Commands.add('updateOperations', (endpoint: string, id: string, body: object) => {
  cy.requestWithBody(`PUT`, `proxy/operations/api/v1/${endpoint}/${id}`, body);
});

Cypress.Commands.add('uploadInvoices', (endpoint: string, filePath: string, formObject: object) => {
  cy.requestFormData('POST', `proxy/operations/api/v1/${endpoint}`, filePath, 'file', 'text/csv', formObject);
});

Cypress.Commands.add('submitOrder', (endpoint: string, orderId: string, body: object) => {
  cy.requestWithBody(`POST`, `proxy/operations/api/v1/${endpoint}/${orderId}/submit`, body);
});
