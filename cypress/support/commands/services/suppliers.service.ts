Cypress.Commands.add('getSupplierInfo', (endpoint: string, id: string) => {
  cy.requestWithoutBody(`GET`, `suppliers/api/v1/${endpoint}/${id}`);
});
