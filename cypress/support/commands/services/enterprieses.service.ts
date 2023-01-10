Cypress.Commands.add('getListOfEnterprises', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `enterprises/api/v1/${endpoint}`);
});

Cypress.Commands.add('postRetreveIdEnterprise', (endpoint: string, body: Array<string>) => {
  cy.requestWithBody(`POST`, `enterprises/api/v1/${endpoint}`, body);
});
