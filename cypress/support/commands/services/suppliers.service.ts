Cypress.Commands.add('getSupplierInfo', (endpoint: string, id: any) => {
  cy.requestWithoutBody(`GET`, `suppliers/api/v1/${endpoint}/${id}`);
});
