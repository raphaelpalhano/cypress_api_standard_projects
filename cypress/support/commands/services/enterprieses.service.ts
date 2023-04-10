Cypress.Commands.add('getListOfEnterprises', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `proxy/enterprises/api/v1/${endpoint}`);
});

Cypress.Commands.add('postRetreveIdEnterprise', (endpoint: string, body: Array<string>) => {
  cy.requestWithBody(`POST`, `proxy/enterprises/api/v1/${endpoint}`, body);
});
