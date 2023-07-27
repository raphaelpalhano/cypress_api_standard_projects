Cypress.Commands.add('getSwap', (endpoint: string) => {
  cy.requestWithoutBody('GET', endpoint);
});
