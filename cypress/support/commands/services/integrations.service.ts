Cypress.Commands.add('getIntegrations', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `integrations/api/v1/${endpoint}`);
});

Cypress.Commands.add('getSpecificIntegration', (endpoint: string, id: string) => {
  cy.requestWithoutBody(`GET`, `integrations/api/v1/${endpoint}/${id}`);
});

Cypress.Commands.add('updateSpecificIntegration', (endpoint: string, id: string, body: object) => {
  cy.requestWithBody(`PUT`, `integrations/api/v1/${endpoint}/${id}`, body);
});

Cypress.Commands.add('postIntegration', (endpoint: string, body: object) => {
  cy.requestWithBody(`POST`, `integrations/api/v1/${endpoint}`, body);
});

Cypress.Commands.add('deleteIntegration', (endpoint: string, id: string) => {
  cy.requestWithoutBody(`DELETE`, `integrations/api/v1/${endpoint}/${id}`);
});
