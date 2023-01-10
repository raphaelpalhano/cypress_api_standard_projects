Cypress.Commands.add('getBffSpecific', (endpoint: string, param: string) => {
  cy.requestWithoutBodyButParam(`GET`, `bff/api/v1/${endpoint}`, param);
});

Cypress.Commands.add('getBffgeneral', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `bff/api/v1/${endpoint}`);
});
