Cypress.Commands.add('getPermissionsUsers', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `proxy/users/api/v1/${endpoint}`);
});
