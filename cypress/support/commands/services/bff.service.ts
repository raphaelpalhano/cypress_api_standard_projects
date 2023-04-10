Cypress.Commands.add('getBffSpecific', (endpoint: string, param: string) => {
  cy.requestWithoutBodyButParam(`GET`, `/proxy/bff/api/v1/${endpoint}`, param);
});

Cypress.Commands.add('getBffgeneral', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `/proxy/bff/api/v1/${endpoint}`);
});

Cypress.Commands.add('postBff', (endpoint: string, body: string) => {
  cy.requestWithBody(`POST`, `/proxy/bff/api/v1/${endpoint}`, body);
});
