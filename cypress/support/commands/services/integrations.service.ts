Cypress.Commands.add('getIntegrations', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `proxy/integrations/api/v1/${endpoint}`);
});

Cypress.Commands.add('getSpecificIntegration', (endpoint: string, id: string) => {
  cy.requestWithoutBody(`GET`, `proxy/integrations/api/v1/${endpoint}/${id}`);
});

Cypress.Commands.add('updateSpecificIntegration', (endpoint: string, id: string, body: object) => {
  cy.requestWithBody(`PUT`, `proxy/integrations/api/v1/${endpoint}/${id}`, body);
});

Cypress.Commands.add('postIntegration', (endpoint: string, body: object) => {
  cy.requestWithBody(`POST`, `proxy/integrations/api/v1/${endpoint}`, body);
});

Cypress.Commands.add('deleteIntegration', (endpoint: string, id: string) => {
  cy.requestWithoutBody(`DELETE`, `proxy/integrations/api/v1/${endpoint}/${id}`);
});
