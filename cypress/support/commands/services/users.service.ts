Cypress.Commands.add('getPermissionsUsers', (endpoint: string) => {
  cy.requestWithoutBody(`GET`, `users/api/v1/${endpoint}`);
});
